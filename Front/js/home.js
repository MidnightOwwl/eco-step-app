import { MaxValues } from "./constants.js";
import { EcoStepApi } from "./api.js";

const api = new EcoStepApi();

let surveys = {}

document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    updateHomePage(userId);
    
    try {
        surveys = await api.getSurveys(userId);
        const deviationData = calculateDeviation(
            getLastSurvey(processSurveyData(surveys)));

        renderDeviationChart(deviationData.summaryDeviationPercent);
        updateDescText(deviationData.summaryDeviationPercent);
    }
    
    catch (error) {
        console.error('Error loading survey data:', error);
    }
});

document.getElementById('recentSummaryButton').addEventListener('click', function() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    handleSummaryButtonClick(this);

    const deviationData = calculateDeviation(getLastSurvey(processSurveyData(surveys)));
    renderSummaryChart(deviationData.devResult);
});

function handleSummaryButtonClick(btn) {
    const textContainer = document.getElementById('hidingText');
    const chartContainer = document.getElementById('hidingChart');
    
    if (btn.classList.contains('clicked')){
        btn.classList.remove('clicked');
        textContainer.style.display = 'flex';
        chartContainer.style.display = 'none';
        btn.textContent = 'Recent summary';

    } else {
        btn.classList.add('clicked');
        textContainer.style.display = 'none';
        chartContainer.style.display = 'block';
        btn.textContent = 'Close';
    }
}

function renderSummaryChart(deviationData) {
    const chartContainer = document.querySelector('.chart');
    chartContainer.innerHTML = '';
    
    const chartWrapper = document.createElement('div');
    chartWrapper.className = 'chart-wrapper';
    chartWrapper.style.opacity = '0';
    setTimeout(() => { chartWrapper.style.opacity = '1'; }, 10);
    
    const categoryTabs = document.createElement('div');
    categoryTabs.className = 'category-tabs';
    
    const categories = ['food', 'wastes', 'transport', 'costs'].filter(cat => {
        const data = deviationData[cat];
        return data && Object.values(data).some(v => v !== 0);
    });
    
    categories.forEach((category, index) => {
        const tab = document.createElement('button');
        tab.className = `category-tab ${index === 0 ? 'active' : ''}`;
        tab.textContent = formatLabel(category);
        tab.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            showCategoryChart(category, deviationData, chartCanvas);
        });
        categoryTabs.appendChild(tab);
    });
    
    const chartCanvas = document.createElement('canvas');
    chartCanvas.id = 'summaryChart';
    
    chartWrapper.appendChild(categoryTabs);
    chartWrapper.appendChild(chartCanvas);
    chartContainer.appendChild(chartWrapper);
    
    if (categories.length > 0) {
        showCategoryChart(categories[0], deviationData, chartCanvas);
    }
}

function showCategoryChart(category, deviationData, canvas) {
    const data = deviationData[category];
    if (!data) return;
    
    const labels = [];
    const values = [];
    const backgroundColors = [];
    
    Object.keys(data).forEach(key => {
        if (data[key] !== 0) {
            labels.push(formatLabel(key));
            values.push(data[key]);
            backgroundColors.push(data[key] <= 1 ? 'rgba(0, 200, 0, 0.7)' : 'rgba(200, 0, 0, 0.7)');
        }
    });
    
    if (canvas.chart) {
        canvas.style.opacity = '0';
        setTimeout(() => {
            canvas.chart.destroy();
            createNewChart();
            canvas.style.opacity = '1';
        }, 300);
    } else {
        createNewChart();
    }
    
    function createNewChart() {
        const ctx = canvas.getContext('2d');
        canvas.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: `${formatLabel(category)} Deviation`,
                    data: values,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, 
                animation: {
                    duration: 300 
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        // suggestedMax: Math.max(1.5, ...values) * 1.1, // Автомасштабирование 
                        title: {
                            display: true,
                            text: 'Deviation Value'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.2)'
                        },
                        ticks: {
                            precision: 1
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                yMin: 1,
                                yMax: 1,
                                borderColor: 'rgb(255, 0, 0)',
                                borderWidth: 2,
                                borderDash: [6, 6],
                                label: {
                                    content: 'Recommended max',
                                    enabled: true,
                                    position: 'right'
                                }
                            }
                        }
                    }
                },
                layout: {
                    padding: {
                        bottom: 15 
                    }
                }
            }
        });
    }
}

function formatLabel(key) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

function processSurveyData(surveys) {
    const result = {
        food: [],
        wastes: [],
        transport: [],
        costs: []
    };

    surveys.forEach(survey => {
        if (survey.foodData) {
            if (!isEmptyCategory(survey.foodData)) {
                result.food.push({
                    meatEaten: survey.foodData.meatEatenOz,
                    plantEaten: survey.foodData.plantEatenOz,
                    days: survey.reportedDays
                });
            }
        }
        
        if (survey.wasteData) {
            if (!isEmptyCategory(survey.wasteData)) {
                result.wastes.push({
                    foodWaste: survey.wasteData.foodWasteOz,
                    plasticWaste: survey.wasteData.plasticWasteOz,
                    glassWaste: survey.wasteData.glassWasteOz,
                    paperWaste: survey.wasteData.paperWasteOz,
                    metalWaste: survey.wasteData.metalWasteOz,
                    otherWaste: survey.wasteData.otherWasteOz,
                    days: survey.reportedDays
                });
            } 
        }
        
        if (survey.transportData) {
            if (!isEmptyCategory(survey.transportData)) {
                result.transport.push({
                    publicTransport: survey.transportData.publicTransportDistanceMiles,
                    airplane: survey.transportData.airplaneDistanceMiles,
                    train: survey.transportData.trainDistanceMiles,
                    carPetrol: survey.transportData.carDistanceMilesPetrol,
                    carDiesel: survey.transportData.carDistanceMilesDiesel,
                    carElectric: survey.transportData.carDistanceMilesElectric,
                    carHybrid: survey.transportData.carDistanceMilesHybrid,
                    carHydrogen: survey.transportData.carDistanceMilesHydrogen,
                    carMethane: survey.transportData.carDistanceMilesMethane,
                    carPropane: survey.transportData.carDistanceMilesPropane,
                    days: survey.reportedDays
                });
            }
            
        }
        
        if (survey.resourceData) {
            if (!isEmptyCategory(survey.resourceData)) {
                result.costs.push({
                    waterConsumption: survey.resourceData.waterConsumptionL,
                    electricityConsumption: survey.resourceData.electricityConsumptionKWtH,
                    days: survey.reportedDays
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

function getLastSurvey(surveys) {
    return {
        food: surveys.food.length !== 0 ? surveys.food[surveys.food.length - 1] : null,
        wastes: surveys.wastes.length !== 0 ? surveys.wastes[surveys.wastes.length - 1] : null,
        transport: surveys.transport.length !== 0 ? surveys.transport[surveys.transport.length - 1] : null,
        costs: surveys.costs.length !== 0 ? surveys.costs[surveys.costs.length - 1] : null,
    };
}

function calculateDeviation(survey) {
    let sum = 0;
    let paramsCount = 0;
    const devResult = {
        food: {
            meatEaten: 0,
            plantEaten: 0
        },
        wastes: {
            foodWaste: 0,
            otherWaste: 0,
            plasticWaste: 0,
            glassWaste: 0,
            paperWaste: 0,
            metalWaste: 0
        },
        transport: {
            carPetrol: 0,
            carDisesel: 0,
            carElectric: 0,
            carHybrid: 0,
            carHydrogen: 0,
            carMethane: 0,
            carPropane: 0,
            publicTransport: 0,
            airplane: 0,
            train: 0
        },
        costs: {
            waterConsumption: 0,
            electricityConsumption: 0
        }
    }
    Object.keys(survey).forEach(category => {
        if (survey[category] !== null) {
            const days = survey[category].days;
            Object.keys(survey[category]).forEach(subcategory => {
                if (subcategory !== 'days') {
                    const deviation = (survey[category][subcategory] / days) / MaxValues[category][subcategory];
                    sum += deviation > 1 ? deviation : 0;
                    paramsCount += 1;
                    devResult[category][subcategory] = deviation;
                }
            })
        }
    });
    const percent = 1 - (sum / paramsCount) > 0 ? (1 - (sum / paramsCount)) * 100 : 0;
    return {
        summaryDeviationPercent: percent,
        devResult: devResult
    }
}


function renderDeviationChart(percentage) {
    const container = document.getElementById('devStat');
    if (!container) return;

    container.innerHTML = '';

    const startAngle = 180;
    const endAngle = startAngle - (percentage * 1.8);

    const pathData = describeArc(150, 150, 120, startAngle, endAngle);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 300 150");

    const bg = document.createElementNS("http://www.w3.org/2000/svg", "path");
    bg.setAttribute("d", describeArc(150, 150, 120, 180, 0));
    bg.setAttribute("stroke", "#eee");
    bg.setAttribute("fill", "none");
    bg.setAttribute("stroke-width", "10");

    const progress = document.createElementNS("http://www.w3.org/2000/svg", "path");
    progress.setAttribute("d", pathData);
    progress.setAttribute("stroke", getColorAndDescText(percentage).color);
    progress.setAttribute("fill", "none");
    progress.setAttribute("stroke-width", "10");
    progress.setAttribute("stroke-linecap", "round");
    progress.style.transition = "stroke-dashoffset 0.2s ease";

    svg.appendChild(bg);
    svg.appendChild(progress);

    // Текст с процентом
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "150");
    text.setAttribute("y", "140");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "150%");
    text.setAttribute("fill", "#333");
    text.textContent = `${Math.round(percentage)}%`;
    svg.appendChild(text);

    container.appendChild(svg);

    animateProgress(progress, text, percentage); 
}

function animateProgress(progressElement, textElement, targetPercent) {
    const pathLength = progressElement.getTotalLength();

    progressElement.style.strokeDasharray = pathLength;
    progressElement.style.strokeDashoffset = pathLength;

    let currentPercent = 0;
    const duration = 1500;
    const startTime = performance.now();
    
    function updateAnimation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        currentPercent = progress * targetPercent;
        const offset = pathLength - (pathLength * progress);
        
        progressElement.style.strokeDashoffset = offset;
        textElement.textContent = `${Math.round(currentPercent)}%`;
        
        progressElement.setAttribute("stroke", getColorAndDescText(currentPercent).color);
        
        if (progress < 1) {
            requestAnimationFrame(updateAnimation);
        }
    }
    
    requestAnimationFrame(updateAnimation);
}

function describeArc(cx, cy, r, startAngle, endAngle) {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    
    return [
        "M", start.x, start.y,
        "A", r, r, 0, 0, 1, end.x, end.y
    ].join(" ");
}

function polarToCartesian(cx, cy, r, angle) {
    const rad = angle * Math.PI / 180;
    return {
        x: cx + r * Math.cos(rad),
        y: cy - r * Math.sin(rad)
    };
}

function getColorAndDescText(percent) {
    let color = 'rgb(196, 0, 0)';
    let text = 'A lot of work ahead';

    if (percent >= 90) {
        color = 'rgb(0, 197, 0)';
        text = 'Exellent!';
    } else if (percent >= 75 && percent < 90) {
        color = 'rgb(2, 186, 2)';
        text = 'Great work!';
    } else if (percent >= 50 && percent < 75) {
        color = 'rgb(171, 114, 0)';
        text = 'You can do better'
    }   
    return {
        color, 
        text
    }
           
}

function updateDescText(percent) {
    const text = getColorAndDescText(percent).text;
    const desc = document.getElementById('devDesc');
    desc.textContent = text;
}


function updateHomePage(userId) {
    const links = [
        document.getElementById('profile-link'),
        document.getElementById('home-link'),
        document.getElementById('surveys-link'),
        document.getElementById('data-link')
    ];

    const authLink = document.getElementById('auth-link');
    
    if (authLink) {
        if (userId) {
            authLink.style.display = 'none';
            links.forEach(link => {
                if (link) {
                    link.style.display = 'inline';
                }
            });
        } else {
            links.forEach(link => {
                if(link) {
                    link.style.display = 'none';
                }
            });
        }
    }
}