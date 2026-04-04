// Active nav link highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--teal)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));

// Contact form — Web3Forms
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');

  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(form)
    });
    const data = await response.json();

    if (data.success) {
      success.style.display = 'block';
      form.reset();
      setTimeout(() => { success.style.display = 'none'; }, 5000);
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (err) {
    alert('Something went wrong. Please try again or reach out on Instagram.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send It';
  }
}
