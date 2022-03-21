const LOCALSTORAGE_KEY = "Intervals"

const LocalStorage = {

    saveIntervals(intervals) {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(intervals) )
    },

    loadIntervals() {
        const loadedContent = localStorage.getItem(LOCALSTORAGE_KEY);
        return JSON.parse(loadedContent);
    }

}

export default LocalStorage;