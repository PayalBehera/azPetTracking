import http from "../http-common";

class TutorialDataService {

    testmethos() {
        console.log('THis is called');
        return true;
    }

    getAll() {
        return http.get("/emp");
    }

    get(id) {
        return http.get(`/emp/${id}`);
    }

    create(data) {
        return http.post("/tutorials", data);
    }

    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }

    delete(id) {
        return http.delete(`/tutorials/${id}`);
    }

    deleteAll() {
        return http.delete(`/tutorials`);
    }

    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
    }
}

export default new TutorialDataService();