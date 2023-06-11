'use strict';

const ulElement = document.querySelector('.js_character_list');
const url = 'https://api.disneyapi.dev/character?pageSize=50';


let characterFavorite = [];
let characterApi = [];

fetch(url)
.then((response) => response.json())
.then((inf) => {
    characterApi = inf.data;
    ulElement.innerHTML = renderCharacter(characterApi);
    generateEvents();
});

function renderCharacter(list) {
    let html = '';
    for(const personaje of list){
        if( personaje.imageUrl === ''){
            html +=`<li class="js_li_character" id="${personaje._id}"><img src="/assets/images/disney.png" alt=""><p>${personaje.name}</p></li>`
        }
        else {
            html +=`<li class="js_li_character" id="${personaje._id}"><img src="${personaje.imageUrl}" alt=""><p>${personaje.name}</p></li>`
        }
    }

    return html
};

function generateEvents(){
    const liCharacter = document.querySelectorAll('.js_li_character');
    for(const li of liCharacter){
        li.addEventListener('click', handleClick);
        // console.log(li)
        }
}

function handleClick(event) {
    const idCharacter = String(event.currentTarget.id);

    const selectedCharacter = characterApi.find((item) => String(item._id) === idCharacter);
    console.log(selectedCharacter);
}



