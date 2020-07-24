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

    if (scrollPosition > element.offsetTop && scrollPosition <= element.offsetTop + element.offsetHeight) {
        return true;
    }
    return false;
}

function getActive(ref) {
    return ref.activePage;
}

function initializeTabControl(ref, control) {
    ref.pages = [];
    ref.activePage = -1;
    ref.onscroll = () => {
        let outp = -1;
        let scrollPosition = ref.clientHeight / 2 + ref.scrollTop;
        for (let i = 0; i < ref.pages.length; i++) {
            if (scrollPosition <= ref.pages[i].offsetTop + ref.pages[i].offsetHeight) {
                outp = i;
                break;
            }
        }
        if (ref.activePage != outp) {
            ref.activePage = outp;
            control.invokeMethodAsync("SetActivePage", ref.activePage);
        }
    }
}

function addPage(ref, index, page) {
    ref.pages[index] = page;
}