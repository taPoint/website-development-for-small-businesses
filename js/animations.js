document.addEventListener("DOMContentLoaded", () => {
  // Инициализация анимаций в зависимости от страницы
  initializePageAnimations();

  // Универсальный observer для всех типов анимаций
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          // Прекращаем наблюдение после анимации
          animationObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Запускаем наблюдение за всеми анимируемыми элементами
  const animatedElements = document.querySelectorAll(
    ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .fade-in"
  );

  animatedElements.forEach((el) => {
    animationObserver.observe(el);
  });
});

function initializePageAnimations() {
  // Определяем текущую страницу
  const currentPage = window.location.pathname;

  if (
    currentPage.includes("prices.html") ||
    document.getElementById("prices")
  ) {
    setupPricesPageAnimations();
  }

  // Можно добавить другие страницы
  if (
    currentPage.includes("index.html") ||
    currentPage === "/" ||
    document.getElementById("hero")
  ) {
    setupMainPageAnimations();
  }
}

function setupPricesPageAnimations() {
  // Анимация заголовка
  const mainTitle = document.querySelector("#prices h1");
  if (mainTitle) {
    mainTitle.classList.add("scroll-animate");
  }

  // Анимация блока с уведомлением о скидках
  const priceNotice = document.querySelector(".price-notice");
  if (priceNotice) {
    priceNotice.classList.add("scroll-animate-scale", "delay-1");
  }

  // Анимация карточек с ценами (staggered effect)
  const priceCards = document.querySelectorAll(".price-card");
  priceCards.forEach((card, index) => {
    card.classList.add("scroll-animate");

    // Добавляем задержки для последовательного появления
    const delayClass = `delay-${Math.min(index + 2, 6)}`;
    card.classList.add(delayClass);

    // Особая анимация для главной услуги
    if (card.classList.contains("main-service")) {
      card.classList.remove("scroll-animate");
      card.classList.add("scroll-animate-scale");
      card.classList.add("delay-2");
    }
  });

  // Анимация disclaimer
  const disclaimer = document.querySelector(".price-disclaimer");
  if (disclaimer) {
    disclaimer.classList.add("scroll-animate", "delay-4");
  }

  // Анимация кнопки калькулятора
  const calculatorCta = document.querySelector(".calculator-cta");
  if (calculatorCta) {
    calculatorCta.classList.add("scroll-animate-scale", "delay-5");
  }

  // Добавляем дополнительные CSS стили для плавности
  addPricesAnimationStyles();
}

function setupMainPageAnimations() {
  // Анимации для главной страницы (если нужно)
  const heroSection = document.querySelector("#hero");
  if (heroSection) {
    const heroTitle = heroSection.querySelector("h1");
    const heroText = heroSection.querySelector("p");
    const heroButtons = heroSection.querySelectorAll(".btn-17");

    if (heroTitle) heroTitle.classList.add("scroll-animate");
    if (heroText) heroText.classList.add("scroll-animate", "delay-1");
    heroButtons.forEach((btn, index) => {
      btn.classList.add("scroll-animate-scale", `delay-${index + 2}`);
    });
  }

  // Анимации для секций
  const sections = document.querySelectorAll(".section-main");
  sections.forEach((section) => {
    const title = section.querySelector("h2");
    const items = section.querySelectorAll(
      "li, .portfolio-item, .contact-form"
    );

    if (title) title.classList.add("scroll-animate");

    items.forEach((item, index) => {
      item.classList.add("scroll-animate");
      if (index < 6) item.classList.add(`delay-${index + 1}`);
    });
  });
}

function addPricesAnimationStyles() {
  // Добавляем дополнительные стили для улучшения анимаций
  const style = document.createElement("style");
  style.textContent = `
    /* МЕДЛЕННЫЕ И ПЛАВНЫЕ анимации для страницы цен */
    
    /* Заголовок страницы */
    #prices h1.scroll-animate {
      opacity: 0;
      transform: translateY(50px);
      transition: all 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    #prices h1.scroll-animate.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Блок уведомления о скидках */
    .price-notice.scroll-animate-scale {
      opacity: 0;
      transform: scale(0.85) translateY(40px);
      transition: all 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .price-notice.scroll-animate-scale.animate-in {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    
    /* Обычные карточки услуг */
    .price-card.scroll-animate {
      opacity: 0;
      transform: translateY(50px);
      transition: all 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .price-card.scroll-animate.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* ГЛАВНАЯ УСЛУГА - специальная анимация */
    .price-card.main-service.scroll-animate-scale {
      opacity: 0;
      transform: scale(0.88) translateY(40px);
      transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .price-card.main-service.scroll-animate-scale.animate-in {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    
    /* Кнопка калькулятора */
    .calculator-cta.scroll-animate-scale {
      opacity: 0;
      transform: scale(0.8) translateY(30px);
      transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .calculator-cta.scroll-animate-scale.animate-in {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    
    /* Disclaimer */
    .price-disclaimer.scroll-animate {
      opacity: 0;
      transform: translateY(40px);
      transition: all 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .price-disclaimer.scroll-animate.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* УВЕЛИЧЕННЫЕ задержки для плавного staggered эффекта */
    .delay-1 { transition-delay: 0.3s; }
    .delay-2 { transition-delay: 0.5s; }
    .delay-3 { transition-delay: 0.7s; }
    .delay-4 { transition-delay: 0.9s; }
    .delay-5 { transition-delay: 1.1s; }
    .delay-6 { transition-delay: 1.3s; }
    
    /* Специальная анимация для бесплатных услуг */
    .price-card.free-service.scroll-animate {
      opacity: 0;
      transform: translateY(50px) scale(0.92);
      transition: all 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .price-card.free-service.scroll-animate.animate-in {
      opacity: 1;
      transform: translateY(0) scale(1);
      animation: freeServiceGlow 2.0s ease-out;
    }
    
    @keyframes freeServiceGlow {
      0% { 
        opacity: 0;
        transform: translateY(50px) scale(0.92);
        box-shadow: 0 8px 25px rgba(0, 123, 255, 0.1);
      }
      25% {
        opacity: 0.5;
        transform: translateY(20px) scale(0.96);
      }
      50% {
        opacity: 0.8;
        transform: translateY(5px) scale(0.99);
      }
      75% { 
        opacity: 0.95;
        transform: translateY(-2px) scale(1.01);
        box-shadow: 0 15px 35px rgba(40, 167, 69, 0.25);
      }
      100% { 
        opacity: 1;
        transform: translateY(0) scale(1);
        box-shadow: 0 20px 40px rgba(40, 167, 69, 0.15);
      }
    }
    
    /* Улучшенная анимация для главной услуги */
    @keyframes mainServiceAppear {
      0% { 
        opacity: 0;
        transform: scale(0.88) translateY(40px);
      }
      30% {
        opacity: 0.6;
        transform: scale(0.94) translateY(15px);
      }
      60% { 
        opacity: 0.9;
        transform: scale(1.01) translateY(-2px);
      }
      100% { 
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    
    .price-card.main-service.scroll-animate-scale.animate-in {
      animation: mainServiceAppear 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    /* Bounce эффект для кнопки калькулятора */
    @keyframes bounceIn {
      0% { 
        opacity: 0;
        transform: scale(0.8) translateY(30px); 
      }
      40% { 
        opacity: 0.8;
        transform: scale(0.95) translateY(5px); 
      }
      70% { 
        opacity: 0.95;
        transform: scale(1.02) translateY(-3px); 
      }
      100% { 
        opacity: 1;
        transform: scale(1) translateY(0); 
      }
    }
    
    .calculator-cta.scroll-animate-scale.animate-in {
      animation: bounceIn 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    /* Респект к настройкам пользователя */
    @media (prefers-reduced-motion: reduce) {
      #prices h1.scroll-animate,
      .price-notice.scroll-animate-scale,
      .price-card.scroll-animate,
      .price-card.main-service.scroll-animate-scale,
      .calculator-cta.scroll-animate-scale,
      .price-disclaimer.scroll-animate {
        transition: opacity 0.6s ease !important;
        transform: none !important;
      }
      
      #prices h1.scroll-animate.animate-in,
      .price-notice.scroll-animate-scale.animate-in,
      .price-card.scroll-animate.animate-in,
      .price-card.main-service.scroll-animate-scale.animate-in,
      .calculator-cta.scroll-animate-scale.animate-in,
      .price-disclaimer.scroll-animate.animate-in {
        transform: none !important;
        animation: none !important;
      }
    }
  `;

  document.head.appendChild(style);
}
