document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  // Preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  // Sticky Header
  const header = document.querySelector('#header');
  if (header) {
    const toggleStickyHeader = () => {
      window.scrollY > 100
        ? header.classList.add('sticked')
        : header.classList.remove('sticked');
    };
    document.addEventListener('scroll', toggleStickyHeader);
  }

  // Scroll to Top Button
  const scrollTopButton = document.querySelector('.scroll-top');
  if (scrollTopButton) {
    const toggleScrollTopButton = () => {
      window.scrollY > 100
        ? scrollTopButton.classList.add('active')
        : scrollTopButton.classList.remove('active');
    };

    window.addEventListener('load', toggleScrollTopButton);
    document.addEventListener('scroll', toggleScrollTopButton);

    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile Navigation
  const toggleMobileNav = () => {
    document.body.classList.toggle('mobile-nav-active');
    document.querySelector('.mobile-nav-show')?.classList.toggle('d-none');
    document.querySelector('.mobile-nav-hide')?.classList.toggle('d-none');
  };

  document.querySelectorAll('.mobile-nav-toggle').forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMobileNav();
    });
  });

  // Shopping Cart
  const shoppingBag = document.querySelector('#shopping-bag');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const updateCartCount = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (shoppingBag) {
      shoppingBag.textContent = `🛒 Cart (${totalItems})`;
    }
  };

  updateCartCount();

  window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
      cart = JSON.parse(event.newValue) || [];
      updateCartCount();
    }
  });

  // Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      fetch('forms/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('username', data.username);
            window.location.href = 'index.html';
          } else {
            alert(data.message);
          }
        })
        .catch((error) => console.error('Error:', error));
    });
  }

  const setLoginState = () => {
    const loginLink = document.querySelector('#login-link');
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const username = localStorage.getItem('username');
  
    if (loginLink) {
      if (isLoggedIn && username) {
        loginLink.innerHTML = `Welcome, ${username} <span id="logout-button" style="cursor: pointer;">Logout</span>`;
        loginLink.href = '#';
  
        const logoutButton = document.querySelector('#logout-button');
        if (logoutButton) {
          logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('username');
            alert('You have been logged out.');
            window.location.href = 'index.html';
          });
        } else {
          console.error('Logout button not found in the DOM.');
        }
      } else {
        loginLink.innerHTML = '<a href="login.html">Login</a>';
      }
    }
  };
  
  setLoginState();
  

  // AOS Initialization
  const initializeAOS = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
    }
  };

  window.addEventListener('load', initializeAOS);

  // Add to Cart
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  const handleAddToCart = (e) => {
    const button = e.target;
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    if (!id || !name || isNaN(price)) {
      alert('Error: Invalid product data.');
      return;
    }

    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to your cart.`);
  };

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', handleAddToCart);
  });

  // Hide/Show Header on Scroll
  let lastScrollTop = 0;
  if (header) {
    const toggleNavbarOnScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollTop && currentScroll > 100) {
        header.style.top = '-100px';
      } else {
        header.style.top = '0';
      }

      lastScrollTop = currentScroll;
    };

    window.addEventListener('scroll', toggleNavbarOnScroll);
  }
});
