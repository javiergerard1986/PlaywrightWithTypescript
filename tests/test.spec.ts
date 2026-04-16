import { test, Browser, Page, expect } from '@playwright/test';

test.describe('Navegacion en mercadolibre.com', () => {
    test('Validar titulo de la pagina Mercado Libre  ${n}', async ({ page }) => {
    await test.step("Estando yo en la web principal www.mercadolibre.com.uy", async () => {
    await page.goto('https://mercadolibre.com.uy');
    await expect(page).toHaveTitle('Mercado Libre Uruguay - Envíos Gratis en el día');
    await page.close();
    })    
})  
});