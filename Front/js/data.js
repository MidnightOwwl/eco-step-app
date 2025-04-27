import { EcoStepApi } from './api.js';

const charts = {
    main: {},
    history: {}
};

const COLORS = [
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 99, 132, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 206, 86, 0.7)'
];

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
                label: ctx => `${ctx.dataset.label}: ${ctx.raw.toFixed(2)}`
            }
        }
    },
    scales: {
        y: { 
            beginAtZero: true,
            title: { display: true, text: 'Value per day' }
        },
        x: { 
            grid: { display: false },
            title: { display: true, text: 'Categories' }
        }
    }
};

const api = new EcoStepApi();
let currentCategory = 'food';
let currentField = null;

document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        showNoData();
        return;
    }

    try {
        const surveys = await api.getSurveys(userId);
        
        if (!surveys || surveys.length === 0) {
            showNoData();
            return;
        }

        const surveyData = processSurveyData(surveys);
        initCategories(surveyData);
        setupTabSwitching();

        // Инициализация первого поля для истории
        const firstField = Object.keys(surveyData[currentCategory][0].data)
            .filter(k => k !== 'days')[0];
        updateHistoryChart(surveyData, currentCategory, firstField);

    } catch (error) {
        console.error('Error loading survey data:', error);
        showNoData();
    }
});

function showNoData() {
    document.getElementById('no-data').style.display = 'block';
    document.querySelectorAll('.chart-container').forEach(c => c.style.display = 'none');
}

function processSurveyData(surveys) {
    const result = {
        food: [],
        wastes: [],
        transport: [],
        costs: []
    };

    surveys.forEach(survey => {
        const date = new Date(survey.completedAt);
        
        if (survey.foodData) {
            if (!isEmptyCategory(survey.foodData)) {
                result.food.push({
                    timestamp: date,
                    data: {
                        meatEatenKg: survey.foodData.meatEatenKg,
                        plantEatenKg: survey.foodData.plantEatenKg,
                        days: survey.reportedDays
                    }
                });
            }
        }
        
        if (survey.wasteData) {
            if (!isEmptyCategory(survey.wasteData)) {
                result.wastes.push({
                    timestamp: date,
                    data: {
                        foodWasteKg: survey.wasteData.foodWasteKg,
                        plasticWasteKg: survey.wasteData.plasticWasteKg,
                        glassWasteKg: survey.wasteData.glassWasteKg,
                        paperWasteKg: survey.wasteData.paperWasteKg,
                        metalWasteKg: survey.wasteData.metalWasteKg,
                        otherWasteKg: survey.wasteData.otherWasteKg,
                        days: survey.reportedDays
                    }
                });
            } 
        }
        
        if (survey.transportData) {
            if (!isEmptyCategory(survey.transportData)) {
                result.transport.push({
                    timestamp: date,
                    data: {
                        publicTransportDistanceKm: survey.transportData.publicTransportDistanceKm,
                        airplaneDistanceKm: survey.transportData.airplaneDistanceKm,
                        trainDistanceKm: survey.transportData.trainDistanceKm,
                        carDistanceKmPetrol: survey.transportData.carDistanceKmPetrol,
                        carDistanceKmDiesel: survey.transportData.carDistanceKmDiesel,
                        carDistanceKmElectric: survey.transportData.carDistanceKmElectric,
                        days: survey.reportedDays
                    }
                });
            }
            
        }
        
        if (survey.resourceData) {
            if (!isEmptyCategory(survey.resourceData)) {
                result.costs.push({
                    timestamp: date,
                    data: {
                        waterConsumptionL: survey.resourceData.waterConsumptionL,
                        electricityConsumptionKWtH: survey.resourceData.electricityConsumptionKWtH,
                        days: survey.reportedDays
                    }
                });
            }
        }
    });

    return result;
}

function isEmptyCategory(categoryData) {
    let result = true;
    for (const key in categoryData) {
        if (key !== 'id' && key !== 'surveyId' && categoryData[key] !== 0)
            result = false;
    }

    return result;
}

function initCategories(surveyData) {
    Object.keys(surveyData).forEach(category => {
        if (surveyData[category].length > 0) {
            createSubcategoryButtons(surveyData, category);
            renderMainChart(category, surveyData[category]);
        }
    });
}

function createSubcategoryButtons(surveyData, category) {
    const container = document.getElementById(`${category}-chart`);
    if (!container) return;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'subcategory-buttons';
    
    Object.keys(surveyData[category][0].data)
        .filter(key => key !== 'days')
        .forEach((key, i) => {
            const btn = document.createElement('button');
            btn.className = `subcategory-btn ${i === 0 ? 'active' : ''}`;
            btn.textContent = formatLabel(key);
            btn.dataset.field = key;
            btn.addEventListener('click', () => {
                document.querySelectorAll(`#${category}-chart .subcategory-btn`).forEach(b => 
                    b.classList.remove('active'));
                btn.classList.add('active');
                updateHistoryChart(surveyData, category, key);
            });
            buttonsDiv.appendChild(btn);
        });

    const title = container.querySelector('.chart-title');
    title.insertAdjacentElement('afterend', buttonsDiv);
}

function renderMainChart(category, historyData) {
    const ctx = document.getElementById(`${category}Chart`);
    if (!ctx) return;

    if (charts.main[category]) charts.main[category].destroy();

    const latestData = historyData[historyData.length - 1];
    const { labels, values } = processChartData(latestData.data);

    // Обновляем заголовок с датой
    const dateStr = latestData.timestamp.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    document.querySelector(`#${category}-chart .chart-title`).textContent = 
        `${formatLabel(category)} (${dateStr})`;

    charts.main[category] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `Latest values per day`,
                data: values,
                backgroundColor: COLORS.slice(0, values.length),
                borderColor: COLORS.map(c => c.replace('0.7', '1')).slice(0, values.length),
                borderWidth: 1
            }]
        },
        options: CHART_CONFIG
    });
}

function updateHistoryChart(surveyData, category, field) {
    currentCategory = category;
    currentField = field;
    renderHistoryChart(surveyData, category, field);
}

function renderHistoryChart(surveyData, category, field) {
    if (!surveyData) return;

    const ctx = document.getElementById(`${category}HistoryChart`);
    if (!ctx) return;

    if (charts.history[category]) charts.history[category].destroy();

    const labels = surveyData[category].map(surInfo => 
        surInfo.timestamp.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    );

    const values = surveyData[category].map(surInfo => {
        const value = surInfo.data[field];
        const days = surInfo.data.days || 1;
        return parseFloat(value) / days;
    });

    charts.history[category] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${formatLabel(field)} per day`,
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
                    title: { display: true, text: 'Value per day' }
                },
                x: {
                    title: { display: true, text: 'Date' }
                }
            }
        }
    });
}

function setupTabSwitching() {
    document.querySelectorAll('.selector-button').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.dataset.target;
            
            document.querySelectorAll('.selector-button').forEach(btn => {
                btn.classList.remove('selector-active');
            });
            this.classList.add('selector-active');
            
            document.querySelectorAll('.chart-container').forEach(container => {
                container.classList.remove('active');
            });
            document.getElementById(`${target}-chart`).classList.add('active');
        });
    });
}

function processChartData(data) {
    const labels = [];
    const values = [];
    
    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'days') {
            labels.push(formatLabel(key));
            const normalizedValue = parseFloat(value) / (data.days || 1);
            values.push(normalizedValue || 0);
        }
    });
    
    return { labels, values };
}

function formatLabel(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .replace(/(^|\s)\S/g, l => l.toUpperCase())
        .trim();
}