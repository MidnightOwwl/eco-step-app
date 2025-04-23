// Сохраняем данные формы с timestamp
function saveSurveyData(formId, formData) {
    let surveyHistory = JSON.parse(localStorage.getItem('surveyHistory')) || {};
    
    if (!surveyHistory[formId]) {
        surveyHistory[formId] = [];
    }
    
    surveyHistory[formId].push({
        timestamp: new Date().toISOString(),
        data: formData
    });

    localStorage.setItem('surveyHistory', JSON.stringify(surveyHistory));
}

// Инициализация всех форм
function initForms() {
    document.querySelectorAll('.survey-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Собираем данные формы
            const formData = {};
            const inputs = this.querySelectorAll('input, select');
            
            inputs.forEach(input => {
                formData[input.name] = input.value;
            });
            
            // Сохраняем данные
            const formId = this.closest('.survey-block').id;
            saveSurveyData(formId, formData);
            
            // Сбрасываем форму
            this.reset();
        });
    });
}

// Инициализация переключения вкладок
function initTabSwitching() {
    document.querySelectorAll('.selector-button').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Обновляем активные кнопки
            document.querySelectorAll('.selector-button').forEach(btn => {
                btn.classList.remove('selector-active');
            });
            this.classList.add('selector-active');
            
            // Показываем соответствующую форму
            document.querySelectorAll('.survey-block').forEach(block => {
                block.classList.remove('survey-active');
            });
            document.getElementById(targetId).classList.add('survey-active');
        });
    });
}

// Проверка и миграция старых данных (если нужно)
function checkDataMigration() {
    const oldData = JSON.parse(localStorage.getItem('surveys'));
    if (oldData && !localStorage.getItem('surveyHistory')) {
        const newData = {};
        Object.keys(oldData).forEach(category => {
            if (oldData[category]) {
                newData[category] = [{
                    timestamp: new Date().toISOString(),
                    data: oldData[category]
                }];
            }
        });
        localStorage.setItem('surveyHistory', JSON.stringify(newData));
        localStorage.removeItem('surveys');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    checkDataMigration(); // Миграция старых данных при необходимости
    initForms();         // Инициализация обработчиков форм
    initTabSwitching();  // Инициализация переключения вкладок
    prefillForms();      // Заполнение форм последними данными (опционально)
});