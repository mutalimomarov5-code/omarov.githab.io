document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Валидация
    let isValid = true;
    
    // Проверка имени
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }
    
    // Проверка email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }
    
    // Проверка сообщения
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('messageError').style.display = 'none';
    }
    
    if (isValid) {
        // Отправка данных на сервер
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        // Имитация отправки
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('feedbackForm').reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить сообщение';
        }, 2000);
    }
            const form = document.getElementById('feedbackForm');
            const successMessage = document.getElementById('successMessage');
            
            // Скрываем сообщение об успехе при загрузке
            successMessage.style.display = 'none';
            
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Сбрасываем предыдущие ошибки
                resetErrors();
                
                // Проверяем валидность формы
                if (validateForm()) {
                    // Показываем сообщение об успехе
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                    
                    // Очищаем форму
                    form.reset();
                    
                    // Скрываем сообщение через 5 секунд
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            });
            
            // Функция сброса ошибок
            function resetErrors() {
                const errorElements = document.querySelectorAll('.error');
                errorElements.forEach(function(error) {
                    error.style.display = 'none';
                });
                
                const inputs = document.querySelectorAll('input, textarea, select');
                inputs.forEach(function(input) {
                    input.style.borderColor = '#ddd';
                });
            }
            
            // Функция валидации формы
            function validateForm() {
                let isValid = true;
                
                // Проверка имени
                const name = document.getElementById('name').value.trim();
                if (name === '') {
                    showError('nameError', 'name');
                    isValid = false;
                }
                
                // Проверка email
                const email = document.getElementById('email').value.trim();
                if (email === '') {
                    showError('emailError', 'email');
                    isValid = false;
                } else if (!isValidEmail(email)) {
                    showError('emailError', 'email', 'Пожалуйста, введите корректный email адрес');
                    isValid = false;
                }
                
                // Проверка темы
                const subject = document.getElementById('subject').value;
                if (subject === '') {
                    showError('subjectError', 'subject');
                    isValid = false;
                }
                
                // Проверка сообщения
                const message = document.getElementById('message').value.trim();
                if (message === '') {
                    showError('messageError', 'message');
                    isValid = false;
                }
                
                return isValid;
            }
            
            // Функция проверки email
            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }
            
            // Функция показа ошибки
            function showError(errorId, fieldId, customMessage = null) {
                const errorElement = document.getElementById(errorId);
                const fieldElement = document.getElementById(fieldId);
                
                if (errorElement && fieldElement) {
                    if (customMessage) {
                        errorElement.textContent = customMessage;
                    }
                    errorElement.style.display = 'block';
                    fieldElement.style.borderColor = '#e74c3c';
                }
            }
            
            // Реальная валидация при вводе
            const fields = ['name', 'email', 'subject', 'message'];
            fields.forEach(function(fieldId) {
                const field = document.getElementById(fieldId);
                if (field) {
                    field.addEventListener('input', function() {
                        const errorElement = document.getElementById(fieldId + 'Error');
                        if (errorElement) {
                            errorElement.style.display = 'none';
                            field.style.borderColor = '#ddd';
                        }
                    });
                    
                    // Для select элемента
                    if (field.tagName === 'SELECT') {
                        field.addEventListener('change', function() {
                            const errorElement = document.getElementById(fieldId + 'Error');
                            if (errorElement) {
                                errorElement.style.display = 'none';
                                field.style.borderColor = '#ddd';
                            }
                        });
                    }
                }
            });
        });
