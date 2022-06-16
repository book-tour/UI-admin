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
   
    async getListPayment() {
        const response = api.get('/payments');
        return response;
    }
    //====================================================== tours ==============================================================
    async getTours(){
        const response = api.get('/tours');
        return response;
    }
    async getDetailTours(idTour){
        const response = api.get(`/detail-tour/${idTour}`);
        return response;
    }
    async updateTour(idTour,data){
        const response = api.put(`/tours/${idTour}`, data);
        return response;
    }
    async createTour(data){
        const response = api.post('/tours', data);
        return response;
    }
    //==================================================== schedule =========================================
    async getSchedules(){
        const response = api.get('/schedules');
        return response;
    }
    // =========================================================  destinations  ========================================================================================
    async getListDestination() {
        const response = api.get('/destinations');
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
    // =========================================================  statistic  ========================================================================================
    async statisticMoneyByMonth(){
        const response = api.get('/statistics/month');
        return response;
    }
}