// Constants

const BASE_URL = "https://gateway.marvel.com";
const API_KEY = "bc26cb9df88a2b0baf8aff36d5e14665";

// Variables

let marvelData;

// Cached Element References

const $form = $("form");
const $input = $("input[type='text']");
const $main = $("main");

// Event Listeners

$form.on("submit", handleSubmit);

// Functions

function handleSubmit(evt) {
    evt.preventDefault();
    const characterName = $input.val();
    $.ajax(`${BASE_URL}:443/v1/public/characters?name=${characterName}&apikey=${API_KEY}`)
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
        <article class="image">
            <img src="${imageURL}" class="image" alt="Image of Marvel Character" width="350" height="350">
        </article>
        <article class="name-and-desc">
            <h3>${name}</h3>
            <p>${description}</p>
        </article>    
    `);
    $main.css({
        "display": "flex",
        "justify-content": "center",
        "align-items": "center"
    });
    const $image = $(".image");
    $image.css({
        "border-radius": "50%"
    });
};
