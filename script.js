// Constants

// API base url variable
const BASE_URL = "https://gateway.marvel.com";

// API key variable
const API_KEY = "bc26cb9df88a2b0baf8aff36d5e14665";

// Variables

// global data variable
let marvelData;

// Cached Element References

const $form = $("form");
const $input = $("input[type='text']");
const $main = $("main");
const $storiesDiv = $(".stories");
const $storyTitle = $(".story-title");

// Event Listeners

// event listener on form element, listens for user submit
$form.on("submit", handleSubmit);

// Functions

// handleSubmit function:
// selects event object
// prevents form from refreshing page
// takes input value and sets to variable
// jQuery AJAX method + API call + API Key -> request Marvel's API using API key
// successful request: returns promise object (data)
// take data from API and set it to global variable "marvelData" -> can now use anywhere in code
// render function called -> presents data in the DOM
function handleSubmit(evt) {
    evt.preventDefault();
    const characterName = $input.val();
    $.ajax(`${BASE_URL}:443/v1/public/characters?name=${characterName}&limit=100&apikey=${API_KEY}`)
        .then(function (data) {
            marvelData = data;
            render();
        }, function (error) {
            console.log("promise failed");
            console.log(error);
        });
};

// render function:
// enter into data object and access name, description, and image of character
// assign each of those values to a variable
// if the imageURL variable includes the words "not available" -> render only name of character and description
// otherwise (else), render the name of the character, description, and the image
// render these variables to the DOM using cached element references + interpolation
function render() {
    const name = marvelData.data.results[0].name;
    const description = marvelData.data.results[0].description;
    const imageURL = (marvelData.data.results[0].thumbnail.path) + "." + marvelData.data.results[0].thumbnail.extension;
    if (imageURL.includes("not_available")) {
        $main.html(`
        <article class="name-and-desc">
            <h3 class="name-title">${name}</h3>
            <p>${description}</p>
        </article>
    `)
        // loop through event array and grab the name property within each element of the array
        // append each name property from each element to the DOM
        const eventArray = marvelData.data.results[0].events.items;
        for (let i = 0; i < eventArray.length; i++) {
            let stories = eventArray[i].name;
            $storiesDiv.append(`<p>${stories}</p>`);
        }
        // CSS edits to events div
        $storiesDiv.css({
            "display": "flex",
            "flex-wrap": "wrap",
            "justify-content": "space-between",
            "width": "550px",
            "margin": "0 0 40px 0"
        });
        // CSS edits to "featured in" title
        $storyTitle.css({
            "display": "block",
            "margin": "-20px 0 10px 0"
        });
        // add class to "featured in" title
        $storyTitle.addClass("story-title-font");
        // CSS edits to main element
        $main.css({
            "display": "flex",
            "flex-wrap": "wrap",
            "justify-content": "center",
            "align-items": "center",
        });
        // cache image elements from the API
        // add circular border around those images
        const $image = $(".image");
        $image.css({
            "border-radius": "50%"
        });
        // cache name of character and description article element
        // CSS edits to cached article element
        const $nameAndDesc = $(".name-and-desc");
        $nameAndDesc.css({
            "font-size": "18px",
            "width": "275px",
            "margin": "0 0 20px 0",
            "padding": "10px"
        });
        // cache name of character
        // add class to "nameTitle"
        const $nameTitle = $(".name-title");
        $nameTitle.addClass("title-font");
        // clear input area after user submits
        $input.val("");
    } else {
        $main.html(`
        <article class="name-and-desc">
            <h3 class="name-title">${name}</h3>
            <p>${description}</p>
        </article>
        <article class="image">
            <img src="${imageURL}" class="image" alt="Image of Marvel Character" width="325" height="325">
        </article>
    `);
        // loop through event array and grab the name property within each element of the array
        // append each name property from each element to the DOM
        const eventArray = marvelData.data.results[0].events.items;
        for (let i = 0; i < eventArray.length; i++) {
            let stories = eventArray[i].name;
            $storiesDiv.append(`<p>${stories}</p>`);
        }
        // CSS edits to events div
        $storiesDiv.css({
            "display": "flex",
            "flex-wrap": "wrap",
            "justify-content": "space-between",
            "width": "550px",
            "margin": "0 0 40px 0"
        });
        // CSS edits to "featured in" title
        $storyTitle.css({
            "display": "block",
            "margin": "-20px 0 10px 0"
        });
        // add class to "featured in" title
        $storyTitle.addClass("story-title-font");
        // CSS edits to main element
        $main.css({
            "display": "flex",
            "flex-wrap": "wrap",
            "justify-content": "center",
            "align-items": "center",
        });
        // cache image elements from the API
        // add circular border around those images
        const $image = $(".image");
        $image.css({
            "border-radius": "50%"
        });
        // cache name of character and description article element
        // CSS edits to cached article element
        const $nameAndDesc = $(".name-and-desc");
        $nameAndDesc.css({
            "font-size": "18px",
            "width": "275px",
            "margin": "0 0 20px 0",
            "padding": "10px"
        });
        // cache name of character
        // add class to "nameTitle"
        const $nameTitle = $(".name-title");
        $nameTitle.addClass("title-font");
        // clear input area after user submits
        $input.val("");
    }
};