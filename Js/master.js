let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .fa-magnifying-glass");
/* <i class="fa-solid fa-xmark-large"></i> */
searchBox.addEventListener("click", ()=> {
    navbar.classList.toggle("showInput");
    if (navbar.classList.contains("showInput")) {
        searchBox.classList.replace("fa-magnifying-glass", "fa-x")
    } else {
        searchBox.classList.replace("fa-x", "fa-magnifying-glass")
    }
});

let menuOpen = document.querySelector(".navbar .fa-bars");
let closeOpen = document.querySelector(".nav-links .fa-x");
let navLinks = document.querySelector(".nav-links");

menuOpen.addEventListener("click", () => {
    navLinks.style.left = "0";
})
closeOpen.addEventListener("click", () => {
    navLinks.style.left = "-100%";
});


// 00000000000000000


let manArrow = document.querySelector(".man-arrow")

manArrow.addEventListener("click", () => {
    navLinks.classList.toggle("show1")
});
let whomnArrow = document.querySelector(".whomn-arrow")

whomnArrow.addEventListener("click", () => {
    navLinks.classList.toggle("show2")
})
let sportArrow = document.querySelector(".sport-arrow")

sportArrow.addEventListener("click", () => {
    navLinks.classList.toggle("show3")
})

// 1111111111111111111111111111111111111

const filter = {
  filterAction() {
    document.querySelectorAll(".product-box__item").forEach((item) => {
      let categoryAtribut = item.getAttribute("data-category");
      let priceAtribut = Number(item.getAttribute("value"));

      if (
        (filter.category() == categoryAtribut || filter.category() == "all") &&
        (filter.price() >= priceAtribut || filter.price() == "0")
      ) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  },

  price() {
    let priceValue = document.querySelector(".price-value__item");
    priceValue.innerHTML = document.querySelector("[data-filter]").value;

    return document.querySelector("[data-filter]").value;
  },

  category() {
    let radio = document.querySelectorAll(".category-control");
    for (const item of radio) {
      if (item.checked) {
        return item.getAttribute("data-value-category");
      }
    }
  },

  checkAtributeToggle() {
    document.querySelector(".select-control").addEventListener("click", () => {
      document.querySelectorAll(".category-control").forEach((item) => {
        item.removeAttribute("checked");
      });

      if (event.target.classList == "category-control") {
        event.target.setAttribute("checked", "");
      } else {
        event.stopImmediatePropagation();
      }
    });
  },
};

filter.checkAtributeToggle();

document
  .querySelector(".select-control")
  .addEventListener("click", filter.filterAction);

document
  .querySelector(".price-control")
  // .addEventListener("change", filter.filterAction);

const cart = {
  add() {
    let div = document.querySelector(".top-cart-info__goods");
    let element = event.target.parentNode.parentNode.cloneNode("true");
    let elementAnimation = event.target.parentNode.parentNode;
    elementAnimation.classList.add("animation");

    element.classList = "product-box__item--small";
    element.removeAttribute("style");
    element.querySelector(".product-box__btn").innerHTML = "X";
    element.querySelector(".product-box__btn").classList =
      "product-box__btn--delete";

    document.querySelector(".top-cart").style.bottom = 0 + "px";
    div.appendChild(element);
    cart.price();

    setTimeout(() => {
      elementAnimation.classList.remove("animation");
    }, 1000);
  },

  delete() {
    if (event.target.classList == "product-box__btn--delete") {
      let mainElement = event.target.parentNode.parentNode
      mainElement.classList.add('delete')
      setTimeout(() => {
        mainElement.remove();
        cart.price();
      }, 900);
    }
  },

  price() {
    let priceValue = 0;
    document.querySelectorAll(".product-box__item--small").forEach((item) => {
      priceValue += Number(item.getAttribute("value"));
    });
    document.querySelector(".red-info").innerHTML = priceValue;

    if (priceValue === 0) {
      document.querySelector(".top-cart").style.bottom = -120 + "px";
    }
  },
};

document
  .querySelectorAll(".product-box__btn")
  .forEach((item) => item.addEventListener("click", cart.add));

document
  .querySelector(".top-cart-info__goods")
  .addEventListener("click", cart.delete);
