document.addEventListener('DOMContentLoaded', function() {
  var loginForm = document.querySelector('form#getinform');
  var welcomeMessage = document.getElementById('welcomeMessage');
  var createButton = document.getElementById('allcreate');
  var updateButton = document.getElementById('allupdate');
  var deleteButton= document.getElementById('alldelete');

  // Make the buttons not visible until the manager enters their username and password
  createButton.style.display = 'none';
  updateButton.style.display = 'none';

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the entered username and password
    var usernameInput = document.getElementById("uname");
    var passwordInput = document.getElementById("psw");
    var username = usernameInput.value;
    var password = passwordInput.value;

    if (username === 'admin' && password === '12345') {
      welcomeMessage.textContent = 'Hello, Manager';
      createButton.style.display = 'block';
      updateButton.style.display = 'block';
      deleteButton.style.display= 'block';
      loginForm.style.display = 'none';
    } else {
      // Not the manager
      alert('Invalid username or password. Please try again.');
    }
  });
});

const prodname = document.getElementById("prodname");
const price = document.getElementById("prodprice");

document.getElementById("updatebtn").addEventListener("click", async () => {
  await fetch("/api/updatePrice", {
    method: "PUT",
    body: JSON.stringify({
      name: prodname.value,
      price: price.value,
      admin: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
});
const newname = document.getElementById("newprod");
const newprice = document.getElementById("newprice");
const newimg = document.getElementById("newimg");
const category= document.getElementById("category");

document.getElementById("createbtn").addEventListener("click", async () => {
  const file = newimg.files[0];
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const filename = await res.json();

  await fetch("/api/createProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newname.value,
      price: newprice.value,
      image: `/img/${filename.fileName}`,
    }),
  });
  newname.value = "";
  newprice.value = "";
  newimg.value = "";
});

document.getElementById("deleteBtn").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/deleteProduct", {
      method: "DELETE",
      body: JSON.stringify({
        name: delname.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    // Product deleted successfully
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error.message);
  }
  delname.value="";
 
});

fetch("/api/getProducts")
  .then(response => response.json())
  .then(products => {
    generateProductElements(products);
  })
  .catch(error => {
    console.error("Error fetching products:", error.message);
  });

  function generateProductElements(products) {
    const productContainer = document.getElementById("productContainer");
  
    // Clear any existing product elements
    productContainer.innerHTML = "";
  
    // Create the table structure
    const table = document.createElement("table");
    table.classList.add("product-table");
  
    // Create the table header
    const tableHeader = document.createElement("tr");
    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Product Name";
    const priceHeader = document.createElement("th");
    priceHeader.textContent = "Price";
    tableHeader.appendChild(nameHeader);
    tableHeader.appendChild(priceHeader);
    table.appendChild(tableHeader);
  
    // Iterate over the products and create table rows for each product
    products.forEach(product => {
      const tableRow = document.createElement("tr");
  
      const nameCell = document.createElement("td");
      nameCell.textContent = product.name;
  
      const priceCell = document.createElement("td");
      priceCell.textContent = "$" + product.price;
  
      tableRow.appendChild(nameCell);
      tableRow.appendChild(priceCell);
  
      table.appendChild(tableRow);
    });
  
    productContainer.appendChild(table);
  }
  

