const tshirts = [
    ["Uclan T-Shirt", "Red", "£7.99", "good-stock", "resources/images/tshirts/tshirt1.jpg", "Perfect for those graduating this year.Get a bargain whilst we have the stock. Cotton authentic and practically are combined in this T-shirt for students that goes with everything to create a casual looks"],
    ["Uclan T-Shirt", "Green", "£7.99", "last-few", "resources/images/tshirts/tshirt2.jpg", "Limited stock, grab yours!.Before they make their way into eBay. Cotton authentic and practically are combined in this T-shirt for students that goes with everything to create a casual looks"],
    ["Uclan T-Shirt", "Blue", "£7.99", "out-of-stock", "resources/images/tshirts/tshirt3.jpg", "Currently unavailable.Sadly this is a legendary item .Keep close look for future stock!. Cotton authentic and practically are combined in this T-shirt for students that goes with everything to create a casual looks"],
    ["Uclan T-Shirt", "Cyan", "£7.99", "last-few", "resources/images/tshirts/tshirt4.jpg", " Limited stock, grab yours!.Before they make their way into eBay. Cotton authentic and practically are combined in this T-shirt for students that goes with everything to create a casual looks"],
    ["Uclan T-Shirt", "Magenta", "£7.99", "good-stock", "resources/images/tshirts/tshirt5.jpg", "Perfect for those graduating this year.Get a bargain whilst we have the stock. Cotton authentic and practically are combined in this T-shirt for students that goes with everything to create a casual looks"],
    ["Uclan T-Shirt", "Yellow", "£7.99", "out-of-stock", "resources/images/tshirts/tshirt6.jpg", "Currently unavailable.Sadly this is a legendary item .Keep close look for future stock! Cotton authentic and practically are combined in this T-shirt for students that goes with everything to create a casual looks"],
    ["Uclan T-Shirt", "Black", "£7.99", "last-few", "resources/images/tshirts/tshirt7.jpg", "Limited stock, grab yours!.Before they make their way into eBay. Cotton authentic and practically are combined in this T-shirt for students that goes with everything to create a casual looks"],
    ["Uclan T-Shirt", "Grey", "£7.99", "good-stock", "resources/images/tshirts/tshirt8.jpg", "Perfect for those graduating this year.Get a bargain whilst we have the stock. Cotton authentic and practically are combined in this T-shirt for students that goes with everything to create a casual looks"],
    ["Uclan T-Shirt", "Burgundy", "£7.99", "good-stock", "resources/images/tshirts/tshirt9.jpg", "Perfect for those graduating this year.Get a bargain whilst we have the stock. Cotton authentic and practically are combined in this T-shirt for students that goes with everything to create a casual looks"],

];

const list = document.getElementById("productList");

tshirts.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
        <h3>${item[0]}</h3>
        <p>Color: ${item[1]}</p>
        <p>Price: ${item[2]}</p>
        <img src="${item[4]}" width="150">
        <p>Stock: ${item[3]}</p>
        
        ${item[3] === "out-of-stock"
        ? `<button class="addBtn" disabled style="background:gray;">Unavailable</button>`
        : `<button class="addBtn">Add to Cart</button>`}

        <button class="infoBtn">More Info</button>
    `;

    card.querySelector(".infoBtn").onclick = function () {
        sessionStorage.setItem("selectedProduct", JSON.stringify(item));// evala sessionStorage για να δουλεψη το more info button
        window.location.href = "item.html";
    };

    // εδω ειναι για το add to cart button να δουλεψη για να οταν το προιον ειναι διατηεσιμο που και αυτο ειναι JSON και ειναι το ιδιο website με το προιγουμενο :https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
    if (item[3] !== "out-of-stock") {
        card.querySelector(".addBtn").onclick = function () {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Item added to cart!");
        };
    }

    list.appendChild(card);
    //filterStock ρησιμοποιείται για να φιλτράρει τα προϊόντα ανάλογα με την κατάσταση τους. Επισις ελέγχει το κείμενο κάθε κάρτας προϊόντος και εμφανίζει ή κρύβει τα προϊόντα αλλάζοντας την ιδιότητα display.
    // χρισιμοποιισα απο το παρακατο website:https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
});
function filterStock(status) {
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        if (status === "all" || card.textContent.includes(status)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
