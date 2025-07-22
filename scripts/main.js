/* 1. Get the button element to work with */
document.addEventListener('DOMContentLoaded', init);

function init() {
	const themeManager = new ThemeManager();
}

class ThemeManager {
	#themeChangeButton;
	#themeChangeThumb;
	#iconSun;
	#iconMoon;

	constructor() {
		this.init();
	}
	
	init() {
		this.#themeChangeButton = document.querySelector('.main-app__theme-button');
		this.#themeChangeThumb = document.querySelector('.main-app__theme-button-thumb');
		this.#iconSun = document.querySelector('.icon-sun');
		this.#iconMoon = document.querySelector('.icon-moon');

		this.#themeChangeButton.addEventListener('click', () => {
			this.toggleTheme();
		});
		this.setTheme(this.calculateCurrentSetting());
	}
	
	calculateCurrentSetting() {
		const localStorageTheme = getFromLocalStorage('theme');
		const userPreference = window.matchMedia('(prefers-color-scheme: dark)');

		if (localStorageTheme !== null) {
			return localStorageTheme;
		}

		if (userPreference.matches) {
			return "dark";
		}

		return "light";
	}
	
	setTheme(targetTheme) {
		if (targetTheme === 'dark') {
			document.documentElement.setAttribute('data-theme', targetTheme);
		} else {
			document.documentElement.removeAttribute('data-theme');
		}

		this.modifyButtonThumb(targetTheme);
		this.updateIcons(targetTheme);
	}

	toggleTheme() {
		const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
		const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
		this.setTheme(targetTheme);
		saveToLocalStorage('theme', targetTheme);
	}

	modifyButtonThumb(theme) {
		if (theme === "dark") {
			this.#themeChangeThumb.classList.add("right-sided");
		} else {
			this.#themeChangeThumb.classList.remove("right-sided");
		}
	}

	updateIcons(theme) {
		let targetIcons;
		if (theme === 'dark') {
			targetIcons = 'light';
		} else {
			targetIcons = 'dark';
		}
		this.#iconSun.src = `../img/icon-sun-${targetIcons}.svg`;
		this.#iconMoon.src = `../img/icon-moon-${targetIcons}.svg`;
	}
}

function saveToLocalStorage(property, value) {
	localStorage.setItem(property, value);
}


function getFromLocalStorage(property) {
	return localStorage.getItem(property);
}

