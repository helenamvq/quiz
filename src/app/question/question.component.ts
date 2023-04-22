import { Component } from '@angular/core';
import { questions } from '../questions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  quizStarted = false;
  questionIndex = 0;
  questions = questions;
  score = 0;
  totalQuestions = 12;
  reachedLastQuestion = false;
  showBackButton = false;
  isAnswerSubmitted = false;
  wrongAnswers: { question: string, correctAnswer: string }[] = [];

  constructor(private router: Router) {}

  startQuiz() {
    this.quizStarted = true;
  }

  submitAnswer() {
    const selectedAnswer = (document.querySelector(
      'input[name="answer"]:checked'
    ) as HTMLInputElement)?.value;

    console.log('Resposta selecionada:', selectedAnswer);

    this.checkAnswer(selectedAnswer);

    // Verifique se o usuário já respondeu todas as perguntas
    if (this.questionIndex === this.totalQuestions - 1) {
      this.reachedLastQuestion = true;
      this.showBackButton = true;
      this.isAnswerSubmitted = true;
      this.showWrongAnswers();
    } else {
      this.nextQuestion();
    }
  }



  checkAnswer(answer: string) {
    if (answer === this.questions[this.questionIndex].answer) {
      this.score++;
    } else {
      this.wrongAnswers.push({
        question: this.questions[this.questionIndex].question,
        correctAnswer: this.questions[this.questionIndex].answer
      });
    }
  }

  nextQuestion() {
    this.questionIndex++;
    this.isAnswerSubmitted = false;

    if (this.questionIndex >= this.questions.length) {
      this.reachedLastQuestion = true;
      console.log('Fim do quiz!');
    }
  }

  restartQuiz() {
    this.questionIndex = -1;
    this.score = 0;
    this.reachedLastQuestion = false;
    this.showBackButton = false;
    this.isAnswerSubmitted = false;
    this.wrongAnswers = [];
    this.nextQuestion();
  }

  showWrongAnswers() {
    console.log('Respostas erradas:', this.wrongAnswers);
  }
}
