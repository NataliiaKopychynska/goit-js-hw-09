import SimpleLightbox from 'simplelightbox';
const formData = { email: '', message: '' };

const form = document.querySelector('feedback-form');
const STORAGE_KEY = 'feedback-form-state';

populateForm();

form.addEventListener('input', onInputChange);
form.addEventListener('submit', onFormSubmit);

function onInputChange(event) {
  formDate[event.target.name] = event.target.value;
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
  formData = { email: '', message: '' }; // Очищаємо об'єкт formData
}

// Функція для відновлення даних із локального сховища
function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    formData = savedData; // Відновлюємо об'єкт formData

    // Заповнюємо поля форми
    for (const [key, value] of Object.entries(formData)) {
      form.elements[key].value = value || ''; // Встановлюємо значення
    }
  }
}
