export {ButtonsManager};

/* buttonsManager */
class ButtonsManager {
	#mainApplication;
	#uiManager;

	#optionButtonsState;
	#multiFunctionButtonsState;
	#optionButtons;
	#multiFunctionButton;
	#selectedAnswerButton;

	constructor(mainApplication, uiManager) {
		this.init(mainApplication, uiManager);
	}

	init(mainApplication, uiManager) {
		this.#mainApplication = mainApplication;
		this.#uiManager = uiManager;

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

		this.#selectedAnswerButton.addEventListener('click', (e) => {
			this.multiFunctinButtonListener(e);
		})
	}

	/* =========== optionButtons states =========== */
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
		this.#mainApplication.setTopic(topic);
		this.#mainApplication.setApplicationState('quiz-view');
	}

	selectAnswer(button) {
		this.#selectedAnswerButton = button;
	}

	/* =========== multiFunction button states =========== */
	multiFunctinButtonListener(e) {
		switch(this.#multiFunctionButtonsState) {
			case 'waiting-for-selection':
				this.waitingSelectionError();
				break;
			case 'submit':
				break;
			case 'next-question':
				break;
			case 'start-again':
				break;
		}
	}

	waitingSelectionError() {
		/* Call UI manager to set error message "Waiting for selection" */
	}

	submitAnswer() {
		/* Compare text content of selected answer with correct answer content */
		/* If answer was correct, increase number of correctAnswers */
		/* Call the UI manager to update accordingly */
		/* change state to next-question state */
	}

	goToNextQuestion() {
		/* validate if current question is not the last question*/
		/* If it is the last question move application state to 'score state'*/
		/* Call UI manager to update accordingly */
		/* Move state to 'start-again' */
	}

	startAgain() {
		/* Move application state to 'start' */
	}
}