import { Injectable } from '@angular/core';
import faqData from '../../../public/assets/faq.json';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  faq: any[] = faqData;
  vocabulary: Set<string> = new Set();
  tfidfVectors: Record<string, number>[] = [];

  constructor() {
    this.buildVocabulary();
    this.buildTfidfVectors();
  }

  tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .match(/\b\w+\b/g) || [];
  }

  buildVocabulary() {
    this.faq.forEach(item => {
      this.tokenize(item.question).forEach(word => this.vocabulary.add(word));
    });
  }

  computeTfidf(text: string): Record<string, number> {
    const tokens = this.tokenize(text);
    const tf: Record<string, number> = {};

    // Term frequency
    this.vocabulary.forEach(word => {
      const count = tokens.filter(t => t === word).length;
      tf[word] = count / (tokens.length || 1);
    });

    // Document frequency
    const df: Record<string, number> = {};
    this.vocabulary.forEach(word => {
      df[word] = this.faq.filter(item =>
        this.tokenize(item.question).includes(word)
      ).length;
    });

    // IDF
    const idf: Record<string, number> = {};
    this.vocabulary.forEach(word => {
      idf[word] = Math.log(this.faq.length / (1 + df[word]));
    });

    // TF-IDF
    const tfidf: Record<string, number> = {};
    this.vocabulary.forEach(word => {
      tfidf[word] = tf[word] * idf[word];
    });

    return tfidf;
  }

  buildTfidfVectors() {
    this.tfidfVectors = this.faq.map(f => this.computeTfidf(f.question));
  }

  cosineSimilarity(a: Record<string, number>, b: Record<string, number>): number {
    let dot = 0, magA = 0, magB = 0;

    this.vocabulary.forEach(word => {
      dot += (a[word] || 0) * (b[word] || 0);
      magA += (a[word] || 0) ** 2;
      magB += (b[word] || 0) ** 2;
    });

    return dot / (Math.sqrt(magA) * Math.sqrt(magB) + 1e-9);
  }

  getResponse(query: string): string {
    const queryVec = this.computeTfidf(query);

    let bestScore = -1;
    let bestIndex = 0;

    this.tfidfVectors.forEach((vec, i) => {
      const score = this.cosineSimilarity(queryVec, vec);
      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    });

    if (bestScore < 0.15) {
      return "I'm not sure about that. Could you rephrase?";
    }

    return this.faq[bestIndex].answer;
  }
}