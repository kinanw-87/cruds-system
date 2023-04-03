// Get Elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let temp;
let searchBtnByTitle = document.querySelector(
  ".search-container #search-title"
);
let searchBtnByCategory = document.querySelector(
  ".search-container #search-category"
);
let searchInput = document.querySelector(".search-container #search");
let searchMood = "Title";
// Get Inputs of Price element | Array from
let inputsArray = Array.from(document.querySelectorAll(".inputs .price input"));

inputsArray.forEach(function (inp) {
  inp.onkeyup = getTotal;
});

/// Get Total
function getTotal() {
  // Check Price Input Is Not Empty
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d00";
  }
}

// Array From Data of Products
let dataProducts;

// Check Localstorage
if (localStorage.product != null) {
  dataProducts = JSON.parse(localStorage.product);
} else {
  dataProducts = [];
}

// Click Create
submit.onclick = createProductObj;

/// Create Product Object
function createProductObj() {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // Add All New Objects to DataProducts Array
  if (mood === "create") {
    if (newProduct.count > 0) {
      for (let i = 0; i < newProduct.count; i++) {
        dataProducts.push(newProduct);
      }
    } else {
      dataProducts.push(newProduct);
    }
  } else {
    dataProducts[temp] = newProduct;
    mood = "create";
    count.style.display = "block";
    submit.innerHTML = "Create";
  }

  // Save New Data on Localstorage
  localStorage.setItem("product", JSON.stringify(dataProducts));

  clearInputs();
  showData();
}

/// Clear Inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

// Read Data

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProducts.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataProducts[i].title}</td>
    <td>${dataProducts[i].price}</td>
    <td>${dataProducts[i].taxes}</td>
    <td>${dataProducts[i].ads}</td>
    <td>${dataProducts[i].discount}</td>
    <td>${dataProducts[i].total}</td>
    <td>${dataProducts[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;

  // Add Delete All Button
  let DivDelAll = document.querySelector(".delete-all");
  if (dataProducts.length > 0) {
    DivDelAll.innerHTML = `
    <button onclick = "deleteAll()">Delete All (${dataProducts.length})</button>`;
  } else {
    DivDelAll.innerHTML = "";
  }
}
showData();

/// Delete Product

function deleteData(i) {
  dataProducts.splice(i, 1);
  localStorage.product = JSON.stringify(dataProducts);
  showData();
}

/// Delete All Products

function deleteAll() {
  localStorage.clear();
  dataProducts = [];
  showData();
}

/// Update Data
function updateData(i) {
  title.value = dataProducts[i].title;
  price.value = dataProducts[i].price;
  taxes.value = dataProducts[i].taxes;
  ads.value = dataProducts[i].ads;
  discount.value = dataProducts[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProducts[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
searchBtnByTitle.onclick = getSearchMood;
searchBtnByCategory.onclick = getSearchMood;

/// Get Search Mood
function getSearchMood() {
  if (this.id === "search-title") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }
  searchInput.placeholder = `Search By ${searchMood}`;
  searchInput.focus();
  searchInput.value = "";
  showData();
}

searchInput.onkeyup = searchData;

/// Search
function searchData() {
  let table = "";
  if (searchMood === "Title") {
    for (let i = 0; i < dataProducts.length; i++) {
      if (dataProducts[i].title.includes(this.value.toLowerCase())) {
        table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataProducts[i].title}</td>
    <td>${dataProducts[i].price}</td>
    <td>${dataProducts[i].taxes}</td>
    <td>${dataProducts[i].ads}</td>
    <td>${dataProducts[i].discount}</td>
    <td>${dataProducts[i].total}</td>
    <td>${dataProducts[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataProducts.length; i++) {
      if (dataProducts[i].category.includes(this.value.toLowerCase())) {
        table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataProducts[i].title}</td>
    <td>${dataProducts[i].price}</td>
    <td>${dataProducts[i].taxes}</td>
    <td>${dataProducts[i].ads}</td>
    <td>${dataProducts[i].discount}</td>
    <td>${dataProducts[i].total}</td>
    <td>${dataProducts[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
