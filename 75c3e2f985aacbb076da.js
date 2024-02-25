window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
import "./sass/custom.scss";
import "./css/style.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import "./sass/style.scss"

/* const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)) */

document
  .querySelectorAll('[data-bs-toggle="tooltip"]')
  .forEach((item) => new bootstrap.Tooltip(item));

document.querySelectorAll(".add-to-cart-btn").forEach((item) => {
  item.addEventListener("click", () => {
    alert("تم اضافة المنتج الى عربة الشراء");
  });
});

document
  .querySelectorAll(".size-option input[type='radio']")
  .forEach((item) => {
    item.addEventListener("change", () => {
      document.querySelectorAll(".size-option").forEach((i) => {
        i.classList.remove("active");
      });
      item.parentNode.parentNode.classList.add("active");
    });
  });

document
  .querySelectorAll(".color-option input[type='radio']")
  .forEach((item) => {
    item.addEventListener("change", () => {
      document.querySelectorAll(".color-option").forEach((i) => {
        i.classList.remove("active");
      });
      item.parentNode.parentNode.classList.add("active");
    });
  });

/*====================calculating the product total price===================*/
document.querySelectorAll("[data-product-quantity]").forEach((item) => {
  item.addEventListener("change", () => {
    const newQuantity = item.value;
    const parent = item.closest("[data-product-info]");
    const pricePerUnit = parent.getAttribute("data-product-price");
    const totalPriceForProduct = newQuantity * pricePerUnit;
    parent.querySelector(".total-price-for-product").innerHTML =
      totalPriceForProduct + "$";
    calculateTotalPrice();
  });
});

document.querySelectorAll("[data-remove-from-card]").forEach((item) => {
  item.addEventListener("click", () => {
    item.closest("[data-product-info]").remove();
    calculateTotalPrice();
  });
});

const calculateTotalPrice = () => {
  let totalPriceForAllProduct = 0;
  document.querySelectorAll("[data-product-info]").forEach((product) => {
    let pricePerUnit = product.getAttribute("data-product-price");
    let quantity = product.querySelector("[data-product-quantity]").value;
    let totalPriceForProduct = pricePerUnit * quantity;

    totalPriceForAllProduct += totalPriceForProduct;
  });
  document.getElementById("total-price-for-all-product").innerHTML =
    totalPriceForAllProduct + "$";
};

/*====================Cities selection===================*/

const citiesByCountry = {
  sa: ["جدة", "الرياض"],
  eg: ["القاهرة", "الإسكندرية"],
  jo: ["عمان", "الزرقاء"],
  sy: ["دمشق", "حلب", "حماه"],
};

document.querySelectorAll('select[name="country"]').forEach((item) => {
  item.addEventListener("change", () => {
    const country = item.value;
    const cities = citiesByCountry[country];

    document
      .querySelectorAll("#paymentcities option")
      .forEach((option) => option.remove());

    const firstOption = document.createElement("option");
    const optionText = document.createTextNode("اختر المدينة");
    firstOption.appendChild(optionText);
    firstOption.setAttribute("disabled", "true");
    firstOption.setAttribute("value", "");
    firstOption.setAttribute("selected", "true");

    const cityOptions = document.getElementById("paymentcities");
    cityOptions.appendChild(firstOption);

    cities.forEach((city) => {
      const newOption = document.createElement("option");
      const optionText = document.createTextNode(city);

      newOption.appendChild(optionText);
      newOption.setAttribute("value", city);

      cityOptions.appendChild(newOption);
    });
  });
});

/* ======================= اخفاء و اظهار بيانات البطاقة ======================= */

document
  .querySelectorAll('#form-checkout input[name="payment-method"]')
  .forEach((item) => {
    item.addEventListener("change", () => {
      const paymentMethod = item.value;
      const creditInputs = document.querySelectorAll("#credit-card-info input");

      if (paymentMethod === "on-delivery") {
        creditInputs.forEach((input) => {
          input.style.display = "none";
        });
      } else {
        creditInputs.forEach((input) => {
          input.style.display = "block";
        });
      }
    });
  });

let rightnow = new Date().getFullYear();
document.getElementById("year").innerHTML = rightnow;

console.log("اهلاً بك في متجر عربي");
