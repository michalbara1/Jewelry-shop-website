


let storage;
addEventListener("click",()=>{
    
})
if(localStorage.getItem("user")!=null){
    storage = JSON.parse(localStorage.getItem("user"));
}
const userId = storage._id;
const addToCart = async (productName, price) => {

  const res = await fetch("/api/addToCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      productName,
      price,
    }),
  });
  const data = await res.json();
  console.log(data);
  localStorage.setItem("user", JSON.stringify(data));


};
