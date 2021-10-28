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
            <img src="${imageURL}" class="image" alt="Image of Marvel Character" width="325" height="325">
        </article>
        <article class="name-and-desc">
            <h3 class="name-title">${name}</h3>
            <p>${description}</p>
        </article>    
    `);
    $main.css({
        "display": "flex",
        "justify-content": "center",
        "align-items": "center",
    });
    const $image = $(".image");
    $image.css({
        "border-radius": "50%"
    });
    const $nameAndDesc = $(".name-and-desc");
    $nameAndDesc.css({
        "font-size": "20px",
        "width": "300px",
        "margin": "20px",
        "padding": "10px"
    });
    const $nameTitle = $(".name-title");
    $nameTitle.addClass("title-font");
};
