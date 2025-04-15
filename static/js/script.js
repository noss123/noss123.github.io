// capturing events
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
    } else if (["p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "dl", "ol", "li", "dt", "dd", "i", "b"].includes(tag)) {
        object = "text";
    } else if (tag === "textarea") {
        object = "textbox";
    } else if (tag === "button") {
        object = "button";
    } else if (tag === "header") {
        object = "header";
    } else if (tag === "footer") {
        object = "footer";
    } else if (tag === "nav") {
        object = "navigation";
    } else if (tag === "body") {
        object = "body";
    }
    record("click", object);
}

document.addEventListener("DOMContentLoaded", () => {
    record("view", "page");
    let userinput = document.getElementById("userinput");
    let submitted = document.getElementById("submitfb");
    
    if (userinput) {
        userinput.addEventListener("input", () => {
            document.getElementById("inputwarning").style.display = "none";
            processing();
        });
    }

    if (submitted) {
        submitted.addEventListener("click", () => {
            validate_feedback();
        });
    }
});

document.addEventListener("click", ifclicked);


// feedback section
function validate_feedback() {
    const text = document.getElementById("userinput").value;
    if (text.length <= 10000) {
        document.getElementById("inputwarning").style.display = "block";
    } else {
        document.getElementById("inputwarning").style.display = "none";
    }
}

function processing() {
    let text = document.getElementById("userinput").value;

    let letters = (text.match(/[a-zA-Z]/g) || "").length;
    let words = (text.split(/\s+/g).filter(Boolean) || "").length;
    let spaces = (text.match(/\s/g) || "").length;
    let newlines = (text.match(/\n/g) || "").length;
    let specials = (text.match(/[^a-zA-Z0-9\s\n]/g) || "").length;

    if (text === "") {
        letters = words = spaces = newlines = specials = 0;
    }

    document.getElementById("letters").textContent = letters;
    document.getElementById("words").textContent = words;
    document.getElementById("spaces").textContent = spaces;
    document.getElementById("newlines").textContent = newlines;
    document.getElementById("specials").textContent = specials;

    let tokens = text.split(/\s+/g).filter(Boolean);

    const pronouns = [
        "i", "you", "he", "she", "it", "we", "they",
        "me", "him", "her", "us", "them",
        "mine", "yours", "hers", "ours", "theirs",
        "myself", "yourself", "himself", "herself", "itself", "ourselves", "yourselves", "themselves"
    ];

    const prepositions = [
        "about", "above", "across", "after", "against", "along", "among", "around", 
        "before", "behind", "below", "beneath", "beside", "between", "beyond", "by", 
        "despite", "during", "except", "for", "from", "in", "inside", "into", "near", 
        "of", "off", "on", "onto", "out", "outside", "over", "past", "since", "through", 
        "throughout", "till", "to", "toward", "under", "underneath", "until", "up", 
        "upon", "with", "within", "without"
    ];

    const indefs = ["a", "an"];
    
    let pronounct = {};
    let prepoct = {};
    let indefct = {};

    tokens.forEach(word => {
        // isolates the word in lowercase so that we can check if it is a pronoun, preposition or indefinite article
        word = word.toLowerCase().replace(/[^a-zA-Z]/g, "");

        if (pronouns.includes(word)) {
            if (pronounct[word]) {
                pronounct[word] += 1;
            } else {
                pronounct[word] = 1;
            }
        } else if (prepositions.includes(word)) {
            if (prepoct[word]) {
                prepoct[word] += 1;
            } else {
                prepoct[word] = 1;
            }
        } else if (indefs.includes(word)) {
            if (indefct[word]) {
                indefct[word] += 1;
            } else {
                indefct[word] = 1;
            }
        }
    });

    let pronounhtml = "";
    let prepohtml = "";
    let indefhtml = "";

    pronouns.forEach(word => {
        if (pronounct[word]) {
            pronounhtml+=(word+": "+pronounct[word]+"<br/>");
        }
    });

    prepositions.forEach(word => {
        if (prepoct[word]) {
            prepohtml+=(word+": "+prepoct[word]+"<br/>");
        }
    });

    indefs.forEach(word => {
        if (indefct[word]) {
            indefhtml+=(word+": "+indefct[word]+"<br/>");
        }
    });

    document.getElementById("pronouns").innerHTML = pronounhtml;
    document.getElementById("prepos").innerHTML = prepohtml;
    document.getElementById("indefs").innerHTML = indefhtml;
}