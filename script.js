// script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = form.querySelector('.submit-btn');

    // Функция валидации email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Сброс ошибок
    function resetErrors() {
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        messageError.style.display = 'none';
        nameInput.style.borderColor = '#ddd';
        emailInput.style.borderColor = '#ddd';
        messageInput.style.borderColor = '#ddd';
    }

    // Показать ошибку
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.style.borderColor = '#e74c3c';
    }

    // Функция вывода введенных данных внизу
    function displayFormData(formData) {
        // Создаем или находим блок для вывода данных
        let outputDiv = document.getElementById('formDataOutput');
        
        if (!outputDiv) {
            outputDiv = document.createElement('div');
            outputDiv.id = 'formDataOutput';
            outputDiv.style.cssText = `
                margin-top: 20px;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 5px;
                background-color: #f9f9f9;
            `;
            // Вставляем блок после формы
            form.parentNode.insertBefore(outputDiv, form.nextSibling);
        }

        // Заполняем данными
        outputDiv.innerHTML = `
            <h3>Введенные данные:</h3>
            <p><strong>Имя:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Сообщение:</strong> ${formData.message}</p>
        `;
    }

    // Валидация формы
    function validateForm() {
        let isValid = true;
        resetErrors();

        if (!nameInput.value.trim()) {
            showError(nameInput, nameError, 'Пожалуйста, введите ваше имя');
            isValid = false;
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, emailError, 'Пожалуйста, введите ваш email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Пожалуйста, введите корректный email');
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, messageError, 'Пожалуйста, введите ваше сообщение');
            isValid = false;
        }

        return isValid;
    }

    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            };

            // Выводим данные внизу
            displayFormData(formData);

            // Показываем сообщение об успехе
            successMessage.style.display = 'block';
            
            // Очищаем форму
            form.reset();
            
            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });

    // Сброс ошибок при вводе
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim()) {
            nameError.style.display = 'none';
            nameInput.style.borderColor = '#ddd';
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() && isValidEmail(emailInput.value.trim())) {
            emailError.style.display = 'none';
            emailInput.style.borderColor = '#ddd';
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim()) {
            messageError.style.display = 'none';
            messageInput.style.borderColor = '#ddd';
        }
    });
});
