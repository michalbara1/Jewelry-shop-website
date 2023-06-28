const storage = JSON.parse(localStorage.getItem("user"));
if (!storage) {
    location.href = "/";
}
console.log(storage.transaction);

const orderlist = document.getElementById("orderlist");

storage.transaction.forEach((transaction) => {
    for (const key of Object.keys(transaction[0])) {
        const tr = document.createElement("tr");

        const tdName = document.createElement("td");
        tdName.innerHTML = key;

        const tdPrice = document.createElement("td");
        tdPrice.innerHTML = `$${transaction[0][key].price}`;

        const tdQuantity = document.createElement("td");
        tdQuantity.innerHTML = transaction[0][key].quantity;

        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdQuantity);

        orderlist.appendChild(tr);
    }
});
