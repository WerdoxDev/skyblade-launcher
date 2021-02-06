import { transformAnimation } from './animations';

function switchToPage(id, number, display) {
    let tabContent = document.getElementsByName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    document.getElementById(id + "-container").style.display = display;
    transformAnimation('#page-indicator', 250, null, (number * 100) + '%');
}

export default switchToPage;