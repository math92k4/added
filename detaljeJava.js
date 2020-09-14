//Overordnede variabler defineres
//Via de to nedenstående variabler hentes id'et fra det valgte objekt ned fra url'en. id'et har variablen id.
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let titler;

const link = "https://spreadsheets.google.com/feeds/list/1Qhbtjd_VhlT8nuxoCCdbNCtfS7jHS7BAOy__kgOHWJM/od6/public/values?alt=json";
const select = document.querySelector("#select");



//Eventlistener venter på at DOM er loaded før den starter selve scriptet via funktionen "hentData"
document.addEventListener("DOMContentLoaded", hentData);









//json-dataet hentes ind
async function hentData() {
    const respons = await fetch(link);
    titler = await respons.json();
    vis();
}









//Scriptet gennemgår google-arrayet for at finde det objektet med samme id-value som hentet fra url'en.
function vis() {
    titler.feed.entry.forEach(titel => {
        if (id == titel.gsx$id.$t) {

            //Når objektet med matchende value er fundet, startes funktionen visDetaljer og objektet sendes med via variablen "titel"
            visDetaljer(titel)
        }
    })
}









//De øsnkede information/values fra objektet fordeles ud i htmlen. (Den valgte class' tekstindput eller src's bliver ligmed den valgte properties value).
function visDetaljer(titel) {
    select.querySelector(".selectTitel").textContent = `${titel.gsx$titel.$t} - ${titel.gsx$kunstner.$t}`;
    select.querySelector(".selectGenre").textContent = titel.gsx$genre.$t;
    select.querySelector(".selectType").textContent = titel.gsx$type.$t;
    select.querySelector(".selectYear").textContent = titel.gsx$år.$t;
    select.querySelector(".selectInfo").textContent = titel.gsx$info.$t;
    select.querySelector(".selectImg").src = `imgs/${titel.gsx$billede.$t}.jpg`;
    select.querySelector(".selectSpotify").src = titel.gsx$play.$t;

}









//Eventlistener for tilbageknap
document.querySelector("#tilbage").addEventListener("click", () => history.back());
