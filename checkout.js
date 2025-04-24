
document.addEventListener("DOMContentLoaded", () => {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    let total = 0;
    
    // Display order summary
    const orderSummary = document.getElementById('order-summary');
    orderSummary.innerHTML = '';
    
    Object.keys(cart).forEach(id => {
      const item = cart[id];
      const row = document.createElement('tr');
      const itemTotal = item.price * item.quantity;
      
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${itemTotal.toFixed(2)}</td>
      `;
      
      orderSummary.appendChild(row);
      total += itemTotal;
    });
    
    document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;
    
    // Handle form submission
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        paymentMethod: document.getElementById('payment-method').value,
        order: cart,
        total: total
      };
      
      // In a real application, you would send this data to your server
      console.log('Order submitted:', formData);
      
      // For demo purposes, we'll just show a confirmation
      alert(`Order confirmed! Total: $${total.toFixed(2)}\nThank you for your purchase!`);
      
      // Clear cart and redirect to home
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
    });
  });