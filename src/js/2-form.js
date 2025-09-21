const STORAGE_KEY = 'feedback-form-state';

// Глобальний стан форми (вимога ТЗ)
const formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');
const emailEl = form.elements.email;
const messageEl = form.elements.message;

// 1) Відновлення стану з localStorage на старті
(function restoreState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const parsed = JSON.parse(saved) ?? {};
    formData.email = typeof parsed.email === 'string' ? parsed.email : '';
    formData.message = typeof parsed.message === 'string' ? parsed.message : '';

    emailEl.value = formData.email;
    messageEl.value = formData.message;
  } catch {
    // Якщо зіпсовані дані — ігноруємо й починаємо з порожніх
  }
})();

// 2) Делегування input на всю форму (оновлюємо лише змінене поле)
form.addEventListener('input', evt => {
  const { name, value } = evt.target;
  if (name !== 'email' && name !== 'message') return;

  // Зберігаємо в state та в localStorage без пробілів з країв
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 3) Сабміт: перевірка, лог, очищення
form.addEventListener('submit', evt => {
  evt.preventDefault();

  const current = {
    email: emailEl.value.trim(),
    message: messageEl.value.trim(),
  };

  // Оновлюємо formData, щоб відповідало актуальним значенням
  formData.email = current.email;
  formData.message = current.message;

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  // Очищаємо сховище, об’єкт і форму
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
});
