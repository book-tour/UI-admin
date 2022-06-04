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
    async getListDistricts(){
        const response = api.get('https://provinces.open-api.vn/api/');
        return response;
    }
    async updateDestination(data){
        const response = api.put('/destinations', data);
        return response;
    }
    async createDestination(data){
        const response = api.post('/destinations', data);
        return response;
    }
    async deleteDestination(id){
        const response = api.delete('/destinations', {data: id});
        return response;
    }
}