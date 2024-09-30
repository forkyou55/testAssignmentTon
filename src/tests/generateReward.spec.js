const { test, expect } = require('@playwright/test');
const { generateReward } = require('../helpers/apiHelper');
const rewardData = require('../fixtures/rewardData');

test.describe('Reward Link Generation', () => {
  test('Verify successful response and link generation', async () => {
    let success = false;
    let activityId;

    // Iterate through values from 1706 to 1726
    for (let id = 1706; id <= 1726; id++) {
      activityId = id;

      const response = await generateReward(activityId, rewardData);

      console.log('Response status:', response.status());
      console.log('Response body:', await response.text());

      // Check if the response was successful
      if (response.ok()) {
        success = true;
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('status', 'success');
        expect(responseBody.data).toHaveProperty('reward_link');
        console.log('Reward link:', responseBody.data.reward_link);
        break;
      } else {
        console.log(`Error for activityId ${activityId}: ${await response.text()}`);
      }
    }

    // If no successful response was received, throw an error
    if (!success) {
      throw new Error('Failed to receive a successful response for any activityId between 1706 and 1726.');
    }
  });
});
