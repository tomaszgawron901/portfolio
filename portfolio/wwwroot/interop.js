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

function isInCenter(element) {
    let parent = element.offsetParent
    let scrollPosition = parent.clientHeight / 2 + parent.scrollTop;
    const elementTopPosition = element.offsetTop;
    const elementBottomPosition = element.offsetTop + element.offsetHeight;

    if (scrollPosition <= elementBottomPosition && scrollPosition > elementTopPosition) {
        return true;
    }
    return false;
}

function isInView(element) {
    const parent = element.offsetParent;

    const scrollTopPosition = parent.scrollTop;
    const scrollBottomPosition = parent.clientHeight + parent.scrollTop;
    const elementTopPosition = element.offsetTop;
    const elementBottomPosition = element.offsetTop + element.offsetHeight;

    if (scrollTopPosition < elementBottomPosition && scrollBottomPosition > elementTopPosition) {
        return true;
    }
    return false;
}


//function getElementProperty(element, property) {
//    return element[property];
//}


function appendBackgroundApp(element) {
    return storeObjectRef(new BackgroundApp(element));
}

function stopBackground(backgroundApp) {
    backgroundApp.stop();
}

function startBackground(backgroundApp) {
    backgroundApp.start();
}


DotNet.attachReviver(function (key, value) {
    if (value &&
        typeof value === 'object' &&
        value.hasOwnProperty(jsRefKey) &&
        typeof value[jsRefKey] === 'number') {

        var id = value[jsRefKey];
        if (!(id in jsObjectRefs)) {
            throw new Error("This JS object reference does not exists : " + id);
        }
        const instance = jsObjectRefs[id];
        return instance;
    } else {
        return value;
    }
});

var jsObjectRefs = {};
var jsObjectRefId = 0;
const jsRefKey = '__jsObjectRefId';
function storeObjectRef(obj) {
    var id = jsObjectRefId++;
    jsObjectRefs[id] = obj;
    var jsRef = {};
    jsRef[jsRefKey] = id;
    return jsRef;
}
function deleteObjectRef(ref) {
    delete jsObjectRefs[ref];
}