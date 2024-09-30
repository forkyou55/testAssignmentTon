const { test, expect } = require('@playwright/test');
const { createEvent } = require('../helpers/apiHelper');
const eventData = require('../fixtures/eventData');

test.describe('Create Event', () => {
  test('Verify successful response and required fields', async () => {
    const response = await createEvent(eventData);

    // Verify successful response
    expect(response.ok()).toBeTruthy();

    // Verify fields in the response
    const responseBody = await response.json();
    expect(responseBody.status).toBe('success');
    expect(responseBody.data).toHaveProperty('activity_id');
    expect(responseBody.data).toHaveProperty('activity_url');

    console.log('Created event ID:', responseBody.data.activity_id);
  });
});
