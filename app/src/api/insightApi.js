import api from './axios';

export const getAccountInsights = (range = '7') =>
    api.get(`/insights/account?range=${range}`);

export const getContentInsights = (type = 'ALL', sort = 'newest', range = '7') =>
    api.get(`/insights/content?type=${type}&sort=${sort}&range=${range}`);

export const getFollowerHeatmap = () =>
    api.get('/insights/heatmap');
