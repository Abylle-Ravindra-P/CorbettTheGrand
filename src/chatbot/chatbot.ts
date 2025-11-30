import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../services/chatbot/chatbot.service';

@Component({
  standalone: true,
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})  
export class ChatbotComponent {
  userInput = '';
  messages: { from: string; text: string }[] = [];

  constructor(private bot: ChatbotService) {}

  sendMessage() {
    const message = this.userInput.trim();
    if (!message) return;

    this.messages.push({ from: 'user', text: message });

    const reply = this.bot.getResponse(message);
    this.messages.push({ from: 'bot', text: reply });

    this.userInput = '';
  }
}
