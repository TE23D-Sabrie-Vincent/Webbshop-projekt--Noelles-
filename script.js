// document.addEventListener('DOMContentLoaded'), ()=> {
//     const knappar = document.querySelectorAll('.lägg_till');
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];


// function spara_Vagn(){
//     localStorage.setItem('cart', JSON.stringify(cart));
// }

// function Lägg_till_korg(){
//     console.log("Du har lagt till en produkt till varukorgen")
// }

let totaltPris = 0; // Håller koll på totala priset
let kundvagnsProdukter = {}; // Lagrar produkter och antal

function laggTillIKundvagn(namn, pris) {
    let kundvagn = document.querySelector(".Kundvagn-låda");
    let totalElement = document.querySelector("#totalt-pris");
    let numerisktPris = parseFloat(pris.replace("kr", "").trim());

    // Uppdatera antal om produkten redan finns
    if (kundvagnsProdukter[namn]) {
        kundvagnsProdukter[namn].antal++;
    } else {
        let produktElement = document.createElement("div");
        produktElement.classList.add("kundvagns-produkt");
        produktElement.style.textAlign = "center";
        kundvagn.insertBefore(produktElement, totalElement);
        kundvagnsProdukter[namn] = { antal: 1, element: produktElement };
    }

    // Uppdatera texten för produkten
    kundvagnsProdukter[namn].element.textContent = `${namn} - ${pris} (${kundvagnsProdukter[namn].antal}x)`;

    // Uppdatera totala priset
    totaltPris += numerisktPris;
    if (!totalElement) {
        totalElement = document.createElement("p");
        totalElement.id = "totalt-pris";
        totalElement.style.textAlign = "center";
        kundvagn.appendChild(totalElement);
    }
    totalElement.textContent = `Totalt: ${totaltPris} kr`;
}

// Lägg till eventlyssnare på alla knappar
document.querySelectorAll(".Produkt-varukorg").forEach(knapp => {
    knapp.addEventListener("click", function () {
        let produkt = this.closest(".Produkt-lådor");
        laggTillIKundvagn(
            produkt.querySelector(".Produkt-namn").textContent,
            produkt.querySelector(".Produkt-pris").textContent
        );
    });
});
// }
