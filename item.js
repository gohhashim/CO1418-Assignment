const item = JSON.parse(sessionStorage.getItem("selectedProduct"));
const box = document.getElementById("itemBox");

box.innerHTML = `
    <h2>${item[0]}</h2>
    <p>Color: ${item[1]}</p>
    <p>Price: ${item[2]}</p>
    <img src="${item[4]}" width="180">
    <p>${item[5]}</p>

    <button class="addBtn" id="add">Add to Cart</button>
`;

const addBtn = document.getElementById("add");

if (item[3] === "out-of-stock") {
    addBtn.disabled = true;
    addBtn.innerText = "Unavailable";// για να μην μπορεις να επιλεξεις ενα ιτεμ που δεν ειναι available
    addBtn.style.background = "gray";
}

//Πιο κάτω χρησιμοποιώ JSON για το add to cart και έμαθα πώς γίνεται η πρόσθεση από αυτό.https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
addBtn.onclick = function () {
    if (item[3] === "out-of-stock") {
        alert("This item is unavailable.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Item added to cart!");
};
