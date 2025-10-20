document.addEventListener('DOMContentLoaded', function () {
  const typeSelect = document.getElementById('type');
  const quantityInput = document.getElementById('quantity');
  const optionsDiv = document.getElementById('options');
  const propertiesDiv = document.getElementById('properties');
  const priceDiv = document.getElementById('price');

  // Цены
  const PRICES = {
    base: [100, 200, 300],
    options: { option1: 10, option2: 14, option3: 88 },
    properties: { prop1: 133, prop2: 7 }
  };

  // Обновление отображения опций/свойств
  function toggleOptions() {
    const type = typeSelect.value;

    optionsDiv.style.display = 'none';
    propertiesDiv.style.display = 'none';

    if (type === '2') {
      optionsDiv.style.display = 'block';
    } else if (type === '3') {
      propertiesDiv.style.display = 'block';
    }

    calculatePrice();
  }

  // Расчёт итоговой стоимости
  function calculatePrice() {
    const type = parseInt(typeSelect.value); // 1, 2 или 3
    const quantity = parseInt(quantityInput.value) || 1;
    let total = PRICES.base[type - 1];

    // Добавляем опцию (только для типа 2)
    if (type === 2) {
      const selectedOption = document.querySelector('input[name="option"]:checked');
      if (selectedOption) {
        total += PRICES.options[selectedOption.value] || 0;
      }
    }

    // Добавляем свойства (только для типа 3)
    if (type === 3) {
      const checkedProps = document.querySelectorAll('input[name="property"]:checked');
      checkedProps.forEach(checkbox => {
        total += PRICES.properties[checkbox.value] || 0;
      });
    }

    priceDiv.textContent = `Стоимость: ${total * quantity} ₽`;
  }

  // Подписка на события
  typeSelect.addEventListener('change', toggleOptions);
  quantityInput.addEventListener('input', calculatePrice);
  document.querySelectorAll('input[name="option"]').forEach(el => {
    el.addEventListener('change', calculatePrice);
  });
  document.querySelectorAll('input[name="property"]').forEach(el => {
    el.addEventListener('change', calculatePrice);
  });

  // Инициализация
  toggleOptions();
});