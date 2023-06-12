"use strict";const ulElement=document.querySelector(".js_character_list"),ulFavorite=document.querySelector(".js_character_fav"),inputSearch=document.querySelector(".js_inputSearch"),btnSearch=document.querySelector(".js_btn"),url="https://dev.adalab.es/api/disney?pageSize=15";let characterFavorite=[],characterApi=[];const characterLS=JSON.parse(localStorage.getItem("characters"));function init(){null!==characterLS&&(characterFavorite=characterLS,renderFavoriteList())}function renderCharacter(e){let r="";for(const t of e)""===t.imageUrl?r+=`<li class="js_li_character" id="${t._id}"><img src="/assets/images/disney.png" alt=""><p>${t.name}</p></li>`:r+=`<li class="js_li_character" id="${t._id}"><img src="${t.imageUrl}" alt=""><p>${t.name}</p></li>`;return r}function generateEvents(){const e=document.querySelectorAll(".js_li_character");for(const r of e)r.addEventListener("click",handleClick)}function handleClick(e){const r=String(e.currentTarget.id),t=characterApi.find(e=>String(e._id)===r),a=characterFavorite.findIndex(e=>String(e._id)===r);-1===a?characterFavorite.push(t):characterFavorite.splice(a,1),localStorage.setItem("characters",JSON.stringify(characterFavorite)),renderFavoriteList()}function renderFavoriteList(){ulFavorite.innerHTML="";for(const e of characterFavorite)ulFavorite.innerHTML+=`<li class="js_li_character colorCharacter" id="${e._id}"><img src="${e.imageUrl}" alt=""><p class="colorLetter">${e.name}</p></li>`}fetch(url).then(e=>e.json()).then(e=>{characterApi=e.data,ulElement.innerHTML=renderCharacter(characterApi),generateEvents()}),init();const handleSearch=e=>{e.preventDefault();const r=inputSearch.value;fetch("https://api.disneyapi.dev/character?name="+r).then(e=>e.json()).then(e=>{characterApi=e.data,ulElement.innerHTML=renderCharacter(characterApi),generateEvents()})};btnSearch.addEventListener("click",handleSearch);