class EcoStepApi {
    constructor(baseUrl = 'http://localhost:5208') {
      this.baseUrl = baseUrl;
      this.token = localStorage.getItem('jwt_token');
    }
  
    async request(endpoint, method = 'GET', body = null) {
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }
  
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }
  
      return response.json();
    }
  
    // Auth methods
    async register(username, password) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      return this.request('/auth/register', 'POST', formData);
    }
  
    async login(username, password) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const data = await this.request('/auth/login', 'POST', formData);
      this.token = data.Token;
      localStorage.setItem('jwt_token', this.token);
      return data;
    }
  
    // Survey methods
    async getSurveys(userId) {
      return this.request(`/api/survey/${userId}`);
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
  
  // Usage example
  const api = new EcoStepApi();