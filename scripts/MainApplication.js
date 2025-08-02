export {MainApplication}

import {ThemeManager} from './ThemeManager.js';
import {ButtonsManager} from './ButtonsManager.js';
import {UIManager} from './UIManager.js';


class MainApplication {
	#themeManager;
	#uiManager;
	#buttonsManager;

	mainAppState = {
		appState: 'start-view',
		currentTopic: 'HTML',
		jsonData: null,
		currentQuestions: null,
		dataLoaded: false,
		currentQuestionNumber: 0,
		correctAnswers: 0,
	}

	questionState = {
		currentQuestion: null,
		currentOptions: null,
		correctAnswer: null
	}

	iconSrcs = {
		'HTML': '../img/icon-html.svg',
		'CSS': '../img/icon-css.svg',
		'JavaScript': '../img/icon-js.svg',
		'Accessibility': '../img/icon-accessibility.svg'
	}

	constructor() {
		this.init();
	}

	init() {
		this.#themeManager = new ThemeManager();
		this.#uiManager = new UIManager(this);
		this.#buttonsManager = new ButtonsManager(this, this.#uiManager);
	}

	getCurrentTopic() {
		return this.mainAppState.currentTopic
	}

	getQuestionNumber() {
		return this.mainAppState.currentQuestionNumber;
	}

	getCurrentQuestion() {
		return this.questionState.currentQuestion;
	}

	getCorrectAnswer() {
		return this.questionState.correctAnswer;
	}

	getQuestionOptions() {
		return this.questionState.currentOptions;
	}

	areCurrentQuestionsInvalid() {
		return !this.mainAppState.currentQuestions || this.mainAppState.currentQuestions.length === 0
	}

	increaseCorrectAnswers() {
		this.mainAppState.correctAnswers++;
	}

	increaseQuestionNumber() {
		this.mainAppState.currentQuestionNumber++;
	}

	setQuestionState() {
		this.questionState.currentQuestion = this.mainAppState.currentQuestions[this.mainAppState.currentQuestionNumber].question;
		this.questionState.currentOptions = this.mainAppState.currentQuestions[this.mainAppState.currentQuestionNumber].options;
		this.questionState.correctAnswer = this.mainAppState.currentQuestions[this.mainAppState.currentQuestionNumber].answer;
	}

	setTopic(topic) {
		this.mainAppState.currentTopic = topic;
	}

	setApplicationState(state) {
		this.#uiManager.updateApplicationStateUI(this.mainAppState.appState, state);
		this.mainAppState.appState = state;

		switch(state) {
			case 'start-view':
				this.startStateEntry();
				break;
			case 'quiz-view':
				this.quizStateEntry().then(result => {});
				break;
			case 'score-view':
				this.scoreStateEntry();
				break;
		}
	}

	startStateEntry() {
		this.#uiManager.clearAnswersUI();
	}

	async quizStateEntry() {
		await this.setQuizQuestions();
	}

	async setQuizQuestions() {
		if (!this.mainAppState.jsonData) {
			await this.getDataFromJson();
			console.log(this.mainAppState.jsonData);
		}
		this.mainAppState.currentQuestions = this.mainAppState.jsonData.quizzes.find(quiz => quiz.title === this.mainAppState.currentTopic)?.questions || [];
		this.initApplicationCounters();
		this.setQuestionState();
		this.#uiManager.updateQuestionsUI();
		this.#uiManager.updateTopicUI();
	}

	initApplicationCounters() {
		this.mainAppState.currentQuestionNumber = 0;
		this.mainAppState.correctAnswers = 0;
	}

	async getDataFromJson() {
		try {
			const data = await fetch('../data.json');
			if (!data.ok) {
				console.log('Error retrieving JSON data :(');
			}
			this.mainAppState.jsonData = await data.json();
		} catch(error) {
			console.error('Error retrieving JSON data :(');
		}
	}

	scoreStateEntry() {
		this.#uiManager.updateCorrectAnswersNumberUI(this.mainAppState.correctAnswers);
	}
}