// Сохраняем данные формы с timestamp
function saveSurveyData(formId, formData) {
    // Получаем текущие данные или создаем новый объект
    let surveyHistory = JSON.parse(localStorage.getItem('surveyHistory')) || {};
    
    // Если для этой формы нет данных, инициализируем массив
    if (!surveyHistory[formId]) {
        surveyHistory[formId] = [];
    }
    
    // Добавляем новые данные с временной меткой
    surveyHistory[formId].push({
        timestamp: new Date().toISOString(),
        data: formData
    });
    
    // Сохраняем обновленные данные
    localStorage.setItem('surveyHistory', JSON.stringify(surveyHistory));
    
    // // Визуальное подтверждение отправки
    // showSubmissionFeedback(this);
}

// Визуальная обратная связь при отправке
// function showSubmissionFeedback(form) {
//     form.style.border = '2px solid #4CAF50';
//     form.style.transition = 'border 0.3s ease';
    
//     setTimeout(() => {
//         form.style.border = '1px solid #ddd';
//     }, 2000);
// }

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

// Заполнение форм последними данными (опционально)
// function prefillForms() {
//     const surveyHistory = JSON.parse(localStorage.getItem('surveyHistory')) || {};
    
//     Object.keys(surveyHistory).forEach(category => {
//         const form = document.querySelector(`#${category} .survey-form`);
//         if (!form || !surveyHistory[category].length) return;
        
//         const lastEntry = surveyHistory[category][surveyHistory[category].length - 1].data;
        
//         Object.keys(lastEntry).forEach(field => {
//             const input = form.querySelector(`[name="${field}"]`);
//             if (input) {
//                 input.value = lastEntry[field];
//             }
//         });
//     });
// }

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    checkDataMigration(); // Миграция старых данных при необходимости
    initForms();         // Инициализация обработчиков форм
    initTabSwitching();  // Инициализация переключения вкладок
    prefillForms();      // Заполнение форм последними данными (опционально)
});