import SimpleLightbox from 'simplelightbox';

const formData = { email: '', message: '' };
const form = document.querySelector('.feedback-form'); // Переконайтеся, що це правильно
const STORAGE_KEY = 'feedback-form-state';

populateForm();

form.addEventListener('input', onInputChange);
form.addEventListener('submit', onFormSubmit);

function onInputChange(event) {
  formData[event.target.name] = event.target.value; // Правильно
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  // Перевірка, чи всі поля заповнені
  if (!formData.email || !formData.message) {
    alert('Fill please all fields'); // Сповіщення про незаповнені поля
    return;
  }

  console.log('Submitted data:', formData);

  // Очищуємо все після успішної відправки
  localStorage.removeItem(STORAGE_KEY); // Очищаємо сховище
  form.reset(); // Скидаємо поля форми
  formData.email = ''; // Очищаємо email
  formData.message = ''; // Очищаємо message
}

// Функція для відновлення даних із локального сховища
function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    for (const [key, value] of Object.entries(savedData)) {
      formData[key] = value; // Відновлюємо об'єкт formData
      form.elements[key].value = value || ''; // Встановлюємо значення
    }
  }
}
