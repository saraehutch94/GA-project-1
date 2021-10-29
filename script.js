// Constants

const BASE_URL = "https://gateway.marvel.com";
const API_KEY = "bc26cb9df88a2b0baf8aff36d5e14665";

// Variables

let marvelData;

// Cached Element References

const $form = $("form");
const $input = $("input[type='text']");
const $main = $("main");
const $storiesDiv = $(".stories");
const $storyTitle = $(".story-title");

// Event Listeners

$form.on("submit", handleSubmit);

// Functions

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

function render() {
    const name = marvelData.data.results[0].name;
    const description = marvelData.data.results[0].description;
    const imageURL = (marvelData.data.results[0].thumbnail.path) + "." + marvelData.data.results[0].thumbnail.extension;
    $main.html(`
        <article class="name-and-desc">
            <h3 class="name-title">${name}</h3>
            <p>${description}</p>
        </article>
        <article class="image">
            <img src="${imageURL}" class="image" alt="Image of Marvel Character" width="325" height="325">
        </article>
    `);
    const eventArray = marvelData.data.results[0].events.items;
    for (let i = 0; i < eventArray.length; i++) {
        let stories = eventArray[i].name;
        $storiesDiv.append(`<p>${stories}</p>`);
    }
    $storiesDiv.css({
        "display": "flex",
        "flex-wrap": "wrap",
        "justify-content": "space-between",
        "width": "550px"
    });
    $storyTitle.css({
        "display": "block",
        "margin": "-20px 0 10px 0"
    });
    $storyTitle.addClass("story-title-font");
    $main.css({
        "display": "flex",
        "flex-wrap": "wrap",
        "justify-content": "center",
        "align-items": "center",
    });
    const $image = $(".image");
    $image.css({
        "border-radius": "50%"
    });
    const $nameAndDesc = $(".name-and-desc");
    $nameAndDesc.css({
        "font-size": "18px",
        "width": "275px",
        "margin": "0 0 20px 0",
        "padding": "10px"
    });
    const $nameTitle = $(".name-title");
    $nameTitle.addClass("title-font");
};
