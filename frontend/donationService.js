import api from './api';

export const donationService = {
    async createPaymentIntent(amount, projectId) {
        const response = await api.post('/donations/create-payment-intent', {
            amount,
            projectId
        });
        return response.data;
    },

    async confirmDonation(donationData) {
        const response = await api.post('/donations/confirm', donationData);
        return response.data;
    },

    async getUserDonations(userId) {
        const response = await api.get(`/donations/user/${userId}`);
        return response.data;
    },

    async getProjectDonations(projectId) {
        const response = await api.get(`/donations/project/${projectId}`);
        return response.data;
    }
};
