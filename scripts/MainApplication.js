export {MainApplication}

import {ThemeManager} from './ThemeManager.js';
import {ButtonsManager} from './ButtonsManager.js';
import {UIManager} from './UIManager.js';


class MainApplication {
	#themeManager;
	#uiManager;
	#buttonsManager;

	mainApplication = document.querySelector('.main-app');

	mainAppState = {
		appState: 'start-view',
		jsonData: null,
		currentTopic: 'HTML',
		currentQuestions: null,
		dataLoaded: false,
		currentQuestion: 0,
		correctAnswers: 0
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
		this.mainApplication.classList.remove(this.mainAppState.appState);
		this.mainAppState.appState = state;
		this.mainApplication.classList.add(this.mainAppState.appState);
		/* Call the UI manager to update the UI state */
		switch(state) {
			case 'start-view':
				break;
			case 'quiz-view':
				this.quizStateEntry().then(result => {});
		}
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