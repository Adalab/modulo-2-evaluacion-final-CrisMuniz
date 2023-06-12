'use strict';

const ulElement = document.querySelector('.js_character_list');
const ulFavorite = document.querySelector('.js_character_fav');
const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btn');
// const url = 'https://api.disneyapi.dev/character?pageSize=50';
const url = 'https://dev.adalab.es/api/disney?pageSize=15';


let characterFavorite = [];
let characterApi = [];

const characterLS = JSON.parse(localStorage.getItem("characters"));


fetch(url)
.then((response) => response.json())
.then((inf) => {
    characterApi = inf.data;
    ulElement.innerHTML = renderCharacter(characterApi);
    generateEvents();
});

init();
function init() {
    if(characterLS !== null) {
        characterFavorite = characterLS;
        renderFavoriteList();
    }
};

function renderCharacter(list) {
    let html = '';
    for(const cartoon of list){
        if( cartoon.imageUrl === ''){
            html +=`<li class="js_li_character" id="${cartoon._id}"><img src="/assets/images/disney.png" alt=""><p>${cartoon.name}</p></li>`
        }
        else {
            html +=`<li class="js_li_character" id="${cartoon._id}"><img src="${cartoon.imageUrl}" alt=""><p>${cartoon.name}</p></li>`
        }
    };

    return html
};

function generateEvents(){
    const liCharacter = document.querySelectorAll('.js_li_character');
    for(const li of liCharacter){
        li.addEventListener('click', handleClick);
        };
};

function handleClick(event) {
    const idCharacter = String(event.currentTarget.id);

    const selectedCharacter = characterApi.find((item) => String(item._id) === idCharacter);

    const indexCharacter = characterFavorite.findIndex((item) => String(item._id) === idCharacter);

    if (indexCharacter === -1) {
        characterFavorite.push(selectedCharacter);
    }
    else {
        characterFavorite.splice(indexCharacter, 1);
    }

    localStorage.setItem("characters" , JSON.stringify(characterFavorite));

    renderFavoriteList();
};

function renderFavoriteList(){
    ulFavorite.innerHTML = '';
    for(const fav of characterFavorite) {
        ulFavorite.innerHTML += `<li class="js_li_character colorCharacter" id="${fav._id}"><img src="${fav.imageUrl}" alt=""><p class="colorLetter">${fav.name}</p></li>`;
    };
};
const handleSearch =(event) => {
    event.preventDefault();
    console.log("Boton busqueda");
    fetch(`https://api.disneyapi.dev/character?name=${inputSearch.value}`)
    .then((response) => response.json())
    .then((inf) => {
        characterApi = inf.data;
        ulElement.innerHTML = renderCharacter(characterApi);
        generateEvents();
    });
}
btnSearch.addEventListener('click', handleSearch);







