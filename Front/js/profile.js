import { EcoStepApi } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const api = new EcoStepApi();
    const userId = parseInt(localStorage.getItem('userId'));
    
    if (!userId || !api.token) {
        window.location.href = 'login.html';
        return;
    }

    const saveButton = document.getElementById('saveButton');
    const logoutButton = document.getElementById('logoutButton');
    const userLoginElement = document.getElementById('user-login');
    const elements = {
        houseType: document.getElementById('houseType'),
        tenants: document.getElementById('tenants'),
        heating: document.getElementById('heating')
    };

    let originalValues = {};
    let isEditing = false;

    async function loadUserData() {
        try {
            const user = await api.getUser(userId);
            console.log(user);
            
            if (userLoginElement) {
                userLoginElement.textContent = sessionStorage.getItem('username');
            }

            if (user.household) {
                originalValues = {
                    houseType: user.household.houseType || '0',
                    tenants: user.household.residentCount || '',
                    heating: user.household.heatingType || '0'
                };

                elements.houseType.value = originalValues.houseType;
                elements.tenants.value = originalValues.tenants;
                elements.heating.value = originalValues.heating;
            }

            saveButton.style.display = 'none';
        } catch (error) {
            console.error('Failed to load user data:', error);
            alert('Failed to load profile data. Please try again later.');
        }
    }

    function checkChanges() {
        const hasChanges = Object.keys(elements).some(key => 
            elements[key].value !== originalValues[key]
        );
        
        saveButton.style.display = hasChanges ? 'block' : 'none';
        return hasChanges;
    }

    async function saveData() {
        if (!checkChanges()) return;

        const householdData = {
          userId: userId,
          houseType: Number(elements.houseType.value),
          residentCount: Number(elements.tenants.value) || 0,
          heatingType: Number(elements.heating.value)
        };

        console.log(householdData);

        try {
            await api.updateHousehold(userId, householdData);
            originalValues = { ...householdData };
            isEditing = false;
            
            saveButton.style.display = 'none';
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    }

    function handleLogout() {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('userId');
        window.location.href = 'login.html';
    }

    elements.area?.addEventListener('input', checkChanges);
    elements.tenants?.addEventListener('input', checkChanges);
    elements.heating?.addEventListener('change', checkChanges);

    saveButton?.addEventListener('click', saveData);
    logoutButton?.addEventListener('click', handleLogout);

    await loadUserData();
});