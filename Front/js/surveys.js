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
    const userId = localStorage.getItem('userId');
    const surveyData = {
        userId: parseInt(userId),
        completedAt: new Date().toISOString(),
        reportedDays: formData.days || 1,
        foodData: {
            meatEatenOz: 0,
            plantEatenOz: 0
        },
        wasteData: {
            foodWasteOz: 0,
            otherWasteOz: 0,
            plasticWasteOz: 0,
            glassWasteOz: 0,
            paperWasteOz: 0,
            metalWasteOz: 0,
            plasticRecycledPercent: 0,
            glassRecycledPercent: 0,
            paperRecycledPercent: 0,
            metalRecycledPercent: 0
        },
        transportData: {
            publicTransportDistanceMiles: 0,
            airplaneDistanceMiles: 0,
            trainDistanceMiles: 0,
            carDistanceMilesPetrol: 0,
            carDistanceMilesDiesel: 0,
            carDistanceMilesElectric: 0,
            carDistanceMilesHybrid: 0,
            carDistanceMilesHydrogen: 0,
            carDistanceMilesMethane: 0,
            carDistanceMilesPropane: 0
        },
        resourceData: {
            waterConsumptionL: 0,
            electricityConsumptionKWtH: 0
        }
    };

    switch(formId) {
        case 'food':
            surveyData.foodData = {
                meatEatenOz: formData.meat || 0,
                plantEatenOz: formData.vegetables || 0
            };
            break;
            
        case 'wastes':
            surveyData.wasteData = {
                foodWasteOz: formData.food_waste || 0,
                otherWasteOz: formData.other || 0,
                plasticWasteOz: formData.plastic || 0,
                glassWasteOz: formData.glass || 0,
                paperWasteOz: formData.paper || 0,
                metalWasteOz: formData.metal || 0,
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
                publicTransportDistanceMiles: formData.public_transport || 0,
                airplaneDistanceMiles: formData.airplane_distance || 0,
                trainDistanceMiles: formData.train_distance || 0,
                [`carDistanceMiles${fuelType}`]: carDistance
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