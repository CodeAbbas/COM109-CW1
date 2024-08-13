// Gallery slider
function gallery_slider() {
  let nextBtn = document.querySelector(".gallery .buttons .next"),
    prevBtn = document.querySelector(".gallery .buttons .prev"),
    slide = document.querySelectorAll(".gallery .photos .block"),
    i = 0;

  prevBtn.onclick = (event) => {
    event.preventDefault();

    slide[i].classList.remove("active");
    i--;

    if (i < 0) {
      i = slide.length - 1;
    }
    slide[i].classList.add("active");
  };

  nextBtn.onclick = (event) => {
    event.preventDefault();

    slide[i].classList.remove("active");
    i++;

    if (i >= slide.length) {
      i = 0;
    }

    slide[i].classList.add("active");
  };

  slider_callback();
  let sliderInterval = window.setInterval(slider_callback, 3000);

  function slider_callback() {
    nextBtn.click();
  }
}

gallery_slider();

// Error handling for menu toggle
const hamburger = document.querySelector(".hamburger");
const navbarMenu = document.querySelector(".navbar-menu");

if (hamburger && navbarMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navbarMenu.classList.toggle("active");
  });
} else {
  console.error("Error!");
}
// Cart
const cart = document.querySelector(".cart");
const cartMenu = document.querySelector(".cart-container");
const closeButton = document.querySelector("#close");

if (cart && cartMenu) {
  cart.addEventListener("click", () => {
    cart.classList.toggle("active");
    cartMenu.classList.toggle("active");

    setTimeout(() => {
      cart.classList.remove("active");
      cartMenu.classList.remove("active");
    }, 60000);
  });
  closeButton.addEventListener("click", () => {
    cart.classList.remove("active");
    cartMenu.classList.remove("active");
  });
} else {

  console.error("Error!");

}
  //cart js
/* get cart total from session on load */
updateCartTotal();

/* button event listeners */
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}

/* ADD TO CART functions */

function addToCart(elem) {
    //init
    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
     var stringCart;
    //cycles siblings for product info near the add button
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; // text node
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    //create product object
    var product = {
        productname : getproductName,
        price : getprice
    };
    //convert product data to JSON for storage
    var stringProduct = JSON.stringify(product);
    /*send product data to session storage */
    
    if(!sessionStorage.getItem('cart')){
        //append product JSON object to cart array
        cart.push(stringProduct);
        //cart to JSON
        stringCart = JSON.stringify(cart);
        //create session storage cart item
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
        //get existing cart data from storage and convert back into array
       cart = JSON.parse(sessionStorage.getItem('cart'));
        //append new product JSON object
        cart.push(stringProduct);
        //cart back to JSON
        stringCart = JSON.stringify(cart);
        //overwrite cart data in sessionstorage 
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
/* Calculate Cart Total */
function updateCartTotal(){
    //init
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) {
        //get cart data & parse to array
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        //get no of items in cart 
        items = cart.length;
        //loop over cart array
        for (var i = 0; i < items; i++){
            //convert each JSON product in array back into object
            var x = JSON.parse(cart[i]);
            //get property value of price
            price = parseFloat(x.price.split('£')[1]);
            productname = x.productname;
            //add price to total
            carttable += "<tr><td>" + productname + "</td><td>£" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
    //update total on website HTML
    document.getElementById("total").innerHTML = total.toFixed(2);
    //insert saved products to cart table
    document.getElementById("carttable").innerHTML = carttable;
    //update items in cart on website HTML
    document.getElementById("itemsquantity").innerHTML = items;
}
//user feedback on successful add
function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}
/* User Manually empty cart */
function emptyCart() {
    //remove cart session storage object & refresh cart totals
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
      //clear message and remove class style
      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
} /* cart js*/

// Error handling for dark mode toggle
const toggleButton = document.querySelector('.dark-light');

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
} else {
  console.error("Error!");
}


// Form
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Input validation
  const isValid = validateForm();

  if (isValid) {
    // Prepare data for email
    const formData = new FormData(form);
    const templateParams = {
      from_name: `${formData.get('first_name')} ${formData.get('last_name')}`,
      to_name: 'Abbas Uddin',
      email: formData.get('email'),
      reply_to: formData.get('email'),
      message: formData.get('message'),
    };

    // Send the email using EmailJS
    emailjs.send('service_eg730jo', 'template_9i94an9', templateParams)
      .then(() => {
        // Handle successful email sending
        alert('Email sent successfully!');
        form.reset(); // Optionally reset the form
      })
      .catch(error => {
        // Handle email sending errors
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again later.');
      });
  }
});

function validateForm() {
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  let isValid = true;

  if (nameValue === '') {
    setErrorFor(nameInput, 'Name cannot be blank');
    isValid = false;
  } else {
    setSuccessFor(nameInput);
  }

  if (emailValue === '') {
    setErrorFor(emailInput, 'Email cannot be blank');
    isValid = false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(emailInput, 'Not a valid email');
    isValid = false;
  } else {
    setSuccessFor(emailInput);
  }

  if (messageValue === '') {
    setErrorFor(messageInput, 'Message cannot be blank');
    isValid = false;
  } else {
    setSuccessFor(messageInput);
  }

  return isValid;
}

function setErrorFor(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector('small');
  formGroup.className = 'form-group error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}




// popup 
promoBox({
  imagePath: "https://raw.githubusercontent.com/CodeAbbas/COM109-CW1/main/img/banner.jpg",
  link: "https://github.com/rolandtoth/promoBox", target: "_blank", disableOverlay: false,
  disableOverlayClose: false, disableStyles: false, disableCloseButton: false, disableKeyClose: false,
  closeButtonText: "✖️", showOnHash: "#promo", deleteCookieOnUrl: "#clear", fadeInDuration: 1, fadeOutDuration: 0.2, loadDelay: 2, autoCloseSeconds: 30
});
// callback functions 
var promoBoxStart = function () { if (typeof console !== "undefined") { console.log("promoBox has started..."); } }; var promoBoxClick = function () { if (typeof console !== "undefined") { console.log("promoBox image was clicked"); } }; var promoBoxClose = function () { if (typeof console !== "undefined") { console.log("promoBox terminated"); } }; 
