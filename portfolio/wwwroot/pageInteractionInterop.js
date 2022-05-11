
export function scrollToElement(element) {
    parent = element.offsetParent;
    if (parent.scrollTo) {
        parent.scrollTo({
            top: element.offsetTop,
            left: 0,
            behavior: 'smooth'
        })
    } else {
        parent.scrollTop = element.offsetTop;
    }
}

export function isInCenter(element) {
    let parent = element.offsetParent
    let scrollPosition = parent.clientHeight / 2 + parent.scrollTop;
    const elementTopPosition = element.offsetTop;
    const elementBottomPosition = element.offsetTop + element.offsetHeight;

    if (scrollPosition <= elementBottomPosition && scrollPosition > elementTopPosition) {
        return true;
    }
    return false;
}



export function getWindowSize() {
    return { width: window.innerWidth, height: window.innerHeight };
}

export function subscribeToDOMEvent(element, eventName, bridge, converter) {
    let eventHandler = (event) => {
        if (converter == null) {
            bridge.invokeMethodAsync("Invoke", event);
        }
        else {
            bridge.invokeMethodAsync("Invoke", converter(event));
        } 
    }
    element.addEventListener(eventName, eventHandler);
}

export function subscribeToWindowResizeEvent(eventName, bridge) {
    const converter = (event) => new { width: window.innerWidth, height: window.innerHeight };

    return subscribeToDOMEvent(window, eventName, bridge, converter);
}

export function subscribeToDocumentVisibilityChangeEvent(eventName, bridge) {
    const converter = (event) => new {isVisible: document.visibilityState == "visible" };
    
    return subscribeToDOMEvent(document, eventName, bridge);
}