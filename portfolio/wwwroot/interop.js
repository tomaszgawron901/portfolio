function scrollToElement(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

function scrollToElementByID(ID) {
    let element = document.getElementById(ID);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

getBodyScrolPosition: () => {
    return document.body.scrollTop;
}

getWindowHeight: () => {
    return window.hei
}