function scrollToElement(element) {
    parent = element.offsetParent;
    if (element.scrollTo) {
        parent.scrollTo({
            top: element.offsetTop,
            left: 0,
            behavior: 'smooth'
        })
    } else {
        parent.scrollTop = element.offsetTop;
    }
}

// !make sure that element is in view(is active) before using it.
function centerElement(element) {
    if (element.scrollTo == null) {
        return;
    }

    let parent = element.offsetParent;
    let halfOfParentHeight = parent.clientHeight / 2;
    let scrollPosition = halfOfParentHeight + parent.scrollTop;

    let topBoundary = element.offsetTop + halfOfParentHeight;
    if (scrollPosition < topBoundary) {
        destination = element.offsetTop;
        parent.scrollTo({
            top: destination,
            left: 0,
            behavior: 'smooth'
        })
        return;
    }

    let bottomBoundary = element.offsetTop + element.offsetHeight - halfOfParentHeight;
    if (scrollPosition > bottomBoundary) {
        destination = element.offsetTop + element.offsetHeight - parent.clientHeight;
        parent.scrollTo({
            top: destination,
            left: 0,
            behavior: 'smooth'
        })
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

function appendBackgroundApp(element) {
    new BackgroundApp(element);
}