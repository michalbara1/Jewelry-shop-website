document.addEventListener('DOMContentLoaded', function() {
  var loginForm = document.querySelector('form#getinform');
  var welcomeMessage = document.getElementById('welcomeMessage');
  var createButton = document.getElementById('allcreate');
  var updateButton = document.getElementById('allupdate');

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