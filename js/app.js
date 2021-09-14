const loadProducts = () => {
  // const url = `https://fakestoreapi.com/products`;
  fetch('../js/data.json')
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");

    // Dynamically Show Star:
    let HTML = ""; // Start the HTML string for concatenation
    for (let i = 0; i < 5; i++) {  // We need 5 stars
      let icoClass = i < product.rating.rate ? "fa fa-star star-color" : "fa fa-star-o"; // full or empty star
      HTML += "<i class='" + icoClass + "'></i>"; // concatenate stars
    }

    // Dynamically Set Every Products Cart
    div.innerHTML = `
      <div class="col single-product">
        <div class="card h-100 border border-dark">
          <div id="starIcon"></div>
          <div class="d-flex justify-content-center">
            <img src="${image}" class="product-image p-3" alt="...">
          </div>
          <div class="card-body" style="">
            <div class="overflow-hidden" style="height: 45px">
              <h5 class="card-title">${product.title}</h5>              
            </div>
            <p>Category: ${product.category}</p>
            <h4>Price: $${product.price}</h4>
            <div class="pt-2 d-flex">
              <div><button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to Cart</button></div>
              <div class="ms-auto"><button id="details-btn" class="btn btn-danger">Details</button></div>
            </div>
          </div>
          <div class="card-footer">
            <div>
              <h6>
                ${HTML} ${product.rating.rate} (${product.rating.count})
              </h6>
            </div>
          </div>
        </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
  return grandTotal;
};

// Buy Products:
const buyProducts = () => {
  const totalCost = updateTotal();
  document.getElementById("all-products").textContent = '';
  document.getElementById("thank-you-container").textContent = '';
  const div = document.createElement("div");
  const img = '../images/smile-emoji.png';
  div.innerHTML = `
        <h3 class="text-center">Successfully Paid $${totalCost}</h3>
        <img src="${img}" class="img-fluid" alt="">
        <h1 class="text-success text-center">Thank You! <br>Happy Super Shopping!</h1>
  `;
  document.getElementById("thank-you-container").appendChild(div);
}
// Reload Function:
const reload = () => {
  location.reload();
}