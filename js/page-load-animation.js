document.addEventListener("DOMContentLoaded", function () {
  // Проверяем настройки доступности
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Для пользователей с reduced motion пропускаем сложные анимации
    return;
  }

  // Анимируем header первым
  const header = document.querySelector("header");
  if (header) {
    header.classList.add("page-load-animation");
    setTimeout(() => {
      header.classList.add("animate-in");
    }, 100);
  }

  // Анимируем основные секции с последовательными задержками
  const mainSections = document.querySelectorAll(".section-main");
  mainSections.forEach((section, index) => {
    section.classList.add("page-load-animation");

    // Увеличивающаяся задержка для каскадного эффекта
    const delay = 300 + index * 200;

    setTimeout(() => {
      section.classList.add("animate-in");

      // После анимации удаляем классы, чтобы не конфликтовать с scroll-анимациями
      setTimeout(() => {
        section.classList.remove("page-load-animation", "animate-in");
      }, 1000);
    }, delay);
  });

  // Анимируем footer последним
  const footer = document.querySelector("footer");
  if (footer) {
    footer.classList.add("page-load-animation");
    setTimeout(() => {
      footer.classList.add("animate-in");
    }, 300 + mainSections.length * 200);
  }
});
