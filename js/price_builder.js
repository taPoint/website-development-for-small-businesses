document.addEventListener("DOMContentLoaded", function () {
  // Инициализация корзины
  let cart = {
    items: [],
    siteTotal: 0,
    servicesTotal: 0,
    minTotal: 0,
    maxTotal: 0,
  };

  let floatingCartBtn;

  const singleAddItems = [
    "Шапка сайта",
    "Подвал сайта",
    "Блок каталога",
    "Размещение сайта",
    "Форма обратной связи",
    "Telegram-бот",
    "Адаптация под мобильные",
    "Админ-панель",
    "Добавление корзины",
    "Функция управления меню/каталогом товаров",
    "Функция управления часами работы",
    "Функция онлайн оплаты и/или онлайн-заказов",
    "Другая функция",
    "Добавление Google-карты",
    "Электронная визитка с QR-кодом",
  ];

  // Элементы DOM
  const cartItemsEl = document.querySelector(".cart-items");
  const siteTotalEl = document.querySelector(".site-total");
  const servicesTotalEl = document.querySelector(".services-total");
  const grandTotalEl = document.querySelector(".grand-total");
  const emptyCartEl = document.querySelector(".empty-cart");
  const checkoutBtn = document.querySelector(".checkout-btn");

  // Категории для разделения стоимости
  const siteParts = [
    "Шапка сайта",
    "Подвал сайта",
    "Смысловой блок",
    "Админ-панель",
    "Блок каталога",
    "Адаптация под мобильные",
  ];

  const services = ["Карточки товаров"];

  // Диапазоны цен для элементов
  const priceRanges = {
    "Смысловой блок": { min: 200, max: 300 },
    "Добавление корзины": { min: 200, max: 350 },
    "Функция управления меню/каталогом товаров": { min: 200, max: 350 },
    "Функция управления часами работы": { min: 200, max: 350 },
    "Функция онлайн оплаты и/или онлайн-заказов": { min: 200, max: 350 },
    "Другая функция": { min: 200, max: 350 },
  };

  // Функция обновления кнопок
  function updateAddButtons() {
    document.querySelectorAll(".add-btn").forEach((btn) => {
      const optionSelect = btn.parentElement.querySelector(".item-option");
      let itemName = btn.getAttribute("data-item");

      if (optionSelect) {
        itemName =
          optionSelect.options[optionSelect.selectedIndex].text.split(" (")[0];
      }

      if (singleAddItems.includes(itemName)) {
        const isInCart = cart.items.some((item) => item.name === itemName);
        btn.textContent = isInCart ? "Добавлено" : "Добавить";
        btn.classList.toggle("added", isInCart);
        btn.disabled = isInCart;
      }
    });
  }

  // Функция обновления плавающей корзины
  function updateFloatingCart() {
    if (!floatingCartBtn) {
      floatingCartBtn = document.createElement("div");
      floatingCartBtn.className = "cart-floating";
      floatingCartBtn.innerHTML = `
        <div class="cart-icon">
          <i class="fas fa-cart-plus"></i>
          <span class="cart-badge">${cart.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          )}</span>
        </div>
      `;
      document.body.appendChild(floatingCartBtn);

      floatingCartBtn.addEventListener("click", function () {
        document.querySelector(".cart-overlay").classList.add("open");
        document.querySelector(".builder-sidebar").classList.add("open");
      });
    } else {
      const badge = floatingCartBtn.querySelector(".cart-badge");
      if (badge) {
        const totalItems = cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? "flex" : "none";
      }

      // Анимация
      const icon = floatingCartBtn.querySelector(".cart-icon");
      if (icon && cart.items.length > 0) {
        icon.classList.add("bounce");
        setTimeout(() => {
          icon.classList.remove("bounce");
        }, 1000);
      }
    }
  }

  // Обработчики для кнопок добавления
  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      let itemName = this.getAttribute("data-item");
      let itemPrice = parseFloat(this.getAttribute("data-price"));

      // Для элементов с выбором опции (функции сайта)
      const optionSelect = this.parentElement.querySelector(".item-option");
      if (optionSelect) {
        itemName =
          optionSelect.options[optionSelect.selectedIndex].text.split(" (")[0];
        itemPrice = priceRanges[itemName] ? priceRanges[itemName].min : 200;
      }

      // Для элементов с количеством (карточки товаров)
      const quantityInput = this.parentElement.querySelector(".quantity-input");
      let quantity = 1;
      if (quantityInput) {
        quantity = parseInt(quantityInput.value);
      }

      addToCart(itemName, itemPrice, quantity);
    });
  });

  // Обработчики закрытия корзины
  document.querySelector(".cart-close").addEventListener("click", function () {
    document.querySelector(".cart-overlay").classList.remove("open");
    document.querySelector(".builder-sidebar").classList.remove("open");
  });

  document
    .querySelector(".cart-overlay")
    .addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("open");
        document.querySelector(".builder-sidebar").classList.remove("open");
      }
    });

  // Функция добавления в корзину
  function addToCart(name, price, quantity = 1) {
    // Для элементов с диапазоном цен используем минимальную цену для расчетов
    if (priceRanges[name]) {
      price = priceRanges[name].min;
    }

    // Проверяем, можно ли добавлять этот элемент только один раз
    if (singleAddItems.includes(name)) {
      if (cart.items.some((item) => item.name === name)) {
        alert("Этот элемент можно добавить только один раз");
        return;
      }
      quantity = 1;
    }

    const existingItem = cart.items.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.price * existingItem.quantity;
    } else {
      cart.items.push({
        name,
        price,
        quantity,
        total: price * quantity,
      });
    }

    updateCart();
  }

  // Функция обновления корзины
  function updateCart() {
    // Очищаем корзину
    cartItemsEl.innerHTML = "";
    cart.siteTotal = 0;
    cart.servicesTotal = 0;
    cart.minTotal = 0;
    cart.maxTotal = 0;

    // Добавляем товары
    cart.items.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.setAttribute("data-item", item.name);

      // Для элементов с диапазоном цен показываем диапазон
      let priceDisplay = `${item.total}₽`;
      if (priceRanges[item.name]) {
        const range = priceRanges[item.name];
        priceDisplay = `${range.min * item.quantity}-${
          range.max * item.quantity
        }₽`;
      }

      // Показываем кнопки +/- только для карточек товаров и смысловых блоков
      let quantityControls = "";
      if (item.name === "Карточки товаров" || item.name === "Смысловой блок") {
        quantityControls = `
          <div class="cart-item-quantity">
            <button class="cart-item-decrease">-</button>
            <span class="cart-item-count">${item.quantity}</span>
            <button class="cart-item-increase">+</button>
          </div>
        `;
      } else {
        quantityControls = `<span class="cart-item-count">${item.quantity}</span>`;
      }

      itemEl.innerHTML = `
        <span class="cart-item-name">${item.name}</span>
        ${quantityControls}
        <span class="cart-item-price">${priceDisplay}</span>
        <span class="cart-item-remove"><i class="fas fa-times"></i></span>
      `;

      // Определяем категорию (ТОЛЬКО карточки товаров идут в услуги)
      if (services.includes(item.name)) {
        cart.servicesTotal += item.total;
      } else {
        cart.siteTotal += item.total;
      }

      // Обработчики для управления количеством
      if (item.name === "Карточки товаров" || item.name === "Смысловой блок") {
        itemEl
          .querySelector(".cart-item-decrease")
          .addEventListener("click", () => {
            updateCartItemQuantity(item.name, -1);
          });

        itemEl
          .querySelector(".cart-item-increase")
          .addEventListener("click", () => {
            updateCartItemQuantity(item.name, 1);
          });
      }

      // Обработчик удаления
      itemEl
        .querySelector(".cart-item-remove")
        .addEventListener("click", () => {
          removeFromCart(item.name);
        });

      cartItemsEl.appendChild(itemEl);
    });

    // Рассчитываем итоговую стоимость с учетом диапазонов цен
    cart.minTotal = cart.siteTotal + cart.servicesTotal;
    cart.maxTotal = cart.minTotal;

    // Добавляем диапазоны для соответствующих элементов
    for (const [name, range] of Object.entries(priceRanges)) {
      const items = cart.items.filter((item) => item.name === name);
      if (items.length > 0) {
        const count = items.reduce((sum, item) => sum + item.quantity, 0);

        // Вычитаем сумму элементов (по минимальной цене)
        cart.minTotal -= items.reduce((sum, item) => sum + item.total, 0);
        cart.maxTotal = cart.minTotal;

        // Добавляем диапазон
        cart.minTotal += count * range.min;
        cart.maxTotal += count * range.max;
      }
    }

    // Обновляем стоимость сайта с учетом диапазонов
    let siteMinTotal = cart.siteTotal;
    let siteMaxTotal = cart.siteTotal;

    for (const [name, range] of Object.entries(priceRanges)) {
      if (siteParts.includes(name)) {
        const items = cart.items.filter((item) => item.name === name);
        if (items.length > 0) {
          const count = items.reduce((sum, item) => sum + item.quantity, 0);

          siteMinTotal -= items.reduce((sum, item) => sum + item.total, 0);
          siteMaxTotal = siteMinTotal;

          siteMinTotal += count * range.min;
          siteMaxTotal += count * range.max;
        }
      }
    }

    siteTotalEl.textContent =
      siteMinTotal === siteMaxTotal
        ? `${siteMinTotal}₽`
        : `${siteMinTotal}-${siteMaxTotal}₽`;

    // Обновляем стоимость услуг (только карточки товаров)
    servicesTotalEl.textContent = `${cart.servicesTotal}₽`;

    // Обновляем итоговую стоимость
    grandTotalEl.textContent =
      cart.minTotal === cart.maxTotal
        ? `${cart.minTotal}₽`
        : `${cart.minTotal}-${cart.maxTotal}₽`;

    // Показываем/скрываем сообщение о пустой корзине
    emptyCartEl.style.display = cart.items.length ? "none" : "block";

    updateAddButtons();
    updateFloatingCart();
  }

  // Функция изменения количества товара в корзине
  function updateCartItemQuantity(name, change) {
    const item = cart.items.find((item) => item.name === name);
    if (!item) return;

    // Для singleAddItems запрещаем изменение количества
    if (singleAddItems.includes(name)) return;

    const newQuantity = item.quantity + change;

    if (newQuantity < 1) {
      removeFromCart(name);
      return;
    }

    item.quantity = newQuantity;
    item.total = item.price * item.quantity;
    updateCart();
  }

  // Функция удаления из корзины
  function removeFromCart(name) {
    cart.items = cart.items.filter((item) => item.name !== name);
    updateCart();
  }

  // Обработчик оформления заказа
  checkoutBtn.addEventListener("click", function () {
    if (cart.items.length === 0) {
      alert("Корзина пуста! Добавьте элементы сайта.");
      return;
    }

    const totalText =
      cart.minTotal === cart.maxTotal
        ? `${cart.minTotal}₽`
        : `${cart.minTotal}-${cart.maxTotal}₽`;

    alert(`Заказ оформлен! Итоговая стоимость: ${totalText}`);
    cart.items = [];
    updateCart();
  });

  // Инициализация плавающей корзины
  updateFloatingCart();
});
