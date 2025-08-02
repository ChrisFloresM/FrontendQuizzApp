export {UIManager};

class UIManager {
	#mainApplication;
	#mainApplicationUI;

	#topicIconBox;
	#topicIcon;
	#topicName;

	#questionNumber;
	#currentQuestion;
	#progressBar;
	#progress;

	#correctAnswerNumber;
	#appErrorMessage;

	constructor(mainApplication) {
		/* Topic related elements */
		this.#topicIconBox = document.querySelectorAll('.main-app__topic-icon-box');
		this.#topicIcon = document.querySelectorAll('.main-app__topic-icon');
		this.#topicName = document.querySelectorAll('.main-app__topic-name');

		/* Question related elements */
		this.#questionNumber = document.querySelector('.current-question-num');
		this.#currentQuestion = document.querySelector('.main-app__quiz-question');

		/* Progress bar elements */
		this.#progressBar = document.querySelector('.main-app__quiz-current-progress');

		/* Score elements */
		this.#correctAnswerNumber = document.querySelector('.total-score');

		/*Error message*/
		this.#appErrorMessage = document.querySelector('.main-app__error');

		this.#mainApplication = mainApplication;
		this.#mainApplicationUI = document.querySelector('.main-app');
	}

	resetOptionButtonsUI(optionButtons) {
		optionButtons.forEach((button) => {
			const textElement = button.querySelector('.main-app__topic-btn-text');
			const iconBox = button.querySelector('.main-app__topic-icon-box');
			textElement.textContent = button.dataset.topic;
			iconBox.className = `main-app__topic-icon-box btn-${button.dataset.topic}`
		})
	}

	updateQuestionsUI() {
		if (this.#mainApplication.areCurrentQuestionsInvalid()) {
			/* Error occured -> Do not change to next state */
			console.error('Error retreiving the questions');
			return;
		}

		this.clearAnswersUI();
		this.updateQuestionNumberUI();
		this.updateCurrentQuestionUI();
		this.updatePorgressBarUI();
		this.updateOptionsButtonsUI();

	}

	updateTopicUI() {
		const currentTopic = this.#mainApplication.getCurrentTopic();

		this.#topicIconBox.forEach(box => {
			box.className = `main-app__topic-icon-box btn-${currentTopic}`
		});

		this.#topicIcon.forEach(icon => {
			icon.src = this.#mainApplication.iconSrcs[currentTopic];
		});

		this.#topicName.forEach(name => {
			name.textContent = currentTopic;
		});
	}

	updateQuestionNumberUI() {
		this.#questionNumber.textContent = `${this.#mainApplication.getQuestionNumber() + 1}`;
	}

	updateCurrentQuestionUI() {
		this.#currentQuestion.textContent = this.#mainApplication.getCurrentQuestion();
	}

	updatePorgressBarUI() {
		this.#progress = ((this.#mainApplication.getQuestionNumber() + 1) / 10) * 100;
		this.#progressBar.style.width = `${this.#progress}%`;
	}

	updateOptionsButtonsUI() {
		const optionButtons = document.querySelectorAll('.main-app__topic-btn-text');
		const currentOptions = this.#mainApplication.getQuestionOptions();
		const correctAnswer = this.#mainApplication.getCorrectAnswer();

		let optionNumber = 0;
		optionButtons.forEach(button => {
			button.textContent = currentOptions[optionNumber];
			this.setCorrectAnswerAttributes(button, currentOptions[optionNumber], correctAnswer);
			optionNumber++;
		});
	}

	setCorrectAnswerAttributes(button, currentOption, correctAnswer) {
		if (currentOption === correctAnswer) {
			button.setAttribute('data-correct-answer', 'true');
		} else {
			button.setAttribute('data-correct-answer', 'false');
		}
	}

	updateSelectedButtonUI(button) {
		const selectedButton = document.querySelector('.main-app__button.selected-option');

		if (selectedButton) {
			selectedButton.classList.remove('selected-option');
		}

		button.classList.add('selected-option');
	}

	enableMultiFunctionButtonUI(button) {
		button.classList.remove('not-selected');
	}

	disableMultiFunctionButtonUI(button) {
		button.classList.add('not-selected');
	}

	updateMultiFunctionButtonText(button, text) {
		button.textContent = text;
	}

	updateApplicationStateUI(currentState, nextState) {
		this.#mainApplicationUI.classList.remove(currentState);
		this.#mainApplicationUI.classList.add(nextState);
	}

	setCorrectAnswerUI() {
		const correctAnswerText = document.querySelector('.main-app__topic-btn-text[data-correct-answer = "true"]');
		const correctAnswerButton = correctAnswerText.closest('.main-app__button');

		correctAnswerButton.classList.add('correct-option');
	}

	updateCorrectAnswersNumberUI(total) {
		this.#correctAnswerNumber.textContent = total;
	}

	setWrongAnswerUI() {
		this.setCorrectAnswerUI();

		const selectedButton = document.querySelector('.main-app__button.selected-option');
		selectedButton.classList.add('wrong-option');
	}

	displayWaitingSelectionError() {
		if (this.#appErrorMessage.classList.contains('hidden')) {
			this.#appErrorMessage.classList.remove('hidden');
		}
	}

	removeWaitingSelectionError() {
		if (!this.#appErrorMessage.classList.contains('hidden')) {
			this.#appErrorMessage.classList.add('hidden');
		}
	}

	clearAnswersUI() {
		this.clearButtonClass('selected');
		this.clearButtonClass('correct');
		this.clearButtonClass('wrong');
 	}

  clearButtonClass(classToRemove) {
		const button = document.querySelector(`.main-app__button.${classToRemove}-option`);

		if (button) {
			button.classList.remove(`${classToRemove}-option`);
		}
	}

}