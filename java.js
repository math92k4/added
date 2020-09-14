//Overordnede variabler defineres
//Variablen filter er fra start sat til "alle", så alle kategorier indlæses ved index load
let filter = "alle";
let titler;
const link = "https://spreadsheets.google.com/feeds/list/1Qhbtjd_VhlT8nuxoCCdbNCtfS7jHS7BAOy__kgOHWJM/od6/public/values?alt=json";







//Eventlistener venter på at DOM er loaded før den starter selve scriptet via funktionen "hentData"
document.addEventListener("DOMContentLoaded", hentData);









//Arrayet hentes ind
async function hentData() {
    const respons = await fetch(link);
    titler = await respons.json();
    listenersToButtons();
    vis();
}









function vis() {

    // Her defineres variabler for section og template-tag
    const container = document.querySelector("#container");
    const temp = document.querySelector("template");

    // Her nulstilles al data i vores container/section. Dette er nødvendigt så dataet ikke bliver indlæst flere gange - f.eks ved klik på en filterknap
    container.innerHTML = "";

    //For hvert objekt i vores array/sheet, klones templated i html'en. Det øsnkede data hentes ind og indsættes i de forskellige classes.
    titler.feed.entry.forEach(titel => {
        if (filter == "alle" || filter == titel.gsx$genre.$t) {
            let klon = temp.cloneNode(true).content;
            klon.querySelector(".titel").textContent = `${titel.gsx$titel.$t} - ${titel.gsx$kunstner.$t}`;
            klon.querySelector(".info").textContent = `${titel.gsx$genre.$t}, ${titel.gsx$år.$t}`;
            klon.querySelector(".billede").src = `imgs/${titel.gsx$billede.$t}.jpg`;


            //Eventlisteners bliver tilføjet hver article, så man via klik bliver henvist til vores singleview-site, via visDetaljer-funktionen
            klon.querySelector("article").addEventListener("click", () => visDetaljer(titel));

            //for hvert objekt bliver templated tilføjet vores container som nyt child.
            container.appendChild(klon);
        }
    })
    //Eventlistener på burgermenu-knap for at starte toggleMenu-funktionen
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}









// burgermenu toggle og hide funktion
function toggleMenu() {
    //Her bliver classen "hidden" slået til og fra (nav'en har "hidden" fra start i html)
    document.querySelector("nav").classList.toggle("hidden");

    //Hvis nav'ens liste af klasser indeholder .hidden, skal burgermenu vises - ellers X
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

    //hele nav får classen "hidden" så den forsvinder
    document.querySelector("nav").classList.add("hidden");
    //menuknappen går fra X (luk) til ☰ (burgermenu), og herved bliver menuen nulstillet ved klip på en kategori-button
    document.querySelector("#menuknap").textContent = "☰";
}









// VisDetaljer sender det valgte objekts id op i url'en. Dette id bliver hentet ned via detaljeJava.js (check variablen urlParams i detaljeJava.js)
function visDetaljer(titel) {
    location.href = `detalje.html?id=${titel.gsx$id.$t}`
}









//Eventlisteners puttes på hver knap via "forEach". Disse eventlisteners vil starte funktionen filterBTNs som filtrere sidens indhold.
function listenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    })
}









//filterBTNs filtrerer det viste indhold via klik på nav-buttons
function filterBTNs() {
    //Variablen filter bliver ligmed det dataset som den pågældende button har defineret i html'en
    filter = this.dataset.type;
    document.querySelector("#kategoriOverskrift").textContent = this.textContent;

    // classen "valgt" bliver fjernet fra alle buttons. "Valgt" er en class med css-styling som gør det tydeligt hvilken kategori der er valgt - fra start er "valgt" tildelt kategorien "alle" via html.
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })

    //Den valgte button får nu classen "valgt".
    this.classList.add("valgt");

    //Nu er filter = datasettet fra den valgte button, og DOMen indlæser på ny dataet fra json via funktionen hentData
    hentData();
}
