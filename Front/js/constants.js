export const MaxValues = {
    food: {
        meatEaten: 9.1,
        plantEaten: 22.9
    },
    wastes: {
        foodWaste: 10.58,
        otherWaste: 7.05,
        plasticWaste: 3.53,
        glassWaste: 1.76,
        paperWaste: 1.76,
        metalWaste: 1.76
    },
    transport: {
        carPetrol: 17.4,
        carDisesel: 19.9,
        carElectric: 67.7,
        carHybrid: 33.6,
        carHydrogen: 67.7,
        carMethane: 26.1,
        carPropane: 26.1,
        publicTransport: 32.3,
        airplane: 17.4,
        train: 82.6
    },
    costs: {
        waterConsumption: 140,
        electricityConsumption: 10
    }
}


// function initCharts(surveyData) {
//     if (surveyData.length > 0) {
//         createCategoryButtons(surveyData);
//         updateHomeChart(Object.keys(surveyData)[0], surveyData[0]);
//     } else {
//         return;
//     }
// }

// function createCategoryButtons(surveyData) {
//     const container = document.getElementById(`homeChart`);
//     if (!container) return;

//     const buttonsDiv = document.createElement('div');
//     buttonsDiv.className = 'category-buttons';
//     const title = container.querySelector('.chart-title');

//     Object.keys(surveyData)
//     .forEach((key, i) => {
//         const btn = document.createElement('button');
//         btn.className = `category-btn ${i === 0 ? 'active' : ''}`;
//         btn.textContent = formatLabel(key);
//         btn.dataset.field = key;
//         btn.addEventListener('click', () => {
//             title.textContent = key.toUpperCase();
//             document.querySelectorAll(`#homeChart .category-btn`).forEach(b => 
//                 b.classList.remove('active'));
//             btn.classList.add('active');
//             updateHomeChart(key, surveyData);
//         });
//         buttonsDiv.appendChild(btn);
//     });

//     title.insertAdjacentElement('afterend', buttonsDiv);
// }


// function updateHomeChart(category, historyData) {
//     const ctx = document.getElementById(`homeChart`);
//     if (!ctx) return;

//     if (charts.main[category]) charts.main[category].destroy();

//     const latestData = historyData[historyData.length - 1];
//     const { labels, values } = processChartData(latestData.data);

//     // Обновляем заголовок с датой
//     const dateStr = latestData.timestamp.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//     });
//     document.querySelector(`#${category}-chart .chart-title`).textContent = 
//         `${formatLabel(category)} (${dateStr})`;

//     charts.main[category] = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: `Latest values per day`,
//                 data: values,
//                 backgroundColor: COLORS.slice(0, values.length),
//                 borderColor: COLORS.map(c => c.replace('0.7', '1')).slice(0, values.length),
//                 borderWidth: 1
//             }]
//         },
//         options: CHART_CONFIG
//     });
// }

// function processChartData(data) {
//     const labels = [];
//     const values = [];
    
//     Object.entries(data).forEach(([key, value]) => {
//         if (key !== 'days') {
//             labels.push(formatLabel(key));
//             const normalizedValue = parseFloat(value) / (data.days || 1);
//             values.push(normalizedValue || 0);
//         }
//     });
    
//     return { labels, values };
// }

// function formatLabel(key) {
//     return key
//         .replace(/([A-Z])/g, ' $1')
//         .replace(/_/g, ' ')
//         .replace(/(^|\s)\S/g, l => l.toUpperCase())
//         .trim();
// }