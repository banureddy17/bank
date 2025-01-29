var btncart = document.querySelector("#cart-icon");
var cart = document.querySelector(".cart");
var btnclose = document.querySelector("#cart-close");
let itemList = [];

btncart.addEventListener("click", () => {
  cart.classList.add("cart1");
});
btnclose.addEventListener("click", () => {
  cart.classList.remove("cart1");
});
document.addEventListener("DOMContentLoaded", loadSnack);

function loadSnack() {
  console.log("dwefwe");
  loadContent();
}
function loadContent() {
  let btnRemove = document.querySelectorAll(".cart-remove");
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", removeCart);
  });

  let quantitySnack = document.querySelectorAll(".quantity");
  quantitySnack.forEach((qty) => {
    qty.addEventListener("change", changeQty);
  });

  let cartBtn = document.querySelectorAll(".snack-cart");
  cartBtn.forEach((btn) => {
    btn.addEventListener("click", cartAdding);
  });
  updateTotal();
}

console.log(itemList);

function removeCart() {
  if (confirm("are you sure")) {
    // this.parentElement.remove();
    console.log(this.parentElement);

    let title = this.parentElement.querySelector(".cart-snack-title").innerHTML;
    console.log(title);

    itemList = itemList.filter((el) => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}

function changeQty() {
  let cartBox = this.parentElement.parentElement;
  let title = cartBox.querySelector(".cart-snack-title").innerHTML;
  let stock = itemList.find((el) => el.title === title).stock;

  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  if (parseInt(this.value) >= stock) {
    console.log("hihiu");

    this.value = stock;
    alert("Stock exceeded!");
  }

  loadContent();
}

function cartAdding() {
  let snack = this.parentElement;
  let title = snack.querySelector(".food-title").innerHTML;
  let price = snack.querySelector(".snacks-price").innerHTML;
  let imgSou = snack.querySelector(".snack-img").src;
  let stock = parseInt(
    snack.querySelector(".stock").innerHTML.replace("stock:", "")
  );

  console.log(title, price, imgSou, stock);
  let newProductEle = {
    title,
    price,
    imgSou,
    stock,
  };
  let newProduct = createCart(title, price, imgSou, stock);
  let element = document.createElement("div");
  element.innerHTML = newProduct;
  let cartCon = document.querySelector(".cart-content");
  cartCon.append(element);
  loadContent();
  if (itemList.find((el) => el.title == newProductEle.title)) {
    console.log(itemList);
    alert("already this product added");
    return;
  } else {
    itemList.push(newProductEle);
    console.log(itemList.length);
    loadContent();
  }
}

function createCart(title, price, imgSou, stock) {
  // console.log(price1);

  return `

             <div class="cart-box">
              <img src=${imgSou} alt="" class="snack-img1" />
              <div class="detail-box">
                <div class="cart-snack-title">${title}</div>
                <div class="price-box">
                  <div class="cart-price">${price}</div>
                  <div class="cart-amt">${price}</div>
                </div>
                <input type="number" class="quantity" value="1" min="1" max="${stock}" />
              </div>
              <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
            </div>
  `;
}

function updateTotal() {
  // loadContent();
  // cartAdding();
  var cartItems = document.querySelectorAll(".cart-box");
  var totalValue = document.querySelector(".total-price");
  // let qty = document.querySelector(".quantity").value;

  let total = 0;

  cartItems.forEach((product) => {
    let priceEle = product.querySelector(".cart-price");
    console.log(priceEle);

    let price = priceEle.innerHTML.replace("Rs.", "");
    console.log(price);
    let qty = product.querySelector(".quantity").value;
    console.log(qty);

    total += price * qty;
    console.log(total);
    product.querySelector(".cart-amt").innerText = "Rs." + price * qty;
  });

  totalValue.innerHTML = "Rs." + total;
  var cartCount = document.querySelector("#cart-count");
  let count = itemList.length;
  cartCount.innerHTML = count;
  console.log(count);

  if (count == 0) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "block";
  }
}
