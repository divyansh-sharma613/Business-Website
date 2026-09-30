// Stats ke numbers 0 se ginti karke dikhao (jab section screen par aaye)
const counters = document.querySelectorAll('[data-count]');

function animate(el) {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || '';
  const steps = 40;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    el.textContent = Math.round(target * step / steps) + suffix;
    if (step === steps) clearInterval(timer);
  }, 30);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animate(entry.target);
      observer.unobserve(entry.target);
    }
  });
});
counters.forEach(c => observer.observe(c));

// Enquiry form
const form = document.getElementById('enquiryForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !message) {
    msg.textContent = 'Please enter your name and message.';
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    msg.textContent = 'Enter a valid email address.';
    return;
  }
  msg.textContent = `Thanks ${name}, we will reply within 24 hours.`;
  form.reset();
});