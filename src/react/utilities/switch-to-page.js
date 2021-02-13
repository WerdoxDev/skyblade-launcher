function switchToPage(id, display) {
    let tabContent = document.getElementsByName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    document.getElementById(id).style.display = display;
}

export default switchToPage;