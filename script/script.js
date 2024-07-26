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
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

form.addEventListener('submit', e => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim(); 

    if(nameValue === '') {
        setErrorFor(name, 'Name cannot be blank');
    } else {
        setSuccessFor(name);
    }

    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
    }

    if(messageValue === '') {
        setErrorFor(message, 'Message cannot be blank'); 
    } else {
        setSuccessFor(message); 
    }
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