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
		jsonData: null,
		currentTopic: 'HTML',
		currentQuestions: null,
		dataLoaded: false,
		currentQuestion: 0,
		correctAnswers: 0,
		correctAnswer: null
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

	setTopic(topic) {
		this.mainAppState.currentTopic = topic;
		console.log(topic);
	}

	setApplicationState(state) {
		this.#uiManager.updateApplicationStateUI(this.mainAppState.appState, state);
		this.mainAppState.appState = state;

		switch(state) {
			case 'start-view':
				break;
			case 'quiz-view':
				this.quizStateEntry().then(result => {});
		}
	}

	getCorrectAnswer() {
		return this.mainAppState.currentQuestions[this.mainAppState.currentQuestion].answer;
	}

	increaseCorrectAnswers() {
		this.mainAppState.correctAnswers++;
	}

	setQuestionState() {
/*		this.questionState.currentQuestion = this.#mainApplication.mainAppState.currentQuestions[this.#mainApplication.mainAppState.currentQuestion].question;
		this.questionState.currentOptions = this.#mainApplication.mainAppState.currentQuestions[this.#mainApplication.mainAppState.currentQuestion].options;
		this.questionState.correctAnswer = this.mainAppState.currentQuestions[this.mainAppState.currentQuestion].answer;*/
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
		this.setQuestionState();
		this.#uiManager.updateQuestionsUI();
		this.#uiManager.updateTopicUI();
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
}