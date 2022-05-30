import api from '../services/api.service';




export default class TugoContext {
    async login(data) {
        const response = api.post('/login', data);
        return response;
    }
    async getAllCourses() {
        const response = api.get('/courses');
        return response;
    }
    async getInfoCourseDefault(idCourse) {
        const response = api.get(`/course/default/${idCourse}`);
        return response;
    }
    async getInfoCourse(idCourse) {
        let data1 = JSON.parse(localStorage.getItem('eLearning_data'));
        if (!data1) return new Error();
        api.defaults.headers.Authorization = "Bearer " + data1.token;
        const response = api.get(`/course/${idCourse}`);
        return response;
    }
    async getInfoItem(idItem) {
        const response = api.get(`/item/${idItem}`);
        return response;
    }
    async getListCommentCourse(idCourse) {
        const response = api.get(`/comments/course?idCourse=${idCourse}`);
        return response;
    }
    async getListCommentItem(idItem) {
        const response = api.get(`/comments/item?idItem=${idItem}`);
        return response;
    }
    async updateLessonUser(idCourse, idItem) {
        let data1 = JSON.parse(localStorage.getItem('eLearning_data'));
        if (!data1) return new Error();
        api.defaults.headers.Authorization = "Bearer " + data1.token;
        const response = api.put(`/lesson/user`, { idCourse, idItem });
        return response;
    }
    async checkInfoCourseUser(idCourse) {
        let data1 = JSON.parse(localStorage.getItem('eLearning_data'));
        if (!data1) return new Error();
        api.defaults.headers.Authorization = "Bearer " + data1.token;
        const response = api.get(`/course/user/${idCourse}`);
        return response;
    }
    async getListAssignment(idItem) {
        let data1 = JSON.parse(localStorage.getItem('eLearning_data'));
        if (!data1) return new Error();
        api.defaults.headers.Authorization = "Bearer " + data1.token;
        const response = api.get(`/courses/assignments/${idItem}`);
        return response;
    }
    async getInfoUser() {
        let data1 = JSON.parse(localStorage.getItem('eLearning_data'));
        if (!data1) return new Error();
        api.defaults.headers.Authorization = "Bearer " + data1.token;
        const response = api.get(`/users`);
        return response;
    }
    async updateInfoUser(data) {
        let data1 = JSON.parse(localStorage.getItem('eLearning_data'));
        if (!data1) return new Error();
        api.defaults.headers.Authorization = "Bearer " + data1.token;
        const response = api.put(`/users`, data);
        return response;
    }
    async getInfoLearnedCourse() {
        let data1 = JSON.parse(localStorage.getItem('eLearning_data'));
        if (!data1) return new Error();
        api.defaults.headers.Authorization = "Bearer " + data1.token;
        const response = api.get(`/users/courses`);
        return response;
    }
}