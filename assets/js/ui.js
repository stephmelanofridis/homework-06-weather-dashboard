class UI {
    constructor() {
        this.uiContainer = document.querySelector("#search-query");
        this.city;
    }

    populateUI(data) {
        this.uiContainer.textContent = `${data}`
    }
}