/**
 * Оптимизации для мобильных устройств
 */
document.addEventListener("DOMContentLoaded", function () {
  // Определяем, является ли устройство мобильным
  const isMobile = window.innerWidth <= 768;

  // Оптимизация для мобильных устройств
  if (isMobile) {
    // Отложенная загрузка изображений
    const lazyImages = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach((img) => imageObserver.observe(img));
    } else {
      // Fallback для браузеров без поддержки IntersectionObserver
      lazyImages.forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      });
    }

    // Улучшение отзывчивости сенсорных событий
    document.body.addEventListener("touchstart", function () {}, {
      passive: true,
    });

    // Оптимизация прокрутки
    let ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          // Здесь можно добавить код, который должен выполняться при прокрутке
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Обработка ориентации экрана
  window.addEventListener("orientationchange", function () {
    // Небольшая задержка для корректной обработки изменения ориентации
    setTimeout(function () {
      // Здесь можно добавить код, который должен выполняться при изменении ориентации
      console.log("Orientation changed");
    }, 100);
  });

  // Mobile navigation is handled in scripts.js to avoid conflicts
});
