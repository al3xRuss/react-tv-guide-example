import http from "../http-common";

class ShowDataService {
  getAll() {
    return http.get("/schedule");
  }

  get(id) {
    return http.get(`/shows/${id}`);
  }

  create(data) {
    return http.post("/guide", data);
  }

  update(id, data) {
    return http.put(`/guide/${id}`, data);
  }

  delete(id) {
    return http.delete(`/guide/${id}`);
  }

  deleteAll() {
    return http.delete(`/guide`);
  }

  findByTitle(title) {
    return http.get(`/search/shows?q=${title}`);
  }
}

export default new ShowDataService();