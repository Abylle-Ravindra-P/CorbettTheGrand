import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-chat-widget',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.html',
  styleUrls: ['./chat-widget.css']
})
export class ChatWidgetComponent {
  isOpen = false;

  ngOnInit(): void {
    this.resetChat();
  }
  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  // Simple bot logic
  messages: { from: 'user' | 'bot', text: string }[] = [];
  userMessage = '';
  
   resetChat() {
    // Clear messages
    this.messages = [];
    this.userMessage = '';
    // Optionally close chat on page load
    this.isOpen = false;
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.messages.push({ from: 'user', text: this.userMessage });

    const reply = this.getBotReply(this.userMessage);
    this.messages.push({ from: 'bot', text: reply });

    this.userMessage = '';
  }

  getBotReply(msg: string): string {
    const message = msg.toLowerCase();

    if (message.includes('hello') || message.includes('hi'))
      return 'Hello! How can I help you?';

    if (message.includes('hours'))
      return 'We are open 9 AM to 5 PM.';

    if (message.includes('location'))
      return 'We are located at 123 Main Street.';

    return 'Sorry, I did not understand. Please try again.';
  }
}