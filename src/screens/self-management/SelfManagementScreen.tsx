
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors, typography } from '../../styles/theme';
import OpenRouterService from '../../services/OpenRouterService';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchSelfManagementData, 
  selectRoutines, 
  selectStrategies, 
  selectActiveSprint, 
  selectSelfManagementProgress 
} from '../../store/slices/selfManagementSlice';
import { RootState } from '../../store';

const SelfManagementScreen = () => {
  const dispatch = useDispatch();
  const routines = useSelector(selectRoutines);
  const strategies = useSelector(selectStrategies);
  const activeSprint = useSelector(selectActiveSprint);
  const progress = useSelector(selectSelfManagementProgress);
  const isLoading = useSelector((state: RootState) => state.selfManagement.isLoading);
  
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'assistant' | 'system', content: string}>>([
    {
      role: 'system',
      content: 'You are an AI assistant specialized in helping with ADHD management. Provide helpful, concise guidance.'
    }
  ]);

  useEffect(() => {
    // @ts-ignore - Dispatch type error can be ignored for this demo
    dispatch(fetchSelfManagementData());
  }, [dispatch]);

  const handleAskAi = async () => {
    if (!aiPrompt.trim()) return;
    
    // Update chat history
    const updatedHistory = [
      ...chatHistory,
      { role: 'user' as const, content: aiPrompt }
    ];
    setChatHistory(updatedHistory);
    
    // Show loading indicator
    setIsAiLoading(true);
    
    try {
      // Get response from AI service
      const response = await OpenRouterService.generateResponse(aiPrompt, updatedHistory);
      
      // Update the UI with the response
      setAiResponse(response);
      
      // Add response to chat history
      setChatHistory([
        ...updatedHistory,
        { role: 'assistant' as const, content: response }
      ]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAiResponse('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setIsAiLoading(false);
      setAiPrompt(''); // Clear the input
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading your self-management data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Self Management</Text>
      
      {/* Progress Overview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Overall Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress}% Complete</Text>
      </View>
      
      {/* AI Assistant Section - OpenRouter LLM API Integration */}
      <View style={styles.aiSection}>
        <Text style={styles.sectionTitle}>AI Assistant</Text>
        <Text style={styles.sectionSubtitle}>
          Powered by OpenRouter LLM API for personalized ADHD guidance
        </Text>
        
        <View style={styles.chatContainer}>
          {chatHistory.slice(1).map((message, index) => (
            <View 
              key={index} 
              style={[
                styles.messageBubble, 
                message.role === 'user' ? styles.userMessage : styles.assistantMessage
              ]}
            >
              <Text style={styles.messageText}>{message.content}</Text>
            </View>
          ))}
          
          {aiResponse && !chatHistory.some(msg => msg.role === 'assistant' && msg.content === aiResponse) && (
            <View style={[styles.messageBubble, styles.assistantMessage]}>
              <Text style={styles.messageText}>{aiResponse}</Text>
            </View>
          )}
          
          {isAiLoading && (
            <View style={[styles.messageBubble, styles.assistantMessage]}>
              <ActivityIndicator size="small" color={colors.textOnSecondary} />
              <Text style={[styles.messageText, styles.loadingMessage]}>Thinking...</Text>
            </View>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.aiInput}
            placeholder="Ask about ADHD strategies, routines, or management tips..."
            value={aiPrompt}
            onChangeText={setAiPrompt}
            multiline
          />
          <TouchableOpacity 
            style={[styles.aiButton, !aiPrompt.trim() && styles.disabledButton]} 
            onPress={handleAskAi}
            disabled={!aiPrompt.trim() || isAiLoading}
          >
            <Text style={styles.aiButtonText}>Ask</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Active Sprint Section */}
      {activeSprint && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active Sprint: {activeSprint.name}</Text>
          <Text style={styles.cardDescription}>{activeSprint.description}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${activeSprint.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{activeSprint.progress}% Complete</Text>
          
          <Text style={styles.listTitle}>Activities:</Text>
          {activeSprint.activities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={[styles.activityStatus, activity.completed && styles.activityCompleted]} />
              <Text style={styles.activityTitle}>{activity.title}</Text>
            </View>
          ))}
        </View>
      )}
      
      {/* Strategies Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Effective ADHD Strategies</Text>
        {strategies.map((strategy) => (
          <View key={strategy.id} style={styles.strategyItem}>
            <Text style={styles.strategyTitle}>{strategy.title}</Text>
            <Text style={styles.strategyDescription}>{strategy.description}</Text>
            <View style={styles.tagContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{strategy.category}</Text>
              </View>
              {strategy.isFavorite && (
                <View style={[styles.tag, styles.favoriteTag]}>
                  <Text style={styles.tagText}>Favorite</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
      
      {/* Routines Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Routines</Text>
        {routines.map((routine) => (
          <View key={routine.id} style={styles.routineItem}>
            <Text style={styles.routineTitle}>{routine.title}</Text>
            <Text style={styles.routineDescription}>{routine.description}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${routine.adherenceRate}%` }]} />
            </View>
            <Text style={styles.progressText}>{routine.adherenceRate}% Adherence</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  heading: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    ...typography.body1,
    color: colors.textSecondary,
    marginTop: 12,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  cardDescription: {
    ...typography.body1,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  listTitle: {
    ...typography.subtitle1,
    color: colors.textPrimary,
    marginTop: 12,
    marginBottom: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityStatus: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.surfaceVariant,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  activityCompleted: {
    backgroundColor: colors.primary,
  },
  activityTitle: {
    ...typography.body1,
    color: colors.textPrimary,
  },
  strategyItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  strategyTitle: {
    ...typography.subtitle1,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  strategyDescription: {
    ...typography.body1,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  favoriteTag: {
    backgroundColor: colors.primaryLight,
  },
  tagText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  routineItem: {
    marginBottom: 16,
  },
  routineTitle: {
    ...typography.subtitle1,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  routineDescription: {
    ...typography.body1,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  aiSection: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  chatContainer: {
    marginBottom: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    maxWidth: '85%',
    marginBottom: 12,
  },
  userMessage: {
    backgroundColor: colors.primaryLight,
    alignSelf: 'flex-end',
  },
  assistantMessage: {
    backgroundColor: colors.secondaryLight,
    alignSelf: 'flex-start',
  },
  messageText: {
    ...typography.body1,
    color: colors.textOnSecondary,
  },
  loadingMessage: {
    fontStyle: 'italic',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  aiInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.background,
    maxHeight: 100,
    ...typography.body1,
  },
  aiButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.textDisabled,
  },
  aiButtonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
});

export default SelfManagementScreen;
