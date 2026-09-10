
interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
    index: number;
    finish_reason: string;
  }[];
  created: number;
  model: string;
  object: string;
}

class OpenRouterService {
  private apiKey: string | null = null;
  private baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
  
  constructor() {
    // In a real production app, this would be set via environment variables
    // For demo purposes, we're using a mock implementation
    this.apiKey = 'mock-api-key';
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async generateResponse(
    prompt: string, 
    history: Array<{ role: 'user' | 'assistant' | 'system', content: string }> = []
  ): Promise<string> {
    if (!this.apiKey) {
      console.log('API key not set. Using mock response.');
      return this.getMockResponse(prompt);
    }

    try {
      // In a real implementation, this would make an actual API call
      console.log('Making API request to OpenRouter with prompt:', prompt);
      
      // For demo purposes, we're returning a mock response
      return this.getMockResponse(prompt);
      
      /* Real implementation would look like:
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: 'openai/gpt-4-turbo',
          messages: [
            ...history,
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });
      
      const data: OpenRouterResponse = await response.json();
      return data.choices[0].message.content;
      */
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      return 'Sorry, there was an error processing your request. Please try again later.';
    }
  }

  // Mock response generator based on prompt content
  private getMockResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('focus') || lowerPrompt.includes('distract')) {
      return "Based on your ADHD profile and recent patterns, here are three focus strategies that might work well for you:\n\n1. Time blocking with the Pomodoro Technique (25 minutes focus, 5 minutes break)\n2. Body doubling session through a virtual co-working space\n3. Background white noise or instrumental music during work sessions\n\nWould you like more information on any of these strategies?";
    } else if (lowerPrompt.includes('medication') || lowerPrompt.includes('medicine')) {
      return "I notice you're asking about medication. It's important to discuss any medication questions with your healthcare provider. Your records show your next appointment is scheduled for May 15th. Would you like me to prepare some questions about your medication to discuss at that appointment?";
    } else if (lowerPrompt.includes('routine') || lowerPrompt.includes('schedule')) {
      return "Creating consistent routines is especially helpful for ADHD management. Based on your activity patterns, mornings seem to be your most productive time. Have you considered building a structured morning routine that includes your most important tasks during this optimal focus window?";
    } else {
      return "I'm your ADHD support assistant. I can help with developing strategies for focus, organization, time management, and emotional regulation. I can also help you prepare for appointments, track symptoms, and understand patterns in your ADHD experience. What specific support would be helpful right now?";
    }
  }
}

export default new OpenRouterService();
