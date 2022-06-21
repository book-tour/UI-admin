import api from '../services/api.service';




export default class TugoContext {
    async login(data) {
        const response = api.post('/login', data);
        return response;
    }
    async getItemWithSummaryInformation() {
        const response = api.get('/tours/items/active');
        return response;
    }
   
    async getListPayment() {
        const response = api.get('/payments');
        return response;
    }
    async getListPaymentDesc() {
        const response = api.get('/payments/price/desc');
        return response;
    }
    async getItemPayment(idPayment){
        const response = api.get(`/payments/item/${idPayment}`);
        return response;
    }
    async updatePayment(id,data){
        const response = api.put(`/payments/${id}`, data);
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
    async updateDetailTours(idTour,data){
        const response = api.put(`/detail-tour/${idTour}`,data);
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
    //========================================================= schedule ==========================================================
    async getSchedules(){
        const response = api.get('/schedules');
        return response;
    }
    async getItemSchedule(idSchedule){
        const response = api.get(`/schedules/${idSchedule}`);
        return response;
    }
    async updateItemSchedule(idSchedule,data){
        const response = api.put(`/schedules/${idSchedule}`,data);
        return response;
    }
    // =========================================================  destinations  ===================================================
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