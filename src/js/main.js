'use strict';

const ulElement = document.querySelector('.js_character_list');
const url = 'https://api.disneyapi.dev/character?pageSize=50';



fetch(url)
.then((response) => response.json())
.then((inf) => {
    console.log(inf);
    ulElement.innerHTML = renderCharacter(inf.data[0]);
});

function renderCharacter(inf) {
     let html =
    ` <li><img src="${inf.imageUrl}"alt="">
    <p>${inf.name}</p></li>`
return html
};

