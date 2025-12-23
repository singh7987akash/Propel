import api from './api';

export const projectService = {
    async getProjects(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        const response = await api.get(`/projects?${params}`);
        return response.data;
    },

    async getProjectById(id) {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },

    async createProject(projectData) {
        const response = await api.post('/projects', projectData);
        return response.data;
    },

    async updateProject(id, projectData) {
        const response = await api.put(`/projects/${id}`, projectData);
        return response.data;
    },

    async deleteProject(id) {
        const response = await api.delete(`/projects/${id}`);
        return response.data;
    },

    async addProjectUpdate(id, updateData) {
        const response = await api.post(`/projects/${id}/updates`, updateData);
        return response.data;
    }
};
