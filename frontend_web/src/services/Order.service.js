import createHttp from "./http.service";
class OrderService {
    constructor() {
        this.http = createHttp("/api/orders",true);
    }
    async getAll() {
        return (await this.http.get("/")).data;
    }
    async create(data) {
        return (await this.http.post("/", data)).data;
    }
    async get(id) {
        return (await this.http.get(`/find/${id}`)).data;
    }
    async update(id, data) {
        return (await this.http.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.http.delete(`/${id}`)).data;
    }
   
}

export default new OrderService();