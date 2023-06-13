'use strict';

// Query selector
const ulElement = document.querySelector('.js_character_list');
const ulFavorite = document.querySelector('.js_character_fav');
const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btn');
// const url = 'https://api.disneyapi.dev/character?pageSize=50';
const url = 'https://dev.adalab.es/api/disney?pageSize=15';

// Variables globales
let characterFavorite = [];
let characterApi = [];

// Realizamos una llamada a la Api donde tenemos almacenados los datos para obtener una respuesta en formato json.Lo guardamos en una variable y renderizamos las funciones para obtener la lista cuando la pagina se cargue
fetch(url)
  .then((response) => response.json())
  .then((inf) => {
    characterApi = inf.data;
    ulElement.innerHTML = renderCharacter(characterApi);
    generateEvents();
  });

// Obtenemos el valor de la clave desde el local storage para usarlo en la funcion init
const characterLS = JSON.parse(localStorage.getItem('characters'));

// Esta funcion sirve para cargar la lista de favoritos que tenemos almacenada en el local storage al cargar la pagina
init();
function init() {
  if(characterLS !== null) {
    characterFavorite = characterLS;
    renderFavoriteList();
  }
}
//En esta funcion creamos un bucle for para recorrer el array que obtenemos del fetch e ir pintando en pantalla cada elemento de ese array sustituyendo cada personaje en la lista y pintando el siguiente.Tambien hacemos una validacion por si no hay imagen en el personaje.
function renderCharacter(list) {
  let html = '';
  for(const cartoon of list){
    if( cartoon.imageUrl === ''){
      html +=`<li class="js_li_character" id="${cartoon._id}"><img src="/assets/images/disney.png" alt=""><p>${cartoon.name}</p></li>`;
    }
    else {
      html +=`<li class="js_li_character" id="${cartoon._id}"><img src="${cartoon.imageUrl}" alt=""><p>${cartoon.name}</p></li>`;
    }
  }

  return html;
}
//  En esta funcion generamos el evento donde recogemos todos los <li> y los recorremos con un for para una vez clicado el elemento lo identiifique y pase a hacer toda la funcion manejadora.
function generateEvents(){
  const liCharacter = document.querySelectorAll('.js_li_character');
  for(const li of liCharacter){
    li.addEventListener('click', handleClick);
  }
}
//Esta funcion manejadora de evento identifica que elemento ha sido clicado y lo agrega a la lista de favoritos o lo quita.Tambien guarfa en el local storage el elementos que se ha clicado para pasarlo a favoritos.
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

  localStorage.setItem('characters' , JSON.stringify(characterFavorite));

  renderFavoriteList();
}
//Esta funcion nos sirve para renderizar la lista de favoritos para poder pintarla dentro del <ul> de favoritos
function renderFavoriteList(){
  ulFavorite.innerHTML = '';
  for(const fav of characterFavorite) {
    ulFavorite.innerHTML += `<li class="js_li_character colorCharacter" id="${fav._id}"><img src="${fav.imageUrl}" alt=""><p class="colorLetter">${fav.name}</p></li>`;
  }
}

//Aqui cremos un evento para que nos busque por el valor del input un personaje que este en ese array que nos devuelve el fetch y pintarlo en pantalla
const handleSearch =(event) => {
  event.preventDefault();
  const search = inputSearch.value;
  fetch(`https://api.disneyapi.dev/character?name=${search}`)
    .then((response) => response.json())
    .then((inf) => {
      characterApi = inf.data;
      ulElement.innerHTML = renderCharacter(characterApi);
      generateEvents();
    });
};
// Evento de busqueda de personaje
btnSearch.addEventListener('click', handleSearch);



