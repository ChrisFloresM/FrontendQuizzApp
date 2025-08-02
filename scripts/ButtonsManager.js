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

	#maxQuestions = 10;

	constructor(mainApplication, uiManager) {
		this.init(mainApplication, uiManager);
	}

	init(mainApplication, uiManager) {
		this.#mainApplication = mainApplication;
		this.#uiManager = uiManager;

		this.#optionButtonsState = 'topic-selection';
		this.#multiFunctionButtonsState = 'waiting-for-selection';
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
		this.#uiManager.enableMultiFunctionButtonUI(this.#multiFunctionButton);
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
				this.goToNextQuestion();
				break;
			case 'start-again':
				this.startAgain();
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
		const answerIsCorrect = this.isAnswerCorrect();

		if (answerIsCorrect) {
			this.#mainApplication.increaseCorrectAnswers();
			this.#uiManager.setCorrectAnswerUI();
		} else {
			this.#uiManager.setWrongAnswerUI();
		}

		this.#uiManager.updateMultiFunctionButtonText(this.#multiFunctionButton, 'Next question');
		this.setOptionButtonsState('answer-submitted');
		this.setMultiFunctionButtonState('next-question');
	}

	isAnswerCorrect() {
		const selectedButtonAnswer = this.#selectedAnswerButton.querySelector('.main-app__topic-btn-text');
		return this.#mainApplication.getCorrectAnswer() === selectedButtonAnswer.textContent;
	}

	goToNextQuestion() {
		this.#mainApplication.increaseQuestionNumber();

		if (this.#mainApplication.getQuestionNumber() >= this.#maxQuestions) {
			this.#mainApplication.setApplicationState('score-view');
			this.#uiManager.updateMultiFunctionButtonText(this.#multiFunctionButton, 'Restart quiz');
			this.setMultiFunctionButtonState('start-again');
			return;
		}

		this.#mainApplication.setQuestionState();
		this.#uiManager.updateQuestionsUI();

		this.#uiManager.disableMultiFunctionButtonUI(this.#multiFunctionButton);
		this.#uiManager.updateMultiFunctionButtonText(this.#multiFunctionButton, 'Submit answer');

		this.setOptionButtonsState('waiting-for-submit');
		this.setMultiFunctionButtonState('waiting-for-selection');
	}

	startAgain() {
		/* Move application state to 'start' */
		this.#mainApplication.setApplicationState('start-view');
		this.setOptionButtonsState('topic-selection');
		this.setMultiFunctionButtonState('waiting-for-selection');
		this.#uiManager.resetOptionButtonsUI(this.#optionButtons);
		this.#uiManager.disableMultiFunctionButtonUI(this.#multiFunctionButton);
		this.#uiManager.updateMultiFunctionButtonText(this.#multiFunctionButton, 'Submit answer');
	}
}