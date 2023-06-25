const storage = JSON.parse(localStorage.getItem("user"));
if (!storage) {
  location.href = "/";
}
console.log(storage.transaction);

const orderlist = document.getElementById("orderlist");
storage.transaction.map((transaction)=>{
for (const key of Object.keys(transaction[0]))
{
  const li = document.createElement("li");
  li.innerHTML = `${key} ($${transaction[0][key].price})`;
  orderlist.appendChild(li);
}

})
/*
// Clear any existing order elements
orderlist.innerHTML = "";

let totalprice = 0;
let count = 0;

for (const productName in storage.transaction) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between lh-sm";

  const div = document.createElement("div");

  const h6 = document.createElement("h6");
  h6.className = "my-0";
  h6.innerHTML = productName;

  const span = document.createElement("span");
  span.className = "text-body-secondary";
  span.innerHTML = "$" + storage.transaction[productName].price;

  li.appendChild(div);
  div.appendChild(h6);
  li.appendChild(span);

  orderlist.appendChild(li);

  totalprice += parseFloat(storage.transaction[productName].price);
  count++;
}

const li = document.createElement("li");
li.className = "list-group-item d-flex justify-content-between";

const span = document.createElement("span");
span.innerHTML = "Total: $" + totalprice.toFixed(2);

const strong = document.createElement("strong");

li.appendChild(span);
li.appendChild(strong);
orderlist.appendChild(li);

document.getElementById("numofprod").innerHTML = count;*/
