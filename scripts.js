document.getElementById("burger-menu").onclick = function () {
  document.querySelector("nav").classList.toggle("active");
  this.classList.toggle("open");
};

// Закрытие меню при клике на пункт
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelector("nav").classList.remove("active");
    document.getElementById("burger-menu").classList.remove("open");
  });
});

document.querySelector("#contact form").addEventListener("submit", function(e) {
  // Проверка телефона (ваш существующий код)
  const phoneInput = this.querySelector('input[name="phone"]');
  const phone = phoneInput.value.replace(/\D/g, "");
  
  if (!((phone.length === 11 && (phone.startsWith("7") || phone.startsWith("8"))) || 
        (phone.length === 12 && phone.startsWith("+7")))) {
    alert("Пожалуйста, введите корректный номер телефона в формате +7XXXXXXXXXX, 7XXXXXXXXXX или 8XXXXXXXXXX");
    phoneInput.focus();
    e.preventDefault();
    return;
  }
  
  // Проверка выбранных методов связи
  const checkedMethods = this.querySelectorAll('input[name="contact_method[]"]:checked');
  if (checkedMethods.length === 0) {
    alert("Пожалуйста, выберите хотя бы один способ связи");
    e.preventDefault();
    return;
  }
  
  // Проверка email, если выбран email
  const emailMethod = this.querySelector('input[name="contact_method[]"][value="email"]:checked');
  const emailInput = this.querySelector('input[name="email"]');
  
  if (emailMethod && !emailInput.value) {
    alert("Пожалуйста, укажите email, так как вы выбрали этот способ связи");
    emailInput.focus();
    e.preventDefault();
  }
});

  // Динамическое управление полем email
document.addEventListener('DOMContentLoaded', function() {
  const emailField = document.querySelector('input[name="email"]');
  const contactMethods = document.querySelectorAll('input[name="contact_method[]"]');
  
  // Проверяем выбранные методы при изменении
  contactMethods.forEach(method => {
    method.addEventListener('change', function() {
      updateEmailField();
    });
  });
  
  function updateEmailField() {
    const emailMethod = document.querySelector('input[name="contact_method[]"][value="email"]:checked');
    const anyMethod = document.querySelector('input[name="contact_method[]"][value="any"]:checked');
    
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

