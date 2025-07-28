export {UIManager};

class UIManager {
	#mainApplication

	#topicIconBox;
	#topicIcon;
	#topicName;

	#questionNumber;
	#currentQuestion;
	#progressBar;
	#progress;

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

		this.#mainApplication = mainApplication;
	}

	updateQuestionsUI() {
		if (!this.#mainApplication.mainAppState.currentQuestions || this.#mainApplication.mainAppState.currentQuestions.length === 0) {
			/* Error occured -> Do not change to next state */
			console.error('Error retreiving the questions');
			return;
		}

		this.updateQuestionNumberUI();
		this.updateCurrentQuestionUI();
		this.updatePorgressBarUI();
		this.updateOptionsButtonsUI();
	}

	updateTopicUI() {
		this.#topicIconBox.forEach(box => {
			box.className = `main-app__topic-icon-box btn-${this.#mainApplication.mainAppState.currentTopic}`
		});

		this.#topicIcon.forEach(icon => {
			icon.src = this.#mainApplication.iconSrcs[this.#mainApplication.mainAppState.currentTopic];
		});

		this.#topicName.forEach(name => {
			name.textContent = this.#mainApplication.mainAppState.currentTopic;
		});
	}

	updateQuestionNumberUI() {
		this.#questionNumber.textContent = (this.#mainApplication.mainAppState.currentQuestion + 1).toString();
	}

	updateCurrentQuestionUI() {
		this.#currentQuestion.textContent = this.#mainApplication.mainAppState.currentQuestions[this.#mainApplication.mainAppState.currentQuestion].question;
	}

	updatePorgressBarUI() {
		this.#progress = ((this.#mainApplication.mainAppState.currentQuestion + 1) / 10) * 100;
		this.#progressBar.style.width = `${this.#progress}%`;
	}

	updateOptionsButtonsUI() {
		const optionButtons = document.querySelectorAll('.main-app__topic-btn-text');
		let optionNumber = 0;
		optionButtons.forEach(button => {
			button.textContent = this.#mainApplication.mainAppState.currentQuestions[this.#mainApplication.mainAppState.currentQuestion].options[optionNumber];
			optionNumber++;
		});
	}
}