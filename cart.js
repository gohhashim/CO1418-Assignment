const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.getElementById("cartList");
const totalSpan = document.getElementById("cartTotal");
const discountInput = document.getElementById("discountInput");
const discountBtn = document.getElementById("applyDiscountBtn");
const discountMessage = document.getElementById("discountMessage");

function displayCart() {
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("cart-card");

        card.innerHTML = `
            <h3>${item[0]}</h3>
            <p>Color: ${item[1]}</p>
            <p>Price: £${item[2].replace("£", "")}</p>
            <img src="${item[4]}" width="120">
            <button class="removeBtn">Remove</button>
        `;

        // εδω ειναι για remove button function
        card.querySelector(".removeBtn").onclick = () => {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
            updateTotal();
        };

        cartList.appendChild(card);
    });
}
//ειναι για να κανο υπολογισμο του ποσο το πκιο κατω function
function updateTotal() {
    let total = 0;

    cart.forEach(item => {
        const price = parseFloat(item[2].replace("£", ""));// parse float Το πήρα από αυτό το website για να μπορώ να κάνω τον υπολογισμό του συνολικού ποσού έμαθα λίγο από αυτό εδώ websise:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
        total += price;
    });

    totalSpan.textContent = total.toFixed(2);
    return total;
}

discountBtn.onclick = () => {//Για αυτό το κομμάτι , ώστε να μπορώ να βάλω κωδικό discount, έμαθα λίγο από αυτό εδώ websise:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    let total = updateTotal();
    let code = discountInput.value.trim();

    if (code === "Uclan25") {
        let discounted = total * 0.75;
        totalSpan.textContent = discounted.toFixed(2);
        discountMessage.textContent = "25% discount applied!";//
        discountMessage.style.color = "green"; // Αυτο ειναι για να γινει με πρασινο το discount
    } else {
        discountMessage.textContent = "No discount";
        discountMessage.style.color = "red";//Αυτο ειναι για να γινει με κοκκινο το οτι δεν εχει discount
    }
};
document.getElementById("clearCartBtn").onclick = function () { // Το clear cart είναι button για να μπορώ να φύγω όλα τα items από το cart.:https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    localStorage.removeItem("cart");
    alert("Cart cleared!");
    location.reload();
};


displayCart();
updateTotal();
