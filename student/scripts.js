// Sample data of products
const products = [
    { name: "Hammer", category: "tools", description: "Durable steel hammer.", image: "images/hammer.png", recommendations: ["Screwdriver", "Nails", "Screws"] },
    { name: "Screwdriver", category: "tools", description: "Precision screwdriver set.", image: "images/screwdriver.png", recommendations: ["Hammer", "Screws", "Nails"] },
    { name: "Cement", category: "materials", description: "High-quality cement mix.", image: "images/cement.png", recommendations: ["Bricks", "Sand", "Nails"] },
    { name: "Bricks", category: "materials", description: "Red clay bricks.", image: "images/bricks.png", recommendations: ["Cement", "Sand", "Nails"] },
    { name: "Nails", category: "hardware", description: "Steel nails.", image: "images/nails.png", recommendations: ["Hammer", "Screwdriver", "Cement"] },
    { name: "Screws", category: "hardware", description: "Assorted screws.", image: "images/screws.png", recommendations: ["Screwdriver", "Hammer", "Cement"] },
    { name: "Sand", category: "materials", description: "Fine building sand.", image: "images/sand.png", recommendations: ["Cement", "Bricks", "Nails"] }
];

// Function to update product dropdown based on selected product group
function updateProductDropdown() {
    const group = document.getElementById('product-group').value;
    const dropdown = document.getElementById('product-dropdown');
    dropdown.innerHTML = '<option value="" disabled selected>Select Product</option>';

    const filteredProducts = products.filter(product => product.category === group);
    filteredProducts.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        dropdown.appendChild(option);
    });
}

// Function to hide the main form
function hideMainForm() {
    const mainFormSection = document.querySelector('main');
    mainFormSection.style.display = 'none';
}

// Function to display product details and recommendations
function showProductForm() {
    const selectedProduct = document.getElementById('product-dropdown').value;
    displayProductDetails(selectedProduct);
    hideMainForm(); // Hide main form when showing product form

    const productFormSection = document.getElementById('product-form-section');
    productFormSection.style.display = 'block'; // Show the product form section
}

// Display product details and recommendations
function displayProductDetails(productName) {
    const homeSection = document.getElementById('home-section');
    const productFormSection = document.getElementById('product-form-section');
    const productDetailsContainer = document.getElementById('product-details');
    const recommendationsContainer = document.getElementById('recommendations');

    homeSection.style.display = 'none'; // Hide home page form
    productFormSection.style.display = 'block'; // Show the product form section

    productDetailsContainer.innerHTML = '';
    recommendationsContainer.innerHTML = '';

    const product = products.find(p => p.name === productName);
    if (product) {
        // Display product details
        const productDetails = document.createElement('div');
        productDetails.className = 'product-details';
        productDetails.innerHTML = `<h3>${product.name}</h3><img src="${product.image}" alt="${product.name}"><p>${product.description}</p>`;
        productDetailsContainer.appendChild(productDetails);

        // Display recommendations
        const recommendedProducts = product.recommendations; // Get all recommendations
        recommendedProducts.forEach(recommendedName => {
            const recommendedProduct = products.find(p => p.name === recommendedName);
            if (recommendedProduct) {
                const recommendationElement = document.createElement('div');
                recommendationElement.className = 'product';
                recommendationElement.onclick = () => displayProductDetails(recommendedProduct.name);
                recommendationElement.innerHTML = `<h3>${recommendedProduct.name}</h3><img src="${recommendedProduct.image}" alt="${recommendedProduct.name}"><p>${recommendedProduct.description}</p>`;
                recommendationsContainer.appendChild(recommendationElement);
            }
        });
    }
}

// Function to hide the home page form
function hideHomePageForm() {
    const homeSection = document.getElementById('home-section');
    homeSection.style.display = 'none';
}

// Function to navigate back to the home/welcome section
function goHome() {
    const homeSection = document.getElementById('home-section');
    const productFormSection = document.getElementById('product-form-section');

    homeSection.style.display = 'block'; // Show the home page form
    productFormSection.style.display = 'none'; // Hide the product form section

    document.querySelector('main').style.display = 'block'; // Show the main form

    document.getElementById('product-group').value = ''; // Reset product group dropdown
    document.getElementById('product-dropdown').innerHTML = '<option value="" disabled selected>Select Product</option>'; // Reset product dropdown
    document.getElementById('search-input').value = ''; // Clear search input
}
// Function to search products based on input
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const dropdown = document.getElementById('product-dropdown');
    dropdown.innerHTML = '<option value="" disabled selected>Select Product</option>';
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    filteredProducts.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        dropdown.appendChild(option);
    });
    if (filteredProducts.length > 0) {
        dropdown.disabled = false;
    } else {
        dropdown.disabled = true;
    }
}
// Initial setup when the page loads
window.onload = function () {
    updateProductDropdown(); // Populate product dropdown initially
};
// update new for this file