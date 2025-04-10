// Payment Methods Management
document.addEventListener('DOMContentLoaded', function() {
    // Check if admin (in real app, this would be server-side)
    const isAdmin = window.location.hash === '#admin';
    if (isAdmin) {
        document.getElementById('adminPaymentSection').style.display = 'block';
        loadPaymentMethods();
    }

    // Load payment options for clients
    loadClientPaymentOptions();

    // Form submission for new payment method
    document.getElementById('paymentMethodForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const method = {
            name: document.getElementById('methodName').value,
            details: document.getElementById('methodDetails').value,
            logo: document.getElementById('methodLogo').value || 'images/default-payment.png'
        };
        
        addPaymentMethod(method);
        this.reset();
    });
});

function loadPaymentMethods() {
    // In a real app, this would fetch from a database
    const methods = JSON.parse(localStorage.getItem('paymentMethods')) || [
        {
            name: "PayPal",
            details: "Send to payments@tradewizard.com",
            logo: "images/paypal-logo.png"
        }
    ];
    
    const container = document.getElementById('activeMethods');
    container.innerHTML = '';
    
    methods.forEach((method, index) => {
        const methodEl = document.createElement('div');
        methodEl.className = 'payment-method';
        methodEl.innerHTML = `
            <img src="${method.logo}" alt="${method.name}">
            <div class="method-details">
                <h4>${method.name}</h4>
                <p>${method.details}</p>
            </div>
            <button class="btn btn-small delete-btn" data-index="${index}">Remove</button>
        `;
        container.appendChild(methodEl);
    });
    
    // Add delete event listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            deletePaymentMethod(parseInt(this.dataset.index));
        });
    });
}

function addPaymentMethod(method) {
    const methods = JSON.parse(localStorage.getItem('paymentMethods')) || [];
    methods.push(method);
    localStorage.setItem('paymentMethods', JSON.stringify(methods));
    loadPaymentMethods();
    loadClientPaymentOptions();
}

function deletePaymentMethod(index) {
    const methods = JSON.parse(localStorage.getItem('paymentMethods')) || [];
    methods.splice(index, 1);
    localStorage.setItem('paymentMethods', JSON.stringify(methods));
    loadPaymentMethods();
    loadClientPaymentOptions();
}

function loadClientPaymentOptions() {
    const methods = JSON.parse(localStorage.getItem('paymentMethods')) || [];
    const container = document.getElementById('paymentOptions');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (methods.length === 0) {
        container.innerHTML = '<p>No payment methods available. Please check back later.</p>';
        return;
    }
    
    methods.forEach(method => {
        const methodEl = document.createElement('div');
        methodEl.className = 'payment-method';
        methodEl.innerHTML = `
            <img src="${method.logo}" alt="${method.name}">
            <div class="method-details">
                <h3>${method.name}</h3>
                <p>${method.details}</p>
            </div>
            <button class="btn btn-primary">Deposit</button>
        `;
        container.appendChild(methodEl);
    });
}
