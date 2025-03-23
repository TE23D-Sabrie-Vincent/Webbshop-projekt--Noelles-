
let totaltPris = parseFloat(localStorage.getItem("totaltPris")) || 0;
let kundvagnsProdukter = JSON.parse(localStorage.getItem("kundvagn")) || {};

// Funktion för att uppdatera kundvagnen i DOM
function uppdateraKundvagn() {
    let kundvagnLista = document.querySelector("#kundvagn-produkter");
    let totalElement = document.querySelector("#totalt-pris");
    kundvagnLista.innerHTML = ""; // Rensa innehållet

    Object.entries(kundvagnsProdukter).forEach(([namn, produkt]) => {
        let produktElement = document.createElement("div");
        produktElement.classList.add("kundvagns-produkt");
        produktElement.textContent = `${namn} - ${produkt.pris}kr (${produkt.antal}x)`;
        kundvagnLista.appendChild(produktElement);
    });

    totalElement.textContent = `Totalt: ${totaltPris.toFixed(2)} kr`;
    localStorage.setItem("kundvagn", JSON.stringify(kundvagnsProdukter));
    localStorage.setItem("totaltPris", totaltPris);
}

// Funktion för att lägga till produkter
function laggTillIKundvagn(namn, pris) {
    let numerisktPris = parseFloat(pris.replace("kr", "").trim()) || 0; // Säkerställ att det är ett tal
    if (numerisktPris === 0) return; // Om priset är ogiltigt, gör ingenting

    kundvagnsProdukter[namn] = kundvagnsProdukter[namn] || { antal: 0, pris: numerisktPris };
    kundvagnsProdukter[namn].antal++;
    totaltPris += numerisktPris;
    uppdateraKundvagn();
}

// Eventlyssnare för alla knappar
document.querySelectorAll(".Produkt-varukorg").forEach(knapp => {
    knapp.addEventListener("click", () => {
        laggTillIKundvagn(knapp.dataset.namn, knapp.dataset.pris);
    });
});

// Ladda sparad kundvagn vid sidstart
window.addEventListener("load", uppdateraKundvagn);

function tömKundvagn() {
    kundvagnsProdukter = {};  // Återställ objektet
    totaltPris = 0;  // Återställ totalbeloppet
    localStorage.removeItem("kundvagn"); // Ta bort sparad data
    localStorage.removeItem("totaltPris");
    uppdateraKundvagn(); // Uppdatera UI
}

document.getElementById("töm-kundvagn").addEventListener("click", tömKundvagn);
