import { request } from '@playwright/test';

// Common settings for API requests
const apiContext = async () => {
    return request.newContext({
        baseURL: 'https://stg.globalsociety.cc',
        extraHTTPHeaders: {
            'x-api-key': '76445404-a1bd-4e5e-a6f7-14cad92c8abd',
            'x-partner-id': 'Stas_demo',
            'Content-Type': 'application/json'
        }
    });
};

// Function to create an event
export const createEvent = async (eventData) => {
    const context = await apiContext();
    return context.post('/v1/activities', {
        data: eventData
    });
};

// Function to generate a reward link
export const generateReward = async (activityId, rewardData) => {
    const context = await apiContext();
    return context.post(`/v1/activities/${activityId}/rewards`, {
        data: rewardData
    });
};
