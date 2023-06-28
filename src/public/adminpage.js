document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.querySelector("form#getinform");
  var welcomeMessage = document.getElementById("welcomeMessage");
  var createButton = document.getElementById("allcreate");
  var updateButton = document.getElementById("allupdate");
  var deleteButton = document.getElementById("alldelete");

  createButton.style.display = "none";
  updateButton.style.display = "none";
  deleteButton.style.display = "none";

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var usernameInput = document.getElementById("uname");
    var passwordInput = document.getElementById("psw");
    var username = usernameInput.value;
    var password = passwordInput.value;

    if (username === "admin" && password === "12345") {
      welcomeMessage.textContent = "Hello, Manager";
      createButton.style.display = "block";
      updateButton.style.display = "block";
      deleteButton.style.display = "block";
      loginForm.style.display = "none";
    } else {
      alert("Invalid username or password. Please try again.");
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

document.getElementById("createbtn").addEventListener("click", async () => {
  const newname = document.getElementById("newprod");
  const newprice = document.getElementById("newprice");
  const newimg = document.getElementById("newimg");
  const newquantity = document.getElementById("newquantity");
  const newcategory = document.getElementById("newcategory");

  // Get the category input value
  const categoryInput = newcategory.value;

  // Define the allowed categories
  const allowedCategories = ["Rings", "Necklaces", "Bracelets"];

  // Check if the category is valid
  if (!allowedCategories.includes(categoryInput)) {
    // Display an alert if the category is invalid
    alert(
      "Invalid category! Please choose one of the following options: Rings, Necklaces, Bracelets."
    );
    return; // Stop further execution
  }


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
      quantity: newquantity.value, // Use the validated quantity value
      category: categoryInput, // Use the validated category value
    }),
  });
  // Reset the form inputs
  newname.value = "";
  newprice.value = "";
  newimg.value = "";
  newquantity.value = "";
  newcategory.value = "";
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

    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error.message);
  }
  delname.value = "";
});

fetch("/api/getProducts")
  .then((response) => response.json())
  .then((products) => {
    generateProductElements(products);
    fetch("/d3")
      .then((response) => response.json())
      .then((products) => {
        generateProductChart(products);
        generateProductPieChart(products); // Create Pie Chart
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  })
  .catch((error) => {
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
  products.forEach((product) => {
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

  fetch("/d3")
    .then((response) => response.json())
    .then((products) => {
      generateProductChart(products);
      generateProductPieChart(products); // Create Pie Chart
    })
    .catch((error) => {
      console.error("Error fetching products:", error.message);
    });

  function generateProductChart(products) {
    const svg = d3
      .select("#chartContainer")
      .append("svg")
      .attr("width", 800) // Further increased width to accommodate y-axis label
      .attr("height", 600)
      .style("margin-left", 5);

    const barWidth = 40;
    const barSpacing = 10;

    const maxQuantity = d3.max(products, (d) => d.quantity);

    const xScale = d3
      .scaleBand()
      .domain(products.map((d) => d.name))
      .range([0, 550]) // Reduced x-axis range to leave space for y-axis label
      .paddingInner(0.1)
      .paddingOuter(0.1);

    const yScale = d3.scaleLinear().domain([0, maxQuantity]).range([0, 350]); // Adjusted according to new svg height

    const bars = svg
      .selectAll("rect")
      .data(products)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => 350 - yScale(d.quantity)) // Adjusted according to new svg height
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d.quantity))
      .attr("fill", "steelblue");

    const labels = svg
      .selectAll(".label")
      .data(products)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => xScale(d.name) + xScale.bandwidth() / 2)
      .attr("y", (d) => 350 - yScale(d.quantity) - 5) // Adjusted according to new svg height
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", "16px");

    const barLabels = svg
      .selectAll(".barLabel")
      .data(products)
      .enter()
      .append("text")
      .attr("class", "barLabel")
      .attr("x", (d) => xScale(d.name) + xScale.bandwidth() / 2)
      .attr("y", (d) => 350 - yScale(d.quantity) + 15) // Adding 15 to y position to put label inside the bar
      .text((d) => d.quantity)
      .attr("text-anchor", "middle")
      .attr("fill", "white") // Make text color white to be visible on the bars
      .style("font-size", "16px");

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", "translate(0, 350)") // Adjusted according to new svg height
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-75)") // Rotate the labels
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .style("font-size", "16px");

    // Y-axis
    svg.append("g").call(yAxis);

    // Y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 20) // Adjust these to place the label
      .attr("x", -175) // Adjust these to place the label
      .style("text-anchor", "inherit")
      .text("Quantity");
  }

  function generateProductPieChart(products) {
    // Clear old chart before creating a new one
    d3.select("#pieChartContainer").html("");

    const width = 800,
      height = 700,
      radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3
      .pie()
      .value((d) => d.quantity)
      .sort(null);

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const labelArc = d3
      .arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const totalQuantity = d3.sum(products, (d) => d.quantity);

    const svg = d3
      .select("#pieChartContainer")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const g = svg
      .selectAll(".arc")
      .data(pie(products))
      .enter()
      .append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", (d, i) => color(i));

    g.append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("dy", ".35em")
      .text(
        (d) =>
          `${d.data.name} (${((d.data.quantity / totalQuantity) * 100).toFixed(
            2
          )}%)`
      )
      .style("text-anchor", "middle") // Center the text
      .style("font-size", "12px"); // Change this to make your text bigger or smaller
  }
}
