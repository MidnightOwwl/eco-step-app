export class EcoStepApi {
    constructor(baseUrl = 'http://158.160.44.27:5000/api') {
        this.baseUrl = baseUrl;
        this.token = localStorage.getItem('jwt_token');
    }
  
    async request(endpoint, method = 'GET', body = null, isStrs = false) {
        const headers = {
            "Access-Control-Allow-Origin" : "*"
        };

        if (!isStrs) {
            headers['Content-Type'] = 'application/json';
        }

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
    
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            cahe: 'no-cache',
            method,
            headers,
            body: isStrs ? body : JSON.stringify(body)
            
        });
    
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error.message || 'Request failed');
        }
        return response.json();
    }
  
    // Auth methods
    async register(username, password) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        return this.request('/auth/register', 'POST', formData, true);
    }
  
    async login(username, password) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const data = await this.request('/auth/login', 'POST', formData, true);
        this.token = data.token;
        this.userId = data.userId;
        console.log(this.token);
        localStorage.setItem('jwt_token', this.token);
        localStorage.setItem('userId', this.userId);
        return data;
    }
  
    // Survey methods
    async getSurveys(userId) {
        return this.request(`/api/survey/${userId}`);
    }

    async getLastWeekSurveys(userId) {
        return this.request(`/api/survey/${userId}/last-week-surveys`)
    }
  
    async createSurvey(surveyData) {
        return this.request('/api/survey', 'POST', surveyData);
    }
  
    // User methods
    async getUser(id) {
        return this.request(`/api/user/${id}`);
    }
  
    async updateHousehold(userId, householdData) {
        return this.request(`/api/user/${userId}/household`, 'PUT', householdData);
    }
  }