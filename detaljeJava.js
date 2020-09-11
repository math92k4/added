const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let titler;

const link = "https://spreadsheets.google.com/feeds/list/1Qhbtjd_VhlT8nuxoCCdbNCtfS7jHS7BAOy__kgOHWJM/od6/public/values?alt=json";
const select = document.querySelector("#select");




document.addEventListener("DOMContentLoaded", hentData);

async function hentData() {
    const respons = await fetch(link);
    titler = await respons.json();
    vis();
}

function vis() {
    titler.feed.entry.forEach(titel => {
        if (id == titel.gsx$id.$t) {
            visDetaljer(titel)
        }
    })
}



function visDetaljer(titel) {
    select.querySelector(".selectTitel").textContent = `${titel.gsx$titel.$t} - ${titel.gsx$kunstner.$t}`;
    select.querySelector(".selectInfo").textContent = titel.gsx$info.$t;
    select.querySelector(".selectImg").src = `imgs/${titel.gsx$billede.$t}.jpg`;
    select.querySelector(".selectSpotify").src = titel.gsx$play.$t;

}
document.querySelector("#tilbage").addEventListener("click", () => history.back());
