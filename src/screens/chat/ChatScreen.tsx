
import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Chip } from 'react-native-paper';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors, spacing, typography } from '../../styles/theme';

const ChatScreen = () => {
  const dispatch = useAppDispatch();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Get data from Redux store
  const { chatHistory, isTyping } = useAppSelector(state => state.chat);
  const { user } = useAppSelector(state => state.auth);
  
  // Local state for message input
  const [message, setMessage] = useState('');
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Dispatch action to send message
    // In a real implementation, this would call the sendMessageStart action
    // dispatch(sendMessageStart({ message, userId: user?.id }));
    
    // Clear input
    setMessage('');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="brain" size={24} color={colors.primary} />
          <Text style={styles.headerTitle}>ADHD Coach</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Powered by advanced AI to support your ADHD journey
        </Text>
      </View>
      
      <View style={styles.chipContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip 
            icon="help-circle-outline" 
            onPress={() => setMessage("How can I improve my focus?")}
            style={styles.chip}
          >
            Focus tips
          </Chip>
          <Chip 
            icon="calendar-check" 
            onPress={() => setMessage("Help me create a daily routine")}
            style={styles.chip}
          >
            Daily routine
          </Chip>
          <Chip 
            icon="school" 
            onPress={() => setMessage("Study strategies for ADHD")}
            style={styles.chip}
          >
            Study help
          </Chip>
          <Chip 
            icon="briefcase" 
            onPress={() => setMessage("Work productivity tips for ADHD")}
            style={styles.chip}
          >
            Work tips
          </Chip>
          <Chip 
            icon="sleep" 
            onPress={() => setMessage("How can I improve my sleep with ADHD?")}
            style={styles.chip}
          >
            Sleep help
          </Chip>
        </ScrollView>
      </View>
      
      <ScrollView 
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {chatHistory.length === 0 ? (
          <View style={styles.welcomeContainer}>
            <Icon name="chat-processing-outline" size={64} color={colors.primary} />
            <Text style={styles.welcomeTitle}>Welcome to Your ADHD Coach</Text>
            <Text style={styles.welcomeText}>
              I'm here to help you manage your ADHD, answer questions, and provide personalized support.
              Try asking me about focus strategies, daily routines, or any ADHD-related challenges you're facing.
            </Text>
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleTitle}>Try asking:</Text>
              <View style={styles.exampleItem}>
                <Icon name="arrow-right" size={16} color={colors.primary} />
                <Text style={styles.exampleText}>"How can I remember to take my medication?"</Text>
              </View>
              <View style={styles.exampleItem}>
                <Icon name="arrow-right" size={16} color={colors.primary} />
                <Text style={styles.exampleText}>"What are some strategies for reducing distractions?"</Text>
              </View>
              <View style={styles.exampleItem}>
                <Icon name="arrow-right" size={16} color={colors.primary} />
                <Text style={styles.exampleText}>"Help me create a morning routine"</Text>
              </View>
            </View>
          </View>
        ) : (
          // Chat messages would be rendered here
          <View>
            {chatHistory.map((chat, index) => (
              <View 
                key={index} 
                style={[
                  styles.messageContainer,
                  chat.sender === 'user' ? styles.userMessage : styles.assistantMessage
                ]}
              >
                <View 
                  style={[
                    styles.messageBubble,
                    chat.sender === 'user' ? styles.userBubble : styles.assistantBubble
                  ]}
                >
                  <Text style={styles.messageText}>{chat.content}</Text>
                </View>
                <Text style={styles.messageTime}>
                  {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            ))}
            
            {isTyping && (
              <View style={[styles.messageContainer, styles.assistantMessage]}>
                <View style={[styles.messageBubble, styles.assistantBubble, styles.typingBubble]}>
                  <Text style={styles.typingText}>Typing</Text>
                  <View style={styles.typingDots}>
                    <View style={styles.typingDot} />
                    <View style={[styles.typingDot, styles.typingDotMiddle]} />
                    <View style={styles.typingDot} />
                  </View>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          multiline
          mode="outlined"
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          right={
            <TextInput.Icon 
              icon="send" 
              color={message.trim() ? colors.primary : colors.textDisabled}
              onPress={handleSendMessage} 
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    // Fix for typography.h3 to ensure valid fontWeight type
    fontSize: typography.h3.fontSize || 18,
    lineHeight: typography.h3.lineHeight || 24,
    fontWeight: 'bold', // Using a valid fontWeight string instead
    marginLeft: spacing.sm,
  },
  headerSubtitle: {
    fontSize: typography.body2.fontSize || 14,
    lineHeight: typography.body2.lineHeight || 20,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  chipContainer: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chip: {
    marginRight: spacing.sm,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: spacing.md,
  },
  welcomeContainer: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  welcomeTitle: {
    fontSize: typography.h2.fontSize || 22,
    lineHeight: typography.h2.lineHeight || 28,
    fontWeight: 'bold',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: typography.body1.fontSize || 16,
    lineHeight: typography.body1.lineHeight || 24,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  exampleContainer: {
    alignSelf: 'stretch',
    backgroundColor: colors.surfaceVariant,
    borderRadius: 8,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  exampleTitle: {
    fontSize: typography.subtitle1.fontSize || 16,
    lineHeight: typography.subtitle1.lineHeight || 24,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  exampleText: {
    fontSize: typography.body2.fontSize || 14,
    lineHeight: typography.body2.lineHeight || 20,
    marginLeft: spacing.sm,
  },
  messageContainer: {
    marginBottom: spacing.md,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    padding: spacing.md,
  },
  userBubble: {
    backgroundColor: colors.primary,
  },
  assistantBubble: {
    backgroundColor: colors.surfaceVariant,
  },
  messageText: {
    fontSize: typography.body1.fontSize || 16,
    lineHeight: typography.body1.lineHeight || 24,
    color: colors.textOnPrimary,
  },
  messageTime: {
    fontSize: typography.caption.fontSize || 12,
    lineHeight: typography.caption.lineHeight || 16,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  typingText: {
    fontSize: typography.body2.fontSize || 14,
    lineHeight: typography.body2.lineHeight || 20,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  typingDots: {
    flexDirection: 'row',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textSecondary,
    marginRight: 4,
  },
  typingDotMiddle: {
    marginTop: -4,
  },
  inputContainer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  input: {
    backgroundColor: colors.background,
  },
});

export default ChatScreen;
