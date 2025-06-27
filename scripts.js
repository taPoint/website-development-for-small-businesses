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

document
  .querySelector("#contact form")
  .addEventListener("submit", function (e) {
    const phoneInput = this.querySelector('input[name="phone"]');
    const phone = phoneInput.value.replace(/\D/g, ""); // только цифры
    // Российский номер: 11 цифр, начинается с 7 или 8
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
    }
  });
