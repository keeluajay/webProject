const apiUrl = 'https://fakestoreapi.com/products';
let products = [];
let currentPage = 1;
const productsPerPage = 5;

// Fetch and display products
async function fetchProducts() {
  const response = await fetch(apiUrl);
  products = await response.json();
  displayProducts();
}

function displayProducts() {
  const productContainer = document.getElementById('product-list');
  productContainer.innerHTML = '';
  
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const currentProducts = products.slice(start, end);

  currentProducts.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
      <p>Quantity: ${product.rating.count}</p>
      <button onclick="editProduct(${product.id})">Edit</button>
      <button onclick="deleteProduct(${product.id})">Delete</button>
    `;
    productContainer.appendChild(productItem);
  });

  document.getElementById('page-number').innerText = currentPage;
}

function nextPage() {
  if (currentPage * productsPerPage < products.length) {
    currentPage++;
    displayProducts();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
}

function handleSearch() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  products = products.filter(product =>
    product.title.toLowerCase().includes(searchInput)
  );
  displayProducts();
}

function sortProducts() {
  const sortOption = document.getElementById('sort-select').value;
  products.sort((a, b) => {
    if (sortOption === 'price') {
      return a.price - b.price;
    } else if (sortOption === 'category') {
      return a.category.localeCompare(b.category);
    } else {
      return a.title.localeCompare(b.title);
    }
  });
  displayProducts();
}

function toggleProductForm() {
  const form = document.getElementById('product-form');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Placeholder functions for editing and deleting
function editProduct(id) {
  alert(`Editing product with ID: ${id}`);
}

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    alert(`Deleting product with ID: ${id}`);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  alert('Form submitted!');
  toggleProductForm();
}

fetchProducts();
