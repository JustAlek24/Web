/**
 * Основной скрипт для всех страниц социальной сети OkAk
 * Включает:
 * - Эффекты для кнопок
 * - Валидацию форм
 * - Всплывающие сообщения
 * - Обработчики событий
 */

// Глобальная переменная для хранения состояния "особого котика"
let isSpecialCatActive = false;

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
    // ОБРАБОТЧИКИ ДЛЯ СТРАНИЦЫ С КОТИКОМ (first_page.html)
    // =============================================
    
    // Проверка и установка особого котика
    const catImg = document.querySelector('.cat-image');
    if (catImg && sessionStorage.getItem('specialCat') === 'true') {
        activateSpecialCat(catImg);
    }

    // Кнопка "Погладить котика"
    const catButton = document.getElementById('catButton');
    if (catButton) {
        catButton.addEventListener('click', function() {
            const message = isSpecialCatActive ? 
                'Муррр! Секретный Чмоня доволен!' : 
                'Мур-мур! Спасибо за поглаживания!';
            showLazyMessage(message);
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

// Активация особого котика
function activateSpecialCat(catImg) {
    isSpecialCatActive = true;
    catImg.src = 'images/chmonya-special.jpg';
    catImg.alt = 'Особенный Чмоня';
    catImg.classList.add('special-cat');
    
    // Добавляем анимацию
    catImg.style.transition = 'all 0.5s ease';
    catImg.style.transform = 'scale(1.05)';
    catImg.style.boxShadow = '0 0 20px rgba(106, 17, 203, 0.7)';
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
    } else if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Сообщение слишком короткое (минимум 10 символов)';
        isValid = false;
    }

    // Если все правильно
    if (isValid) {
        // Проверка на особое имя
        if (name.toLowerCase() === 'чмоня') {
            sessionStorage.setItem('specialCat', 'true');
            
            // Если мы на странице с котиком, сразу активируем
            const catImg = document.querySelector('.cat-image');
            if (catImg) {
                activateSpecialCat(catImg);
            }
        }

        // Показываем сообщение об успехе
        document.getElementById('successMessage').innerHTML = `
            <div class="alert alert-success">
                <h5 class="alert-heading">Спасибо, ${name}!</h5>
                <p>Ваше сообщение успешно отправлено.</p>
                ${name.toLowerCase() === 'чмоня' ? 
                  '<p class="text-warning">Секретный режим активирован!</p>' : ''}
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

if (localStorage.getItem('specialCat') === 'true') {
    const catImg = document.querySelector('.cat-image');
    if (catImg) {
        // Анимация перехода
        catImg.style.opacity = '0';
        setTimeout(() => {
            catImg.src = 'chmonya_secret.jpg';
            catImg.style.opacity = '1';
            catImg.classList.add('changed');
        }, 500);
    }
}
