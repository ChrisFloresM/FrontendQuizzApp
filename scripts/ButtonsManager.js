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

		this.#multiFunctionButton.addEventListener('click', (e) => {
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
				this.selectAnswer(e.currentTarget);
				break;
			case 'answer-submitted':
				break;
		}
	}

	selectTopic(button) {
		const topic = button.dataset.topic;
		this.#mainApplication.setTopic(topic);
		this.#mainApplication.setApplicationState('quiz-view');
		this.setOptionButtonsState('waiting-for-submit');
	}

	setOptionButtonsState(state) {
		this.#optionButtonsState = state;
	}

	selectAnswer(button) {
		this.#selectedAnswerButton = button;
		this.#uiManager.updateSelectedButtonUI(button);
		this.#uiManager.updateMultiFunctionButtonUI(this.#multiFunctionButton);
		this.setMultiFunctionButtonState('submit');
	}

	/* =========== multiFunction button states =========== */
	multiFunctinButtonListener(e) {
		switch(this.#multiFunctionButtonsState) {
			case 'waiting-for-selection':
				this.waitingSelectionError();
				break;
			case 'submit':
				this.submitAnswer();
				break;
			case 'next-question':
				break;
			case 'start-again':
				break;
		}
	}

	setMultiFunctionButtonState(state) {
		this.#multiFunctionButtonsState = state;
	}

	waitingSelectionError() {
		/* Call UI manager to set error message "Waiting for selection" */
	}

	submitAnswer() {
		/* Compare text content of selected answer with correct answer content */
		const answerIsCorrect = this.isAnswerCorrect();
		/* If answer was correct, increase number of correctAnswers */
		if (answerIsCorrect) {
			this.#mainApplication.increaseCorrectAnswers();
		} else {

		}
		/* Call the UI manager to update accordingly */

		/* change state to next-question state */
		this.setOptionButtonsState('answer-submitted');
		this.setMultiFunctionButtonState('next-question');
	}

	isAnswerCorrect() {
		const selectedButtonAnswer = this.#selectedAnswerButton.querySelector('.main-app__topic-btn-text');
		return this.#mainApplication.getCorrectAnswer() === selectedButtonAnswer.textContent;
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