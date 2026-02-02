import axios from './axios';

export const createAd = (adData) => axios.post('/ads', adData);
export const getActiveAds = () => axios.get('/ads/active');
export const trackImpression = (adId) => axios.post('/ads/impression', { adId });
export const trackClick = (adId) => axios.post('/ads/click', { adId });
