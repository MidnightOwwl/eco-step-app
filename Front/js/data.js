// Объекты для хранения графиков
const charts = {
    main: {},      // Основные гистограммы
    history: {}    // Графики истории
};

// Цветовая палитра
const COLORS = [
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 99, 132, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 206, 86, 0.7)'
];

// Конфигурация графиков
const CHART_CONFIG = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top'
        },
        tooltip: {
            callbacks: {
                label: ctx => `${ctx.dataset.label}: ${ctx.raw}`
            }
        }
    },
    scales: {
        y: { 
            beginAtZero: true,
            title: { display: true, text: 'Value' }
        },
        x: { 
            grid: { display: false },
            title: { display: true, text: 'Categories' }
        }
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const surveyHistory = JSON.parse(localStorage.getItem('surveyHistory')) || {};
    
    if (Object.keys(surveyHistory).length === 0) {
        document.getElementById('no-data').style.display = 'block';
        return;
    }

    // Инициализация категорий
    ['food', 'wastes', 'transport', 'costs'].forEach(category => {
        if (surveyHistory[category]?.length > 0) {
            initCategory(category, surveyHistory[category]);
        }
    });

    setupTabSwitching();
});

// Инициализация категории
function initCategory(category, data) {
    renderMainChart(category, data);
}

// Рендер основной гистограммы
function renderMainChart(category, historyData) {
    const ctx = document.getElementById(`${category}Chart`);
    if (!ctx) return;

    // Удаляем старый график
    if (charts.main[category]) charts.main[category].destroy();

    const latestData = historyData[historyData.length - 1].data;
    const { labels, values } = processChartData(latestData);

    charts.main[category] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `${formatLabel(category)} (Latest)`,
                data: values,
                backgroundColor: COLORS.slice(0, values.length),
                borderColor: COLORS.map(c => c.replace('0.7', '1')).slice(0, values.length),
                borderWidth: 1
            }]
        },
        options: {
            ...CHART_CONFIG,
            onClick: (e, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const field = Object.keys(latestData).filter(k => k !== 'days')[index];
                    renderHistoryChart(category, historyData, field);
                }
            }
        }
    });
}

// Рендер графика истории
function renderHistoryChart(category, historyData, field) {
    const ctx = document.getElementById(`${category}HistoryChart`);
    if (!ctx) return;

    // Удаляем старый график
    if (charts.history[category]) charts.history[category].destroy();

    const labels = historyData.map(entry => 
        new Date(entry.timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    );
    
    const values = historyData.map(entry => parseFloat(entry.data[field]) || 0);

    charts.history[category] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${formatLabel(field)} History`,
                data: values,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            ...CHART_CONFIG,
            scales: {
                y: { 
                    beginAtZero: true,
                    title: { display: true, text: 'Value' }
                },
                x: {
                    title: { display: true, text: 'Date' }
                }
            }
        }
    });
}

// Обработка данных для графика
function processChartData(data) {
    const labels = [];
    const values = [];
    
    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'days') {
            labels.push(formatLabel(key));
            values.push(parseFloat(value) || 0);
        }
    });
    
    return { labels, values };
}

// Форматирование названий
function formatLabel(key) {
    return key
        .replace(/_/g, ' ')
        .replace(/(^|\s)\S/g, l => l.toUpperCase())
        .replace('Wates', 'Waste')
        .replace('Non Recyclable', 'Non-Recyclable');
}

// Настройка переключения вкладок
function setupTabSwitching() {
    document.querySelectorAll('.selector-button').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.dataset.target;
            
            // Обновляем активные кнопки
            document.querySelectorAll('.selector-button').forEach(btn => {
                btn.classList.remove('selector-active');
            });
            this.classList.add('selector-active');
            
            // Показываем соответствующий график
            document.querySelectorAll('.chart-container').forEach(container => {
                container.classList.remove('active');
            });
            document.getElementById(`${target}-chart`).classList.add('active');
        });
    });
}