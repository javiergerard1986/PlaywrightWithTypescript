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

test.afterEach(async ({ page }) => {
    await page.close();
})
