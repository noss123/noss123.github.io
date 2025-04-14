function record(event, object) {
    const tstamp = new Date().toString();
    console.log("TIMESTAMP: "+tstamp+", EVENT: "+event+", OBJECT: "+object);
}

function ifclicked(event) {
    let tag = event.target.tagName.toLowerCase();
    let object = "other";
    if (tag === "img") {
        object = "image";
    } else if (tag === "a") {
        object = "link";
    } else if (tag === "div") {
        object = "div";
    } else if (["p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "dl", "ol", "li", "dt", "dd", "i"].includes(tag)) {
        object = "text";
    } else if (tag === "header") {
        object = "header";
    } else if (tag === "footer") {
        object = "footer";
    } else if (tag === "nav") {
        object = "navigation";
    } else if (tag === "body") {
        object = "body";
    }
    record("click", object)
}

document.addEventListener("DOMContentLoaded", () => {
    record("view", "page");
})

document.addEventListener("click", ifclicked);