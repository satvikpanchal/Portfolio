AOS.init();

particlesJS.load('particles-js', '/static/js/particle.json', function() {
  console.log('Particles.js loaded');
});

// Two-line typing effect (unified with the same font & gradient)
document.addEventListener('DOMContentLoaded', function() {
  const tagline = 
    "Hello, I am Satvik Panchal!\n" + 
    "I'm blending ML and Software Engineering for real-world impact!";
  const typingSpan = document.querySelector('.typing');
  let i = 0;

  function typeChar() {
    if (i < tagline.length) {
      typingSpan.textContent += tagline.charAt(i);
      i++;
      setTimeout(typeChar, 35);
    }
  }
  typeChar();
});

// jQuery for Slick carousel and smooth scroll
$(document).ready(function() {
  // Initialize Slick with custom arrows
  $('.project-cards').slick({
    infinite: true,
    centerMode: true,
    centerPadding: '80px',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          centerPadding: '50px'
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: '20px'
        }
      }
    ]
  });

  $('.carousel-button.left').on('click', function() {
    $('.project-cards').slick('slickPrev');
  });
  $('.carousel-button.right').on('click', function() {
    $('.project-cards').slick('slickNext');
  });

  // Smooth scroll offset
  $('nav a').on('click', function(e) {
    if (this.hash !== "") {
      e.preventDefault();
      const hash = this.hash;
      $('html, body').animate(
        { scrollTop: $(hash).offset().top - 70 },
        800
      );
    }
  });

  // Handle form submission
  $('#contact-form').on('submit', function(e) {
    e.preventDefault();
    const formData = $(this).serialize();

    $.post('/send_message', formData, function(response) {
      if (response.status === 'success') {
        $('#contact-form')[0].reset();
        showPrompt(response.message);
      } else {
        showPrompt(response.message, 'error');
      }
    });
  });

  function showPrompt(message, type = 'success') {
    const prompt = $('<div class="prompt"></div>').text(message).addClass(type);
    $('body').append(prompt);
    setTimeout(() => {
      prompt.fadeOut(500, () => prompt.remove());
    }, 5000);
  }
});