(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
      setTimeout(function () {
          if ($('#spinner').length > 0) {
              $('#spinner').removeClass('show');
          }
      }, 1);
  };
  spinner();




  
/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
  el = el.trim()
  if (all) {
    return [...document.querySelectorAll(el)]
  } else {
    return document.querySelector(el)
  }
}

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all)
  if (selectEl) {
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener))
    } else {
      selectEl.addEventListener(type, listener)
    }
  }
}

/**
 * Easy on scroll event listener 
 */
const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener)
}

/**
 * Navbar links active state on scroll
 */
let navbarlinks = select('#navbar .scrollto', true)
const navbarlinksActive = () => {
  let position = window.scrollY + 200
  navbarlinks.forEach(navbarlink => {
    if (!navbarlink.hash) return
    let section = select(navbarlink.hash)
    if (!section) return
    if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
      navbarlink.classList.add('active')
    } else {
      navbarlink.classList.remove('active')
    }
  })
}
window.addEventListener('load', navbarlinksActive)
onscroll(document, navbarlinksActive)

/**
 * Scrolls to an element with header offset
 */
const scrollto = (el) => {
  let header = select('#header')
  let offset = header.offsetHeight

  if (!header.classList.contains('header-scrolled')) {
    offset -= 16
  }

  let elementPos = select(el).offsetTop
  window.scrollTo({
    top: elementPos - offset,
    behavior: 'smooth'
  })
}



/**
 * Toggle .header-scrolled class to #header when page is scrolled
 */
let selectHeader = select('#header')
if (selectHeader) {
  function headerScrolled() {
    if (window.scrollY > 100) {
      selectHeader.classList.add('header-scrolled');
    } else {
      selectHeader.classList.remove('header-scrolled');
    }
  }
  window.addEventListener('load', headerScrolled)
  onscroll(document, headerScrolled)
}



/**
 * Mobile nav toggle
 */
on('click', '.mobile-nav-toggle', function(e) {
  select('#navbar').classList.toggle('navbar-mobile')
  this.classList.toggle('bi-list')
  this.classList.toggle('bi-x')
})

/**
 * Mobile nav dropdowns activate
 */
on('click', '.navbar .dropdown > a', function(e) {
  if (select('#navbar').classList.contains('navbar-mobile')) {
    e.preventDefault()
    this.nextElementSibling.classList.toggle('dropdown-active')
  }
}, true)

/**
 * Scrool with ofset on links with a class name .scrollto
 */
on('click', '.scrollto', function(e) {
  if (select(this.hash)) {
    e.preventDefault()

    let navbar = select('#navbar')
    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile')
      let navbarToggle = select('.mobile-nav-toggle')
      navbarToggle.classList.toggle('bi-list')
      navbarToggle.classList.toggle('bi-x')
    }
    scrollto(this.hash)
  }
}, true)

/**
 * Scroll with ofset on page load with hash links in the url
 */
window.addEventListener('load', () => {
  if (window.location.hash) {
    if (select(window.location.hash)) {
      scrollto(window.location.hash)
    }
  }
});

/*
  Hero type effect
 */
const typed = select('.typed')
if (typed) {
  let typed_strings = typed.getAttribute('data-typed-items')
  typed_strings = typed_strings.split(',')
  new Typed('.typed', {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
}

  // Initiate the wowjs
  new WOW().init();

  // Back to top button
  $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }
  });
  $('.back-to-top').click(function () {
      $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
      return false;
  });
  


 
  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 2000
  });


  // Skills
  $('.skill').waypoint(function () {
      $('.progress .progress-bar').each(function () {
          $(this).css("width", $(this).attr("aria-valuenow") + '%');
      });
  }, {offset: '80%'});


  // Portfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
  });
  $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('active');
      $(this).addClass('active');

      portfolioIsotope.isotope({filter: $(this).data('filter')});
  });


  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      items: 1,
      dots: true,
      loop: true,
  });

  
})(jQuery);



const left = document.getElementById("left-side");

const handleMove = (e) => {
left.style.width = `${(e.clientX / window.innerWidth) * 100}%`;
};

document.onmousemove = (e) => handleMove(e);

document.ontouchmove = (e) => handleMove(e.touches[0]);


const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

console.log(canvas);

let particlesArray = []
window.addEventListener('resize', function(){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

const mouse = {
  x: null,
  y: null
}

canvas.addEventListener('click', function(e){
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 10; i++) {
      particlesArray.push(new Particle())   
  }
})

canvas.addEventListener('mousemove', function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 10; i++) {
      particlesArray.push(new Particle())   
  }
})
class Particle{
  constructor(){
      this.x = mouse.x
      this.y = mouse.y
      this.size = Math.random() * 10 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = '#fff';
  }
  update(){
      this.x += this.speedX;
      this.y += this.speedY;
      if(this.size > 0.2) this.size -=0.1;
  }

  draw(){
      ctx.strokeStyle = this.color;
    ctx.lineWidth = 0.4;
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
      ctx.stroke()
  }
}

function handleParticle() {
  for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();

      if (particlesArray[i].size <= 0.3) {
          particlesArray.splice(i,1);
          i--;
      }
  }
}


function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
  handleParticle()
  requestAnimationFrame(animate)
}
animate()


var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope) {
$scope.f4 = "";
$scope.s4 = "";
$scope.t4 = "";
$scope.l4 = "";
$scope.hname = "";
$scope.edm = "";
$scope.edy = "";
$scope.cvv = "";
});

$(".twin input")
.on("focus", function () {
  $(this).parent().addClass("focusit");
})
.blur(function () {
  $(this).parent().removeClass("focusit");
});

$('.four-num input[ng-model="f4"]').on("keyup change", function () {
if ($(this).val().slice(0, 1) === "4") {
  $(".logo b").attr("class", "visa");
  $(".clayout").addClass("blueit");
} else {
  $(".logo b").attr("class", "master");
  $(".clayout").removeClass("blueit");
}
});
$(".four-num input").on("keyup change", function () {
$in = $(this);
if ($in.val().length > 3) {
  $in.next().focus();
}
});
$('input[ng-model="cvv"]')
.on("focus", function () {
  $("#payment .card").addClass("flip");
})
.on("blur", function () {
  $("#payment .card").removeClass("flip");
});
$(".twin input").on("keyup change", function () {
$in = $(this);
if ($in.next().length) {
  if ($in.val().length > 1) {
    $in.next().focus();
  }
} else {
  if ($in.val().length > 1) {
    $in.blur();
  }
}
});










/*===== FOCUS =====*/
const inputs = document.querySelectorAll(".form__input")

/*=== Add focus ===*/
function addfocus(){
  let parent = this.parentNode.parentNode
  parent.classList.add("focus")
}

/*=== Remove focus ===*/
function remfocus(){
  let parent = this.parentNode.parentNode
  if(this.value == ""){
      parent.classList.remove("focus")
  }
}

/*=== To call function===*/
inputs.forEach(input=>{
  input.addEventListener("focus",addfocus)
  input.addEventListener("blur",remfocus)
})

