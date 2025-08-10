// Burger menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const nav = document.querySelector("nav");
  const menuOverlay = document.getElementById("menu-overlay");

  function openMenu() {
    nav.classList.add("active");
    burgerMenu.classList.add("open");
    menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    nav.classList.remove("active");
    burgerMenu.classList.remove("open");
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function handleBurgerClick() {
    if (nav.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (burgerMenu && nav && menuOverlay) {
    // Add the click event listener to burger menu
    burgerMenu.addEventListener("click", handleBurgerClick);

    // Close menu when clicking on overlay
    menuOverlay.addEventListener("click", closeMenu);

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    // Close menu on window resize if screen becomes larger
    window.addEventListener("resize", function () {
      if (window.innerWidth > 600) {
        closeMenu();
      }
    });

    // Close menu on Escape key press
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("active")) {
        closeMenu();
      }
    });
  }
});

const contactForm = document.querySelector("#contact form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    // Проверка телефона (ваш существующий код)
    const phoneInput = this.querySelector('input[name="phone"]');
    const phone = phoneInput.value.replace(/\D/g, "");

    if (
      !(
        (phone.length === 11 &&
          (phone.startsWith("7") || phone.startsWith("8"))) ||
        (phone.length === 12 && phone.startsWith("+7"))
      )
    ) {
      alert(
        "Пожалуйста, введите корректный номер телефона в формате +7XXXXXXXXXX, 7XXXXXXXXXX или 8XXXXXXXXXX"
      );
      phoneInput.focus();
      e.preventDefault();
      return;
    }

    // Проверка выбранных методов связи
    const checkedMethods = this.querySelectorAll(
      'input[name="contact_method[]"]:checked'
    );
    if (checkedMethods.length === 0) {
      alert("Пожалуйста, выберите хотя бы один способ связи");
      e.preventDefault();
      return;
    }

    // Проверка email, если выбран email
    const emailMethod = this.querySelector(
      'input[name="contact_method[]"][value="email"]:checked'
    );
    const emailInput = this.querySelector('input[name="email"]');

    if (emailMethod && !emailInput.value) {
      alert("Пожалуйста, укажите email, так как вы выбрали этот способ связи");
      emailInput.focus();
      e.preventDefault();
    }
  });
}

// Динамическое управление полем email
document.addEventListener("DOMContentLoaded", function () {
  const emailField = document.querySelector('input[name="email"]');
  const contactMethods = document.querySelectorAll(
    'input[name="contact_method[]"]'
  );

  // Проверяем выбранные методы при изменении
  contactMethods.forEach((method) => {
    method.addEventListener("change", function () {
      updateEmailField();
    });
  });

  function updateEmailField() {
    const emailMethod = document.querySelector(
      'input[name="contact_method[]"][value="email"]:checked'
    );
    const anyMethod = document.querySelector(
      'input[name="contact_method[]"][value="any"]:checked'
    );

    if (emailMethod || anyMethod) {
      emailField.placeholder = "Ваш Email (обязательно)";
      emailField.required = true;
      emailField.style.display = "block";
    } else {
      emailField.placeholder = "Ваш Email (не обязательно)";
      emailField.required = false;
      emailField.style.display = "block"; // Или "none" если хотите скрыть
    }
  }

  // Инициализация при загрузке
  updateEmailField();
});

function setupVkAlert() {
  const vkAlert = document.getElementById("vk-alert");
  if (!vkAlert) return;

  vkAlert.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation(); // Добавляем остановку всплытия

    alert("У нас пока нет страницы ВК 😢 Но скоро будет!");
  });
}

// Запускаем после полной загрузки страницы
window.addEventListener("DOMContentLoaded", setupVkAlert);
