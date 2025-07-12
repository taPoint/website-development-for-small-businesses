document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    let cart = {
      items: [],
      siteTotal: 0,
      servicesTotal: 0,
      grandTotal: 0
    };
  
    // Элементы DOM
    const cartItemsEl = document.querySelector('.cart-items');
    const siteTotalEl = document.querySelector('.site-total');
    const servicesTotalEl = document.querySelector('.services-total');
    const grandTotalEl = document.querySelector('.grand-total');
    const emptyCartEl = document.querySelector('.empty-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');
  
    // Категории для разделения стоимости
    const siteParts = [
      'Шапка сайта', 'Подвал сайта', 'Смысловой блок', 
      'Админ-панель', 'Дополнительная функция', 'Блок каталога',
      'Карточки товаров', 'Адаптация под мобильные'
    ];
  
    const services = [
      'Размещение сайта', 'Telegram-бот', 'Форма обратной связи'
    ];
  
    // Обработчики для кнопок добавления
    document.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const itemName = this.getAttribute('data-item');
        let itemPrice = parseFloat(this.getAttribute('data-price'));
        
        // Для элементов с выбором опции
        const optionSelect = this.parentElement.querySelector('.item-option');
        if (optionSelect) {
          itemPrice = parseFloat(optionSelect.value);
        }
        
        // Для элементов с количеством
        const quantityInput = this.parentElement.querySelector('.quantity-input');
        let quantity = 1;
        if (quantityInput) {
          quantity = parseInt(quantityInput.value);
          this.setAttribute('data-quantity', quantity);
        }
        
        addToCart(itemName, itemPrice, quantity);
      });
    });
  
    // Обработчики для управления количеством
    document.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('.quantity-input');
        let value = parseInt(input.value);
        
        if (this.classList.contains('plus')) {
          input.value = value + 1;
        } else if (this.classList.contains('minus') && value > 1) {
          input.value = value - 1;
        }
      });
    });
  
    // Функция добавления в корзину
    function addToCart(name, price, quantity = 1) {
      // Проверяем, есть ли уже такой товар в корзине
      const existingItem = cart.items.find(item => item.name === name);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total = existingItem.price * existingItem.quantity;
      } else {
        cart.items.push({
          name,
          price,
          quantity,
          total: price * quantity
        });
      }
      
      updateCart();
    }
  
    // Функция обновления корзины
    function updateCart() {
      // Очищаем корзину
      cartItemsEl.innerHTML = '';
      cart.siteTotal = 0;
      cart.servicesTotal = 0;
      
      // Добавляем товары
      cart.items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
          <span class="cart-item-name">${item.name} ×${item.quantity}</span>
          <span class="cart-item-price">${item.total}₽</span>
          <span class="cart-item-remove"><i class="fas fa-times"></i></span>
        `;
        
        // Определяем категорию и добавляем к соответствующей сумме
        if (siteParts.includes(item.name)) {
          cart.siteTotal += item.total;
        } else if (services.includes(item.name)) {
          cart.servicesTotal += item.total;
        }
        
        // Обработчик удаления
        itemEl.querySelector('.cart-item-remove').addEventListener('click', () => {
          removeFromCart(item.name);
        });
        
        cartItemsEl.appendChild(itemEl);
      });
      
      // Обновляем итоги
      cart.grandTotal = cart.siteTotal + cart.servicesTotal;
      siteTotalEl.textContent = `${cart.siteTotal}₽`;
      servicesTotalEl.textContent = `${cart.servicesTotal}₽`;
      grandTotalEl.textContent = `${cart.grandTotal}₽`;
      
      // Показываем/скрываем сообщение о пустой корзине
      emptyCartEl.style.display = cart.items.length ? 'none' : 'block';
    }
  
    // Функция удаления из корзины
    function removeFromCart(name) {
      cart.items = cart.items.filter(item => item.name !== name);
      updateCart();
    }
  
    // Обработчик оформления заказа
    checkoutBtn.addEventListener('click', function() {
      if (cart.items.length === 0) {
        alert('Корзина пуста! Добавьте элементы сайта.');
        return;
      }
      
      // Здесь можно добавить логику отправки заказа
      alert(`Заказ оформлен! Итоговая стоимость: ${cart.grandTotal}₽`);
      
      // Очищаем корзину после оформления
      cart.items = [];
      updateCart();
    });
  });