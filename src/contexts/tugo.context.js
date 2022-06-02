import api from '../services/api.service';




export default class TugoContext {
    async login(data) {
        const response = api.post('/login', data);
        return response;
    }
    async getItemWithSummaryInformation() {
        const response = api.get('/tours');
        return response;
    }
    async getListDestination() {
        const response = api.get('/destinations');
        return response;
    }
    async getListPayment() {
        const response = api.get('/payments');
        return response;
    }

}