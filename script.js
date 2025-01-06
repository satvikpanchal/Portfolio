// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - 60, // Adjust for navbar height
      behavior: 'smooth',
    });
  });
});
