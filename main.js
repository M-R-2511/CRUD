let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let clear = document.getElementById("clear");

let mood = "create";
let temp;
// where data stored
let data;

// summition data
if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}

// save in localstorage
function storeData() {
  let product = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.value,
    count: count.value,
    category: category.value,
  };

  // Add product details to array
  if (product.count <= 100) {
    if (mood === "create") {
      if (product.count > 1) {
        for (let i = 0; i < count.value; i++) {
          data.push(product);
        }
      } else {
        data.push(product);
      }
    } else {
      data[temp] = product;
      mood = "create";
      create.innerHTML = "Create";
      count.style.display = "block";
      getTotal();
    }
  }
  localStorage.setItem("product", JSON.stringify(data));
}

// calculate price of product
function getTotal() {
  if (price.value.trim() != "") {
    total.value = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = `Total: ${total.value}`;
    total.style.background = "#009968";
  } else {
    total.value = "";
    total.innerHTML = "Total: ";
    total.style.background = "#006898";
  }
}

// create a product
function showData() {
  if (
    title.value.trim() != "" &&
    price.value.trim() != "" &&
    category.value.trim() != ""
  ) {
    storeData();
    clearData();
  }

  let table = "";
  for (let i = 0; i < data.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button id="update" onclick ="updateData(${i})">Update</button></td>
        <td><button id="delete" onclick ="deleteData(${i})">Delete</button></td>
      </tr>
    `;
  }

  // Add product to page
  document.getElementById("tbody").innerHTML = table;

  getTotal();
}
showData();

// clean all inputs after creation
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  title.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "Total: ";
  if (data.length > 0) {
    clear.style.display = "block";
    clear.innerHTML = `Clear (${data.length})`;
  } else {
    clear.style.display = "none";
  }
  showData();
}
// Delete Product
function deleteData(i) {
  data.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(data));
  showData();
}

// Clear All
function deleteAll() {
  data.splice(0);
  localStorage.clear();
  showData();
}

// Update Btn
function updateData(i) {
  title.value = data[i].title;
  price.value = data[i].price;
  taxes.value = data[i].taxes;
  ads.value = data[i].ads;
  discount.value = data[i].discount;
  category.value = data[i].category;
  getTotal();
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let searchMood = "Title";
function goodSearch(id) {
  if (id === "searchTitle") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }
  search.focus();
  search.value = "";
  search.placeholder = "Search By " + searchMood;
  showData();
}

function searchProduct(value) {
  let table = "";
  for (let i = 0; i < data.length; i++) {
    if (searchMood === "Title") {
      if (
        data[i].title.includes(value)
      ) {
        table += `
        <tr>
          <td>${i + 1}</td>
          <td>${data[i].title}</td>
          <td>${data[i].price}</td>
          <td>${data[i].taxes}</td>
          <td>${data[i].ads}</td>
          <td>${data[i].discount}</td>
          <td>${data[i].total}</td>
          <td>${data[i].category}</td>
          <td><button id="update" onclick ="updateData(${i})">Update</button></td>
          <td><button id="delete" onclick ="deleteData(${i})">Delete</button></td>
        </tr>
      `;
      }
    } else {
      if (
        data[i].category.includes(value)
      ) {
        table += `
        <tr>
          <td>${i + 1}</td>
          <td>${data[i].title}</td>
          <td>${data[i].price}</td>
          <td>${data[i].taxes}</td>
          <td>${data[i].ads}</td>
          <td>${data[i].discount}</td>
          <td>${data[i].total}</td>
          <td>${data[i].category}</td>
          <td><button id="update" onclick ="updateData(${i})">Update</button></td>
          <td><button id="delete" onclick ="deleteData(${i})">Delete</button></td>
        </tr>
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
