import { test, expect, Page } from '@playwright/test';

test('Mock a real API providing a value that is not contained in the response', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://demo.playwright.dev/api-mocking');
   
    // Mock the API before to make the request
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{ name: 'Dragon Fruit', id: 29 }];
        await route.fulfill({ json });
    });

    // Validate that the Dragon fruit is inside the resposne
    await expect (page.getByText('Dragon Fruit')).toBeVisible();
});

test('Get real response and add a value to the response', async ({ page }) => {
    //Get reponse and add something extra
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'Dragon Fruit', id: 29 });
        // Adding something extra to the response
        await route.fulfill({ response, json });
    });

    //Navigate to the page
    await page.goto('https://demo.playwright.dev/api-mocking');

    //Validate that the added response is present in the real response
    await expect(page.getByText('Dragon Fruit', { exact: true })).toBeVisible();

});


test.afterEach(async ({ page }) => {
    await page.close();
})
