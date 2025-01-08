// AOS Initialization
AOS.init();

// Particles.js Initialization
particlesJS.load('particles-js', 'js/particle.json', function () {
  console.log('Particles.js loaded');
});

// Two-line typing effect
document.addEventListener('DOMContentLoaded', function () {
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
$(document).ready(function () {
  // Initialize Slick
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
        settings: { centerPadding: '50px' },
      },
      {
        breakpoint: 600,
        settings: { centerPadding: '20px' },
      },
    ],
  });

  $('.carousel-button.left').on('click', function () {
    $('.project-cards').slick('slickPrev');
  });
  $('.carousel-button.right').on('click', function () {
    $('.project-cards').slick('slickNext');
  });

  // Smooth scroll
  $('nav a').on('click', function (e) {
    if (this.hash !== '') {
      e.preventDefault();
      const hash = this.hash;
      $('html, body').animate({ scrollTop: $(hash).offset().top - 70 }, 800);
    }
  });

  // Form Submission
  $('#contactForm').on('submit', function (e) { // Updated selector
    e.preventDefault(); // Prevent default form submission
    console.log('Form submission prevented.');

    const formData = $(this).serialize(); // Serialize form data
    console.log('Form Data:', formData); // Debugging log

    // AJAX POST request
    $.ajax({
      type: 'POST',
      url: '/send_message',
      data: formData,
      success: function (response) {
        console.log('Server Response:', response); // Debugging log
        if (response.status === 'success') {
          showPrompt(response.message, 'success');
          $('#contactForm')[0].reset(); // Clear the form
        } else {
          showPrompt(response.message, 'error');
        }
      },
      error: function (xhr, status, error) {
        console.error('AJAX Error:', status, error); // Debugging log
        showPrompt('Failed to send the message. Please try again later.', 'error');
      },
    });
  });

  // Function to show messages
  function showPrompt(message, type = 'success') {
    const responseMessage = $('#responseMessage');
    responseMessage.text(message).removeClass('success error').addClass(type);
    responseMessage.show();
    setTimeout(() => responseMessage.fadeOut(500), 5000);
  }

  // Scroll-to-Top Button
  const scrollTopButton = $('<div id="scroll-top">↑</div>');
  $('body').append(scrollTopButton);

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
      scrollTopButton.fadeIn();
    } else {
      scrollTopButton.fadeOut();
    }
  });

  scrollTopButton.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
  });

  // Highlight sections and nav links
  const navLinks = $('nav a');
  const sections = $('section');

  $(window).on('scroll', function () {
    const scrollPos = $(this).scrollTop() + 75;
    let activeLink = null;

    sections.each(function () {
      const section = $(this);
      const sectionTop = section.offset().top;
      const sectionHeight = section.height();

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        activeLink = $(`nav a[href="#${section.attr('id')}"]`);
      }
    });

    if (scrollPos < sections.first().offset().top) {
      activeLink = $('nav a[href="#home"]');
    }

    navLinks.removeClass('active');
    if (activeLink) {
      activeLink.addClass('active');
    }
  });
});
