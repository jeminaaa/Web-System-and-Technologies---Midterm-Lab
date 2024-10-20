document.addEventListener("DOMContentLoaded", function() {
    let cart = [];

    // Add click event to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productTitle = this.getAttribute('data-title');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            addToCart(productTitle, productPrice);
        });
    });

    function addToCart(title, price) {
        // Check if the item is already in the cart
        const existingItem = cart.find(item => item.title === title);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ title: title, price: price, quantity: 1 });
        }

        updateCart();
    }

    function updateCart() {
        const cartItemsTable = document.querySelector('#cart-items tbody');
        const cartTotalElement = document.getElementById('cart-total');
        let total = 0;

        // Clear the table before adding new items
        cartItemsTable.innerHTML = '';

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.title}</td>
                <td>₱${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>₱${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm remove-item" data-title="${item.title}">Remove</button></td>
            `;
            cartItemsTable.appendChild(row);

            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = total.toFixed(2);

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const title = this.getAttribute('data-title');
                removeFromCart(title);
            });
        });
    }

    function removeFromCart(title) {
        cart = cart.filter(item => item.title !== title);
        updateCart();
    }
});
// This will store the cart items
let cart = [];

// Function to add item to cart
function addToCart(title, price) {
    // Check if the item is already in the cart
    const itemIndex = cart.findIndex(item => item.title === title);

    if (itemIndex > -1) {
        // If the item is already in the cart, increase its quantity
        cart[itemIndex].quantity += 1;
    } else {
        // If the item is new, add it to the cart
        cart.push({ title: title, price: price, quantity: 1 });
    }

    // Update the cart display
    displayCartItems();
}

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.querySelector("#cart-items tbody");
    const cartTotalElement = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = ""; // Clear existing items

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemRow = `
            <tr>
                <td>${item.title}</td>
                <td>₱ ${item.price}</td>
                <td>${item.quantity}</td>
                <td>₱ ${itemTotal.toFixed(2)}</td>
                <td><button class="remove-item" data-index="${index}">Remove</button></td>
            </tr>
        `;
        cartItemsContainer.innerHTML += cartItemRow;
    });

    cartTotalElement.textContent = total.toFixed(2);

    // Attach event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function() {
            const itemIndex = this.dataset.index;
            removeCartItem(itemIndex);
        });
    });
}

// Function to remove item from cart
function removeCartItem(index) {
    cart.splice(index, 1); // Remove item at given index
    displayCartItems(); // Update the cart display
}

// Attach event listener to all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
        const title = this.getAttribute("data-title");
        const price = parseFloat(this.getAttribute("data-price"));
        addToCart(title, price);
    });
});
