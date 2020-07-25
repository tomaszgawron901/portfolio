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

function isInView(element) {
    let parent = element.offsetParent
    let scrollPosition = parent.clientHeight / 2 + parent.scrollTop;

    if ( scrollPosition <= element.offsetTop + element.offsetHeight && scrollPosition > element.offsetTop) {
        return true;
    }
    return false;
}