export {LocalStorageManager};

class LocalStorageManager {
	static saveToLocalStorage(property, value) {
		try {
			localStorage.setItem(property, value);
		} catch(e) {
			console.error(`Error saving to local storage: ${e}`);
		}
	}

	static getFromLocalStorage(property) {
		try {
			return localStorage.getItem(property);
		} catch(e) {
			console.error(`Error retrieving from local storage: ${e}`);
			return null;
		}
	}
}
