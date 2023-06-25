const storage = JSON.parse(localStorage.getItem("user"));
if (!storage) {
  location.href = "/";
}

const cartlist = document.getElementById("cartlist");
let totalprice = 0,
  count = 0;
for (const name of Object.keys(storage.cart)) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between lh-sm";

  const div = document.createElement("div");

  const h6 = document.createElement("h6");
  h6.className = "my-0";
  h6.innerHTML = name;

  const span = document.createElement("span");
  span.className = "text-body-secondary";
  span.innerHTML = "$" + storage.cart[name].price;

  li.appendChild(div);
  div.appendChild(h6);
  li.appendChild(span);

  cartlist.appendChild(li);
  totalprice += storage.cart[name].price;
}

const li = document.createElement("li");
li.className = "list-group-item d-flex justify-content-between";

const span = document.createElement("span");
span.innerHTML = "Total" + " $" + `${totalprice}`;

function redeemPromo() {
  const promoCode = document.getElementById("promo-input").value;

  if (promoCode === "COCO30") {
    const totalElement = document.querySelector("#cartlist li:last-child span");
    const total = parseFloat(totalElement.innerHTML.replace("Total $", ""));
    const discount = total * 0.3;
    const newTotal = total - discount;

    // שמירת הסכום המקורי בתוך תג ה-<del>
    const originalAmount = document.createElement("del");
    originalAmount.innerHTML = "Total $" + total.toFixed(2);

    totalElement.innerHTML = ""; // מחיקת התוכן הקיים
    totalElement.appendChild(originalAmount); // הוספת תג ה-<del>
    totalElement.innerHTML += "<br>"; // הוספת שורה חדשה
    totalElement.innerHTML += "New Total $" + newTotal.toFixed(2); // הוספת הסכום החדש
    totalprice = newTotal;
  } else {
    span.innerHTML = "Total $" + `${totalprice}`;
  }
}

const strong = document.createElement("strong");

li.appendChild(span);
li.appendChild(strong);
cartlist.appendChild(li);

document.getElementById("numofprod").innerHTML = count;

document.getElementById("transaction").addEventListener("click", async (e) => {
  e.preventDefault();
  const res = await fetch("/api/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid: storage._id }),
  });
  const data = await res.json();
  localStorage.setItem("user", JSON.stringify(data));
  while (cartlist.firstChild) {
    cartlist.removeChild(cartlist.firstChild);
  }
});

 // קביעת אירוע לחיצה על הכפתור
document.getElementById("transaction").addEventListener("click", function(event) {
  event.preventDefault(); // מניעת השליחה הרגילה של הטופס
  // יצירת חלונית עם הודעה וכפתור "חזרה לעמוד הבית"
  var successPopup = document.createElement("div");
  successPopup.className = "popup";
  successPopup.innerHTML = `
    <div class="popup-content">
      <h2>Your order complete</h2>
      <button onclick="window.location.href='/'" class="btn btn-primary">Back to home</button>
    </div>
  `;

  // הוספת החלונית לתוך ה-HTML של הדף
  document.body.appendChild(successPopup);
});