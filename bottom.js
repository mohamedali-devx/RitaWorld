(() => {
    const bottom = document.querySelector(".bottom");
    const clothesBtn = document.getElementById("clothes");
    const outfitBtn = document.getElementById("outfit");

    clothesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        bottom.classList.remove("bottom-static");
    });

    outfitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        bottom.classList.add("bottom-static");
    });
})();