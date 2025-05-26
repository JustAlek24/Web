/**
 * Основной скрипт для всех страниц социальной сети OkAk
 * Включает:
 * - Эффекты для кнопок
 * - Валидацию форм
 * - Всплывающие сообщения
 * - Обработчики событий
 */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // ОБЩИЕ ЭФФЕКТЫ ДЛЯ ВСЕХ СТРАНИЦ
    // =============================================
    
    // Эффекты при наведении на все кнопки
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        // Эффект при наведении
        btn.addEventListener('mouseover', () => {
            btn.classList.add('bg-dark', 'shadow-sm');
        });
        
        // Возврат к исходному состоянию
        btn.addEventListener('mouseout', () => {
            btn.classList.remove('bg-dark', 'shadow-sm');
        });
        
        // Эффект при нажатии
        btn.addEventListener('mousedown', () => {
            btn.classList.add('shadow-inner');
        });
        
        btn.addEventListener('mouseup', () => {
            btn.classList.remove('shadow-inner');
        });
    });

    // =============================================
    // ОБРАБОТЧИКИ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ (index.html)
    // =============================================
    
    // Кнопка "Я кнопочка"
    const mainButton = document.getElementById('mainButton');
    if (mainButton) {
        mainButton.addEventListener('click', function() {
            showLazyMessage('Я такая же ленивая, как и мой создатель');
        });
    }

    // =============================================
    // ОБРАБОТЧИКИ ДЛЯ СТРАНИЦЫ С КОТИКОМ (first_page.html)
    // =============================================
    
    // Кнопка "Погладить котика"
    const catButton = document.getElementById('catButton');
    if (catButton) {
        catButton.addEventListener('click', function() {
            showLazyMessage('Мур-мур! Спасибо за поглаживания!');
        });
    }

    // =============================================
    // ОБРАБОТЧИКИ ДЛЯ ФОРМЫ ОБРАТНОЙ СВЯЗИ (feedback.html)
    // =============================================
    
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateFeedbackForm();
        });
    }
});

// =============================================
// ОБЩИЕ ФУНКЦИИ
// =============================================

/**
 * Показывает всплывающее сообщение
 * @param {string} message - Текст сообщения
 * @param {number} [duration=3000] - Время показа в миллисекундах
 */
function showLazyMessage(message, duration = 3000) {
    const messageElement = document.getElementById('lazyMessage');
    
    // Если элемент существует
    if (messageElement) {
        // Обновляем текст сообщения
        const textElement = messageElement.querySelector('span');
        if (textElement) {
            textElement.textContent = message;
        }
        
        // Показываем сообщение
        messageElement.classList.add('show');
        
        // Скрываем через указанное время
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, duration);
    }
}

/**
 * Валидация формы обратной связи
 */
function validateFeedbackForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    // Очистка предыдущих ошибок
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.getElementById('successMessage').innerHTML = '';

    // Валидация имени
    if (!name) {
        document.getElementById('nameError').textContent = 'Пожалуйста, введите ваше имя';
        isValid = false;
    } else if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Имя слишком короткое';
        isValid = false;
    }

    // Валидация email
    if (!email) {
        document.getElementById('emailError').textContent = 'Пожалуйста, введите email';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Введите корректный email';
        isValid = false;
    }

    // Валидация сообщения
    if (!message) {
        document.getElementById('messageError').textContent = 'Пожалуйста, введите ваше сообщение';
        isValid = false;
    } else if (message.length < 0) {
        document.getElementById('messageError').textContent = 'Сообщение слишком короткое (минимум 10 символов)';
        isValid = false;
    }

    // Если все правильно
    if (isValid) {
        // Показываем сообщение об успехе
        document.getElementById('successMessage').innerHTML = `
            <div class="alert alert-success">
                <h5 class="alert-heading">Спасибо, ${name}!</h5>
                <p>Ваше сообщение успешно отправлено. Мы ответим вам на email: <strong>${email}</strong></p>
                <hr>
                <p class="mb-0">Ваше сообщение: "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"</p>
            </div>
        `;
        
        // Сбрасываем форму
        document.getElementById('feedbackForm').reset();
        
        // Прокручиваем к сообщению
        document.getElementById('successMessage').scrollIntoView({
            behavior: 'smooth'
        });
    }
}

/**
 * Инициализация всех tooltip'ов на странице
 */
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Инициализация tooltip'ов при загрузке страницы
if (typeof bootstrap !== 'undefined') {
    initTooltips();
}
