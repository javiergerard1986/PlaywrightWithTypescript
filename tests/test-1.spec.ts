import { test, Browser, Page, expect } from '@playwright/test';


let browser: Browser;
let page: Page;
const baseUrl: string = "https://www.mercadolibre.com.uy";
let mainPageTitle: string = "Mercado Libre Uruguay - Envíos Gratis en el día";

const sections = [
    { name: 'Ofertas', url: '/ofertas#nav-header', expectedTitle: "Ofertas | Mercadolibre Uruguay" },
    { name: 'Moda', url: '/c/ropa-calzados-y-accesorios#nav-header', expectedTitle: "Moda y calzado en Mercado Libre"}
];


test.describe('Feature', () => {

    for(const section of sections){

        test(`Scenario 1 Navigate to "${baseUrl}" - "${section.name}"`, async({ page }) => {
            await test.step('Given I go to the "Home" page', async() => {
            await page.goto(baseUrl);
            })

        await test.step('When I check the page title', async () => {
            await expect(page).toHaveTitle(mainPageTitle);
            })

        await test.step('When I navigate to "$section.name"', async () => {
            await page.getByRole('link', { name: section.name, exact: true }).click();
            await page.waitForURL('**'+section.url);
            await expect(page).toHaveURL(baseUrl+section.url);
            await expect(page).toHaveTitle(section.expectedTitle);
            })

        await test.step('When I close the browser', async () => {
            await page.close();
            })    
        })

    }
    
})