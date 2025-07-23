import {ThemeManager} from './ThemeManager.js';
/* 1. Get the button element to work with */
document.addEventListener('DOMContentLoaded', init);

const mainAppState = {
	appState: 'start-view',
	currentTopic: 'HTML',
	currentQuestions: null,
	dataLoaded: false,
	currentQuestion: 1,
	correctAnswers: 0
}

function init() {
	const themeManager = new ThemeManager();
	const buttonsManager = new ButtonsManager();
}

/* buttonsManager */
class ButtonsManager {

	#optionButtonsState;
	#multiFunctionButtonsState;
	#optionButtons;
	#multiFunctionButton;
	#selectedAnswerButton;

	constructor() {
		this.init();
	}

	init() {
		this.#optionButtonsState = 'topic-selection';
		this.#multiFunctionButtonsState = 'waiting-for-submit';
		this.#selectedAnswerButton = null;

		this.#optionButtons = document.querySelectorAll('.main-app__button:not(.multi-function-btn)');
		this.#multiFunctionButton = document.querySelector('.multi-function-btn');

		this.bindEvents();
	}

	bindEvents() {
		this.#optionButtons.forEach(button => {
			button.addEventListener('click', (e) => {
				this.optionButtonsListener(e);
			});
		});
	}

	optionButtonsListener(e) {
		switch(this.#optionButtonsState) {
			case 'topic-selection':
				this.selectTopic(e.currentTarget);
				break;
			case 'waiting-for-submit':
				this.selectAnswer();
				break;
			case 'answer-submitted':
				break;
		}
	}

	selectTopic(button) {
		const topic = button.dataset.topic;
		setTopic(topic);
	}

	selectAnswer(button) {
		/* Call UIManager to update the button UI */
		this.#selectedAnswerButton = button;
	}
}

function setTopic(topic) {
	mainAppState.currentTopic = topic;
	console.log(topic);
}

/* Getting the JSON Data*/
let dataLoaded;
async function retrieveDataFromJson() {
	try {
		const data = await fetch('../data.json');
		if (!data.ok) {
			console.log('Error retrieving JSON data :(');
		}
		const fullData = await data.json();
		dataLoaded = true;
		console.log(fullData);
	} catch(error) {
		console.error('Error retrieving JSON data :(');
	}
}





