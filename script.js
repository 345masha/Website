
fetch("directly.json")
    .then(response => response.json())
    .then(data => {
        console.log("Loaded Products:", data);
    })
    .catch(error => console.error("Error loading JSON:", error));



    document.addEventListener("DOMContentLoaded", () => {
        let cart = {};
        let totalPrice = 0;
    
        function updateCart() {
            let cartBody = document.getElementById("cart-body");
            cartBody.innerHTML = "";
            totalPrice = 0;
    
            Object.keys(cart).forEach((id) => {
                let item = cart[id];
                let row = document.createElement("tr");
    
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price * item.quantity}</td>
                `;
    
                cartBody.appendChild(row);
                totalPrice += item.price * item.quantity;
            });
    
            document.getElementById("total-price").innerText = `$${totalPrice}`;
        }
    
        window.addToCart = function (id, category) {
            let items = {
                processors: [
                    { id: 1, name: "Intel i5 12400", price: 250 },
                    { id: 2, name: "AMD Ryzen 5 5600X", price: 280 },
                    { id: 3, name: "Intel i7 13700K", price: 400 },
                    { id: 4, name: "AMD Ryzen 7 7700X", price: 450 },
                    { id: 5, name: "Intel i9 13900K", price: 600 },
                    { id: 6, name: "AMD Ryzen 9 7950X", price: 700 }
                ],
                graphicCards: [
                    { id: 7, name: "NVIDIA RTX 3060", price: 400 },
                    { id: 8, name: "NVIDIA RTX 3070", price: 600 },
                    { id: 9, name: "AMD RX 6700 XT", price: 500 },
                    { id: 10, name: "NVIDIA RTX 3080", price: 800 },
                    { id: 11, name: "AMD RX 6800 XT", price: 700 },
                    { id: 12, name: "NVIDIA RTX 3090", price: 1200 }
                ],
                motherboards: [
                    { id: 13, name: "ASUS B550", price: 150 },
                    { id: 14, name: "MSI B450", price: 120 },
                    { id: 15, name: "Gigabyte X570", price: 250 },
                    { id: 16, name: "ASRock B560", price: 180 },
                    { id: 17, name: "ASUS Z690", price: 300 },
                    { id: 18, name: "MSI MEG X570", price: 350 }
                ],
                memory: [
                    { id: 19, name: "Corsair 16GB DDR4", price: 80 },
                    { id: 20, name: "G.Skill 32GB DDR4", price: 150 },
                    { id: 21, name: "Kingston 16GB DDR5", price: 120 },
                    { id: 22, name: "Crucial 32GB DDR5", price: 200 }
                ],
                storage: [
                    { id: 23, name: "Samsung 1TB SSD", price: 120 },
                    { id: 24, name: "WD 2TB HDD", price: 80 },
                    { id: 25, name: "Seagate 4TB HDD", price: 150 },
                    { id: 26, name: "Kingston 500GB SSD", price: 70 },
                    { id: 27, name: "Crucial 2TB NVMe", price: 250 },
                    { id: 28, name: "Samsung 4TB NVMe", price: 450 }
                ]
            };
    
            let selectedItem = items[category].find(item => item.id === id);
            if (cart[id]) {
                cart[id].quantity += 1;
            } else {
                cart[id] = { ...selectedItem, quantity: 1 };
            }
    
            updateCart();
        };
    
        document.getElementById("save-fav").addEventListener("click", () => {
            localStorage.setItem("favCart", JSON.stringify(cart));
            alert("Cart saved as favourite!");
        });
    
        document.getElementById("load-fav").addEventListener("click", () => {
            let savedCart = JSON.parse(localStorage.getItem("favCart"));
            if (savedCart) {
                cart = savedCart;
                updateCart(); // Make sure this function is defined
            } else {
                alert("No saved favourites found.");
            }
        });
    
        document.getElementById("buy-now").addEventListener("click", () => {
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.href = "checkout.html";
        });
    });