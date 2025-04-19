document.addEventListener('DOMContentLoaded', () => {
    // Элементы формы
    const elements = {
      area: document.getElementById('area'),
      tenants: document.getElementById('tenants'),
      heating: document.getElementById('heating')
    };
  
    // Кнопки редактирования
    const editButtons = {
      area: document.getElementById('edit_area'),
      tenants: document.getElementById('edit_tenants'),
      heating: document.getElementById('edit_heating')
    };
  
    // Состояние редактирования
    let isEditing = false;
    let currentEditingField = null;
  
    // Загружаем сохранённые значения
    function loadSavedValues() {
      Object.keys(elements).forEach(key => {
        const savedValue = localStorage.getItem(key);
        if (savedValue !== null && elements[key]) {
          elements[key].value = savedValue;
        }
      });
    }
  
    // Активируем поле для редактирования
    function enableEditing(field) {
      // Если уже редактируем другое поле - сохраняем его
      if (currentEditingField && currentEditingField !== field) {
        saveField(currentEditingField);
      }
  
      // Активируем новое поле
      currentEditingField = field;
      
      if (field === 'heating') {
        elements[field].disabled = false;
      } else {
        elements[field].readOnly = false;
      }
      elements[field].focus();
      isEditing = true;
    }
  
    // Сохраняем поле
    function saveField(field) {
      localStorage.setItem(field, elements[field].value);
      
      if (field === 'heating') {
        elements[field].disabled = true;
      } else {
        elements[field].readOnly = true;
      }
      
      isEditing = false;
      currentEditingField = null;
    }
  
    // Обработчики для кнопок редактирования
    Object.entries(editButtons).forEach(([field, button]) => {
      if (button && elements[field]) {
        button.addEventListener('click', () => {
          if (!isEditing || currentEditingField === field) {
            enableEditing(field);
          }
        });
      }
    });
  
    // Сохранение при потере фокуса
    Object.keys(elements).forEach(field => {
      if (elements[field]) {
        elements[field].addEventListener('blur', () => {
          if (isEditing && currentEditingField === field) {
            saveField(field);
          }
        });
      }
    });
  
    // Для селекта сохраняем также при изменении
    if (elements.heating) {
      elements.heating.addEventListener('change', () => {
        if (isEditing) {
          saveField('heating');
        }
      });
    }
  
    // Загружаем сохранённые значения при старте
    loadSavedValues();
  });