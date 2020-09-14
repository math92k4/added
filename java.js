let filter = "alle";
let titler;
const link = "https://spreadsheets.google.com/feeds/list/1Qhbtjd_VhlT8nuxoCCdbNCtfS7jHS7BAOy__kgOHWJM/od6/public/values?alt=json";

document.addEventListener("DOMContentLoaded", hentData);









//I nedenstående funktion hentes vore json data fra sheetet. (Sheetet er defineret i en variabel øverst som "link")

async function hentData() {
    const respons = await fetch(link);
    titler = await respons.json();
    listenersToButtons();
    vis();
}








function vis() {

    // Her defineres variabler for section og template tag.
    const container = document.querySelector("#container");
    const temp = document.querySelector("template");

    // Her nulstilles al data i section (id'et container)
    container.innerHTML = "";

    titler.feed.entry.forEach(titel => {
        if (filter == "alle" || filter == titel.gsx$genre.$t) {
            let klon = temp.cloneNode(true).content;
            klon.querySelector(".titel").textContent = `${titel.gsx$titel.$t} - ${titel.gsx$kunstner.$t}`;
            klon.querySelector(".info").textContent = `${titel.gsx$genre.$t}, ${titel.gsx$år.$t}`;
            klon.querySelector(".billede").src = `imgs/${titel.gsx$billede.$t}.jpg`;
            klon.querySelector("article").addEventListener("click", () => visDetaljer(titel));

            container.appendChild(klon);

        }
    })

    // burgermenu toggle hidden startes her ved eventlistener
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}









// burgermenu toggle og hide funktion

function toggleMenu() {
    console.log("toggleMenu");

    document.querySelector("nav").classList.toggle("hidden");

    let erSkjult = document.querySelector("nav").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";
    } else {
        document.querySelector("#menuknap").textContent = "X";
    }





    //Eventlisteners på alle nav-kanpper så burger-menuen foldes ind efter valg af kategori (mobil-verson)

    document.querySelectorAll(".filter").forEach((btnBurger) => {
        btnBurger.addEventListener("click", genreClicked);
    })
}






//I nedenstående funktion nulstilles burgermenuen ved valg af kategori (mobil-version)

function genreClicked() {
    console.log("genreClicked");
    document.querySelector("nav").classList.add("hidden");
    document.querySelector("#menuknap").textContent = "☰";
}





// Her sendes det valgte id videre over i single-view-html'en
function visDetaljer(titel) {
    location.href = `detalje.html?id=${titel.gsx$id.$t}`
}







//Eventlisteners puttes på hver knap via "forEach"
function listenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    })

}






function filterBTNs() {
    filter = this.dataset.type;
    //    document.querySelector("#kategoriOverskrift").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    hentData();
}
