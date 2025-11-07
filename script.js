// script.js (версия с реальной отправкой на сервер)
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

    // Реальная отправка на сервер
    async function sendFormData(formData) {
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Ошибка сервера');
            }

            return await response.json();
        } catch (error) {
            throw new Error('Не удалось отправить форму: ' + error.message);
        }
    }

    // Обработчик отправки формы
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim(),
                timestamp: new Date().toISOString()
            };

            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            try {
                const result = await sendFormData(formData);
                
                successMessage.style.display = 'block';
                form.reset();
                
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                
            } catch (error) {
                console.error('Ошибка:', error);
                alert(error.message);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить сообщение';
            }
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