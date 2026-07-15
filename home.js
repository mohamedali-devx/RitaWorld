let products = [];

// Outfit
const ras = document.querySelector(".ras");
const chest = document.querySelector(".chest");
const legs = document.querySelector(".legs");
const feet = document.querySelector(".feet");

// when user clicks on one of the following ras chest legs feet,
// the div with the class "image" should be cleared and the text should be
// reset to "head", "chest", "legs", or "feet" respectively.
function resetSlot(slotElement, label) {
    const targetNode = slotElement.childNodes[1] || slotElement;
    targetNode.innerHTML = `<div style="text-align:center;">${label}</div>`;
}

ras.addEventListener("click", () => resetSlot(ras, "head"));
chest.addEventListener("click", () => resetSlot(chest, "chest"));
legs.addEventListener("click", () => resetSlot(legs, "legs"));
feet.addEventListener("click", () => resetSlot(feet, "feet"));

async function loadProducts() {

    const response = await fetch("data.json");
    products = await response.json();

    render(products);
}

function render(list) {

    const cards = document.getElementById("cards");
    cards.innerHTML = "";

    list.forEach(product => {

        cards.innerHTML += `
            <div class="card" data-id="${product.id}">

                <div class="image">
                    <img src="${product.image}" width="200">
                </div>

                <div class="text">
                    <p class="name">${product.name}</p>
                    <p class="des">${product.description}</p>
                </div>

                <div class="type">
                    <p class="text">${product.type}</p>
                </div>

            </div>
        `;

    });


    addCardEvents();
}

// Btns
const sortBtn = document.getElementById("sort");
const randomBtn = document.getElementById("random");
const clothesBtn = document.getElementById("clothes");
const outfitBtn = document.getElementById("outfit");
const settingsBtns = document.getElementById("settingsBtns");
const outfitBtns = document.getElementById("outfitBtns");

const randomOutfitBtn = document.getElementById("randomOutfit");
const clearOutfitBtn = document.getElementById("clearOutfit");
const sortingBtn = document.getElementById("sorting");

// divs
const cards = document.getElementById("cards");
const currentOutfit = document.getElementById("currentOutfit");

const contClothes = document.getElementById("contClothes");
const contOutfits = document.getElementById("contOutfits");

// elements
const allCards = document.querySelectorAll(".card");



function addCardEvents() {

    const allCards = document.querySelectorAll(".card");

    allCards.forEach(card => {

        card.addEventListener("click", () => {

            const id = Number(card.dataset.id);

            const product = products.find(p => p.id === id);

            console.log(product.id);
            console.log(product.type);

            // Add to outfit
            if (product.place === "ras") {
                ras.childNodes[1].innerHTML = `<div style="text-align: center; margin-bottom: -15px;">head</div><div class="image" style="width: 240px; height: 320px;"><img src="${product.image}" width="100"></div>`;
            }
            if (product.place === "chest") {
                chest.childNodes[1].innerHTML = `<div style="text-align: center; margin-bottom: -15px;">chest</div><div class="image" style="width: 240px; height: 320px;"><img src="${product.image}" width="100"></div>`;
            }
            if (product.place === "legs") {
                legs.childNodes[1].innerHTML = `<div style="text-align: center; margin-bottom: -15px;">legs</div><div class="image" style="width: 240px; height: 320px;"><img src="${product.image}" width="100"></div>`;
            }
            if (product.place === "feet") {
                feet.childNodes[1].innerHTML = `<div style="text-align: center; margin-bottom: -15px;">feet</div><div class="image" style="width: 240px; height: 320px;"><img src="${product.image}" width="100"></div>`;
            }

        });

    });

}


function showSorted(e) {
    e?.preventDefault();

    sortBtn.classList.add("active");
    randomBtn.classList.remove("active");

    render([...products].sort((a, b) => a.type.localeCompare(b.type)));
};

sortBtn.onclick = showSorted;

function showOriginal(e) {
    e?.preventDefault();

    randomBtn.classList.add("active");
    sortBtn.classList.remove("active");

    render(products);
}

randomBtn.onclick = showOriginal;

function showClothes(e) {
    e?.preventDefault();

    clothesBtn.classList.add("active");
    outfitBtn.classList.remove("active");
    outfitBtns.style.display = "none";
    settingsBtns.style.display = "flex";

    currentOutfit.style.display = "none";



    cards.style.cssText = `
        height: auto;
    `;
    contClothes.style.cssText = `
    flex: 1;
    `;

    contOutfits.style.cssText = `
    flex: 0;
    `;


    const allCards = document.querySelectorAll(".card");

    allCards.forEach(card => {

        for (let i = 1; i < card.children.length; i++) {
            card.children[i].style.display = "block";
        }

        card.style.cssText = `
            width: 240px;
            height: 320px;
        `;
        card.firstElementChild.style.cssText = `width: auto`;
    });



    // cards.style.display = "flex";
};

clothesBtn.onclick = showClothes;

function showOutfit(e) {
    e?.preventDefault();

    outfitBtn.classList.add("active");
    clothesBtn.classList.remove("active");

    settingsBtns.style.display = "none";
    outfitBtns.style.display = "flex";

    currentOutfit.style.display = "flex";

    // Styling
    cards.style.cssText = `
                height: 70vh;
    overflow-y: auto;
    scrollbar-width: thin;
    /* Firefox */
    scrollbar-color: #c5c5c5 transparent;
    `;


    const allCards = document.querySelectorAll(".card");

    allCards.forEach(card => {

        for (let i = 1; i < card.children.length; i++) {
            card.children[i].style.display = "none";
        }

        card.style.cssText = `
            width: 240px;
            height: 320px;
        `;
        card.firstElementChild.style.cssText = `width: auto`;
    });

    contClothes.style.cssText = `
    flex: 1;
    `;

    contOutfits.style.cssText = `
    flex: 2;
    `;


    // cards.style.display = "none";
};

outfitBtn.addEventListener("click", showOutfit);



function randomOutfit(e) {
    e?.preventDefault();

    sortingBtn.classList.remove("active");
    randomOutfitBtn.classList.add("active");
    clearOutfitBtn.classList.remove("active");

    const rasProducts = products.filter(p => p.place === "ras");
    const chestProducts = products.filter(p => p.place === "chest");
    const legsProducts = products.filter(p => p.place === "legs");
    const feetProducts = products.filter(p => p.place === "feet");

    const randomRasProduct =
        rasProducts.length > 0
            ? rasProducts[Math.floor(Math.random() * rasProducts.length)]
            : null;

    const randomChestProduct =
        chestProducts.length > 0
            ? chestProducts[Math.floor(Math.random() * chestProducts.length)]
            : null;

    const randomLegsProduct =
        legsProducts.length > 0
            ? legsProducts[Math.floor(Math.random() * legsProducts.length)]
            : null;

    const randomFeetProduct =
        feetProducts.length > 0
            ? feetProducts[Math.floor(Math.random() * feetProducts.length)]
            : null;

    if (randomRasProduct) {
        ras.childNodes[1].innerHTML = `
            <div style="text-align:center;margin-bottom:-15px;">Head</div>
            <div class="image" style="width:240px;height:320px;">
                <img src="${randomRasProduct.image}" width="240">
            </div>
        `;
    }

    if (randomChestProduct) {
        chest.childNodes[1].innerHTML = `
            <div style="text-align:center;margin-bottom:-15px;">Chest</div>
            <div class="image" style="width:240px;height:320px;">
                <img src="${randomChestProduct.image}" width="240">
            </div>
        `;
    }

    if (randomLegsProduct) {
        legs.childNodes[1].innerHTML = `
            <div style="text-align:center;margin-bottom:-15px;">Legs</div>
            <div class="image" style="width:240px;height:320px;">
                <img src="${randomLegsProduct.image}" width="240">
            </div>
        `;
    }

    if (randomFeetProduct) {
        feet.childNodes[1].innerHTML = `
            <div style="text-align:center;margin-bottom:-15px;">Feet</div>
            <div class="image" style="width:240px;height:320px;">
                <img src="${randomFeetProduct.image}" width="240">
            </div>
        `;
    }
}

function clearOutfit(e) {
    e?.preventDefault();

    sortingBtn.classList.remove("active");
    clearOutfitBtn.classList.add("active");
    randomOutfitBtn.classList.remove("active");

    ras.childNodes[1].innerHTML = `<div style="text-align:center;">Head</div>`;
    chest.childNodes[1].innerHTML = `<div style="text-align:center;">Chest</div>`;
    legs.childNodes[1].innerHTML = `<div style="text-align:center;">Legs</div>`;
    feet.childNodes[1].innerHTML = `<div style="text-align:center;">Feet</div>`;
}

function showSorted(e) {
    e?.preventDefault();

    sortingBtn.classList.add("active");
    clearOutfitBtn.classList.remove("active");
    randomOutfitBtn.classList.remove("active");

    render([...products].sort((a, b) => a.type.localeCompare(b.type)));
    showOutfit();
}

randomOutfitBtn.addEventListener("click", randomOutfit);
clearOutfitBtn.addEventListener("click", clearOutfit);
sortingBtn.addEventListener("click", showSorted);



// Calling Functions

loadProducts();
showClothes();