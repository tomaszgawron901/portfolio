function scrollToElement(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// !make sure that element is in view(is active) before using it.
function centerElement(element) {
    let parent = element.offsetParent
    let halfOfParentHeight = parent.clientHeight / 2;
    let scrollPosition = halfOfParentHeight + parent.scrollTop;

    let topBoundary = element.offsetTop + halfOfParentHeight;
    if (scrollPosition < topBoundary) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        return;
    }

    let bottomBoundary = element.offsetTop + element.offsetHeight - halfOfParentHeight;
    if (scrollPosition > bottomBoundary) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
        return;
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