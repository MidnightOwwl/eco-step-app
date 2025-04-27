import { EcoStepApi } from './api.js';

const api = new EcoStepApi();

document.addEventListener('DOMContentLoaded', () => {
    initForms();
    initTabSwitching();
});

function initForms() {
    document.querySelectorAll('.survey-form').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User not authenticated');
                }

                const formData = mapFormDataToApiFormat(
                    this.closest('.survey-block').id,
                    collectFormData(this)
                );

                console.log(JSON.stringify(formData));
                const response = await api.createSurvey(formData);
                console.log('Survey submitted:', response);

                this.reset();
            } catch (error) {
                console.error('Error submitting survey:', error);
            }
        });
    });
}

function collectFormData(form) {
    const data = {};
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (!input.name) return;
        data[input.name] = input.type === 'number' 
            ? parseFloat(input.value) || 0 
            : input.value;
    });
    
    return data;
}

// Преобразование данных формы в формат API
function mapFormDataToApiFormat(formId, formData) {
    const surveyId = parseInt(localStorage.getItem('surveyId'));
    localStorage.setItem('surveyId', surveyId + 1);
    const userId = localStorage.getItem('userId');
    const surveyData = {
        userId: parseInt(userId),
        completedAt: new Date().toISOString(),
        reportedDays: formData.days || 1,
        foodData: {
            meatEatenKg: 0,
            plantEatenKg: 0
        },
        wasteData: {
            foodWasteKg: 0,
            otherWasteKg: 0,
            plasticWasteKg: 0,
            glassWasteKg: 0,
            paperWasteKg: 0,
            metalWasteKg: 0,
            plasticRecycledPercent: 0,
            glassRecycledPercent: 0,
            paperRecycledPercent: 0,
            metalRecycledPercent: 0
        },
        transportData: {
            publicTransportDistanceKm: 0,
            airplaneDistanceKm: 0,
            trainDistanceKm: 0,
            carDistanceKmPetrol: 0,
            carDistanceKmDiesel: 0,
            carDistanceKmElectric: 0,
            carDistanceKmHybrid: 0,
            carDistanceKmHydrogen: 0,
            carDistanceKmMethane: 0,
            carDistanceKmPropane: 0
        },
        resourceData: {
            waterConsumptionL: 0,
            electricityConsumptionKWtH: 0
        }
    };

    switch(formId) {
        case 'food':
            surveyData.foodData = {
                meatEatenKg: formData.meat || 0,
                plantEatenKg: formData.vegetables || 0
            };
            break;
            
        case 'wastes':
            surveyData.wasteData = {
                foodWasteKg: formData.food_waste || 0,
                plasticWasteKg: formData.plastic || 0,
                glassWasteKg: formData.glass || 0,
                paperWasteKg: formData.paper || 0,
                metalWasteKg: formData.metal || 0,
                plasticRecycledPercent: formData.plastic_recycled || 0,
                glassRecycledPercent: formData.glass_recycled || 0,
                paperRecycledPercent: formData.paper_recycled || 0,
                metalRecycledPercent: formData.metal_recycled || 0
            };
            break;
            
        case 'transport':
            const fuelType = formData.fuel_type || 'Petrol';
            const carDistance = formData.car_distance || 0;
            
            surveyData.transportData = {
                publicTransportDistanceKm: formData.public_transport || 0,
                [`carDistanceKm${fuelType}`]: carDistance
            };
            break;
            
        case 'costs':
            surveyData.resourceData = {
                waterConsumptionL: formData.water || 0,
                electricityConsumptionKWtH: formData.electricity || 0
            };
            break;
    }
    
    return surveyData;
}

function initTabSwitching() {
    document.querySelectorAll('.selector-button').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            document.querySelectorAll('.selector-button').forEach(btn => {
                btn.classList.remove('selector-active');
            });
            this.classList.add('selector-active');

            document.querySelectorAll('.survey-block').forEach(block => {
                block.classList.remove('survey-active');
            });
            document.getElementById(targetId).classList.add('survey-active');
        });
    });
}

// function getSurvayId() {
    
// }