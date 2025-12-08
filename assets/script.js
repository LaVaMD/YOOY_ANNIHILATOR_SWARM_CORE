const body = document.body;

const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

const setActiveNav = () => {
  const page = body.dataset.page;
  if (!page) return;
  document.querySelectorAll('nav a').forEach((link) => {
    const target = link.dataset.page;
    if (target === page) {
      link.classList.add('active');
    }
  });
};
setActiveNav();

const overlay = document.querySelector('.overlay');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const openModalButtons = document.querySelectorAll('[data-open-modal]');

const showModal = (modalId) => {
  const target = document.getElementById(modalId);
  if (!target || !overlay) return;
  overlay.classList.add('show');
  overlay.querySelectorAll('.modal').forEach((m) => m.classList.add('hidden'));
  target.classList.remove('hidden');
};

const hideModal = () => {
  if (!overlay) return;
  overlay.classList.remove('show');
};

openModalButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.dataset.openModal;
    if (modal) showModal(modal);
  });
});

closeModalButtons.forEach((btn) => {
  btn.addEventListener('click', hideModal);
});

if (overlay) {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hideModal();
  });
}

const validateEmail = (email) => /.+@.+\..+/.test(email);

const attachFormHandler = (selector, requiredFields, successMessage) => {
  const form = document.querySelector(selector);
  if (!form) return;
  const alertBox = form.querySelector('.alert');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    requiredFields.forEach((field) => {
      const input = form.querySelector(`[name="${field}"]`);
      if (!input) return;
      if (!input.value.trim() || (field === 'email' && !validateEmail(input.value))) {
        valid = false;
      }
    });

    if (form.querySelector('[name="terms"]') && !form.querySelector('[name="terms"]').checked) {
      valid = false;
    }

    if (alertBox) {
      alertBox.textContent = valid ? successMessage : 'Please fill out required fields correctly.';
      alertBox.className = `alert ${valid ? 'success' : 'error'}`;
    }

    if (valid) {
      form.reset();
    }
  });
};

attachFormHandler('#login-form', ['email', 'password'], 'Welcome back! You are logged in.');
attachFormHandler('#signup-form', ['firstName', 'lastName', 'email', 'password'], 'Your account has been created!');
attachFormHandler('#forgot-form', ['email'], 'Check your inbox for reset instructions.');
attachFormHandler('#newsletter-form', ['email'], 'Thank you for joining our newsletter!');

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const question = item.querySelector('.faq-question');
  question?.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

const activePage = body.dataset.page;
if (activePage === 'home') {
  document.querySelectorAll('[data-scroll-target]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.scrollTarget;
      const block = document.getElementById(id);
      if (block) {
        e.preventDefault();
        block.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
