import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useUserData } from '../hooks/useUserData';
import { lessonsList, Lesson, Exercise } from '../data/lessons';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Heart, ArrowLeft, Volume2, Check, X, ChevronRight, Lightbulb } from 'lucide-react-native';
import Video from 'react-native-video';
import { useAudio } from '../hooks/useAudio';

const { width } = Dimensions.get('window');

const LessonScreen = ({ route, navigation }: any) => {
  const { lessonId } = route.params;
  const { completeLesson } = useUserData();
  const { getFullAudioUrl } = useAudio();
  const lesson = lessonsList.find(l => l.id === lessonId);

  const [showExercises, setShowExercises] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);

  if (!lesson) return null;

  const playAudio = (audioFileName?: string) => {
    if (!audioFileName) return;
    const url = getFullAudioUrl(audioFileName);
    if (url) {
      setCurrentAudioUrl(null); // Reset
      setTimeout(() => setCurrentAudioUrl(url), 10);
    }
  };

  const exercises = lesson.content?.exercises || [];
  const currentExercise = exercises[currentExerciseIndex];

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    const correct = selectedAnswer === currentExercise.correctAnswer;
    setIsCorrect(correct);
    setHasSubmitted(true);
    
    if (!correct) {
      setHearts(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = async () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setHasSubmitted(false);
    } else {
      await completeLesson(lesson.id, 20); // Award 20 XP
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <View style={styles.completedContainer}>
        <Check size={80} color="#58CC02" />
        <Text style={styles.completedTitle}>Leçon Terminée !</Text>
        <Text style={styles.completedSubtitle}>Tu as gagné +20 XP</Text>
        <Button onPress={() => navigation.goBack()} style={{ width: '80%', marginTop: 32 }}>
          Continuer
        </Button>
      </View>
    );
  }

  if (hearts === 0) {
    return (
      <View style={styles.completedContainer}>
        <X size={80} color="#FF4B4B" />
        <Text style={[styles.completedTitle, { color: '#FF4B4B' }]}>Oups !</Text>
        <Text style={styles.completedSubtitle}>Tu n'as plus de cœurs. Révise un peu et réessaie !</Text>
        <Button onPress={() => navigation.goBack()} variant="outline" style={{ width: '80%', marginTop: 32 }}>
          Retour au tableau de bord
        </Button>
      </View>
    );
  }

  if (!showExercises) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{lesson.title}</Text>
        </View>
        <ScrollView style={styles.content}>
          <Text style={styles.introText}>{lesson.content?.introduction}</Text>
          
          <Text style={styles.sectionTitle}>Vocabulaire :</Text>
          {lesson.content?.vocabulary.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.vocabCard}
              onPress={() => playAudio(item.audioUrl)}
            >
              <View style={styles.vocabMain}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={styles.vocabDarija}>{item.darija}</Text>
                  {item.audioUrl && <Volume2 size={20} color="#58CC02" />}
                </View>
                <Text style={styles.vocabTranslit}>{item.transliteration}</Text>
              </View>
              <Text style={styles.vocabTranslation}>{item.translation}</Text>
            </TouchableOpacity>
          ))}

          {currentAudioUrl && (
            <Video
              source={{ uri: currentAudioUrl }}
              onEnd={() => setCurrentAudioUrl(null)}
              style={{ width: 0, height: 0 }}
            />
          )}

          {lesson.content?.culturalNote && (
            <Card style={styles.noteCard}>
              <CardContent style={styles.noteContent}>
                <Lightbulb size={20} color="#1CB0F6" style={{ marginBottom: 8 }} />
                <Text style={styles.noteTitle}>Note Culturelle :</Text>
                <Text style={styles.noteText}>{lesson.content.culturalNote}</Text>
              </CardContent>
            </Card>
          )}
          <View style={{ height: 40 }} />
        </ScrollView>
        <View style={styles.footer}>
          <Button onPress={() => setShowExercises(true)} style={{ width: '100%' }}>
            COMMENCER LES EXERCICES
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <Progress value={((currentExerciseIndex + 1) / exercises.length) * 100} />
        </View>
        <View style={styles.heartsWrapper}>
          <Heart size={20} color="#FF4B4B" fill="#FF4B4B" />
          <Text style={styles.heartsText}>{hearts}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.questionType}>
          {currentExercise.type === 'multiple-choice' ? 'Choisis la bonne réponse' : 'Écoute et sélectionne'}
        </Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <Text style={[styles.questionText, { marginBottom: 0, flex: 1 }]}>{currentExercise.question}</Text>
          {currentExercise.audioUrl && (
            <TouchableOpacity onPress={() => playAudio(currentExercise.audioUrl)}>
              <Volume2 size={32} color="#58CC02" />
            </TouchableOpacity>
          )}
        </View>

        {currentAudioUrl && (
          <Video
            source={{ uri: currentAudioUrl }}
            onEnd={() => setCurrentAudioUrl(null)}
            style={{ width: 0, height: 0 }}
          />
        )}

        <View style={styles.optionsGrid}>
          {currentExercise.options?.map((option, index) => {
            let optionStyle = styles.option;
            let textStyle = styles.optionText;

            if (selectedAnswer === option) {
              optionStyle = [styles.option, styles.selectedOption];
            }
            if (hasSubmitted) {
              if (option === currentExercise.correctAnswer) {
                optionStyle = [styles.option, styles.correctOption];
                textStyle = [styles.optionText, styles.correctOptionText];
              } else if (selectedAnswer === option) {
                optionStyle = [styles.option, styles.wrongOption];
                textStyle = [styles.optionText, styles.wrongOptionText];
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => !hasSubmitted && setSelectedAnswer(option)}
                disabled={hasSubmitted}
              >
                <Text style={textStyle}>{option}</Text>
                {hasSubmitted && option === currentExercise.correctAnswer && <Check size={20} color="#166534" />}
                {hasSubmitted && selectedAnswer === option && option !== currentExercise.correctAnswer && <X size={20} color="#991b1b" />}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.footer, hasSubmitted && (isCorrect ? styles.footerCorrect : styles.footerWrong)]}>
        {!hasSubmitted ? (
          <Button 
            onPress={handleSubmit} 
            disabled={!selectedAnswer}
            style={{ width: '100%' }}
          >
            VÉRIFIER
          </Button>
        ) : (
          <View style={styles.submitResult}>
            <View style={styles.resultInfo}>
              <Text style={[styles.resultTitle, isCorrect ? styles.resultTitleCorrect : styles.resultTitleWrong]}>
                {isCorrect ? 'Excellent !' : 'La bonne réponse était :'}
              </Text>
              {!isCorrect && <Text style={styles.correctAnswerText}>{currentExercise.correctAnswer}</Text>}
            </View>
            <Button 
              onPress={handleNext}
              style={[styles.nextButton, isCorrect ? styles.nextButtonCorrect : styles.nextButtonWrong]}
            >
              CONTINUER
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    gap: 12,
  },
  progressWrapper: {
    flex: 1,
  },
  heartsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heartsText: {
    fontWeight: 'bold',
    color: '#FF4B4B',
  },
  content: {
    padding: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    flex: 1,
  },
  introText: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  vocabCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vocabMain: {
    flex: 1,
  },
  vocabDarija: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#58CC02',
  },
  vocabTranslit: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
  vocabTranslation: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '500',
    marginLeft: 16,
  },
  noteCard: {
    marginTop: 24,
    backgroundColor: '#eff6ff',
    borderColor: '#dbeafe',
  },
  noteContent: {
    paddingVertical: 12,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  questionType: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 12,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 32,
  },
  optionsGrid: {
    gap: 12,
  },
  option: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: '#58CC02',
    backgroundColor: '#f0fdf4',
  },
  correctOption: {
    borderColor: '#58CC02',
    backgroundColor: '#dcfce7',
  },
  wrongOption: {
    borderColor: '#FF4B4B',
    backgroundColor: '#fee2e2',
  },
  optionText: {
    fontSize: 18,
    color: '#0f172a',
    fontWeight: '500',
  },
  correctOptionText: {
    color: '#166534',
  },
  wrongOptionText: {
    color: '#991b1b',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 2,
    borderTopColor: '#f1f5f9',
  },
  footerCorrect: {
    backgroundColor: '#dcfce7',
    borderTopColor: '#86efac',
  },
  footerWrong: {
    backgroundColor: '#fee2e2',
    borderTopColor: '#fecaca',
  },
  submitResult: {
    gap: 16,
  },
  resultInfo: {
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  resultTitleCorrect: {
    color: '#166534',
  },
  resultTitleWrong: {
    color: '#991b1b',
  },
  correctAnswerText: {
    fontSize: 16,
    color: '#991b1b',
    marginTop: 4,
  },
  nextButton: {
    width: '100%',
  },
  nextButtonCorrect: {
    backgroundColor: '#58CC02',
  },
  nextButtonWrong: {
    backgroundColor: '#FF4B4B',
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  completedTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#58CC02',
    marginTop: 24,
  },
  completedSubtitle: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default LessonScreen;
