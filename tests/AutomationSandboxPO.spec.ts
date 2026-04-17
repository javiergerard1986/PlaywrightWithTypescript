import { test, Browser, Page, expect } from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage';

// npx playwright test --ui: abrir el testUI para poder ver ejecucion real de los casos y obtener acceso a las dev tools desde playwright.
// npm playwright codegen www.freerangetesters.com -> nage a la pagina y te va escribiendo en algo temporal de las acciones realizadas

(async () => {

    let browser: Browser;
    let page: Page;
    let sandboxPage: SandboxPage;


    test.beforeEach(async ({ page }) => {
        await test.step('Navigate to the "The Free Range Testers Automation Sandbox" website', async () => {
            await page.goto('');
            sandboxPage = new SandboxPage(page);
        })
    })

    test.describe('Executable actions in Automation Sandbox', () => {
        // Click on button test
        test('Click on Dynamic Button', async ({ page }) => {
        await test.step('I will click on the ID Dynamic button', async () => {
            sandboxPage.clickOnDynamicButton();
            await expect(sandboxPage.dynamicLbl).toBeVisible();
        })  
      })


      //Fill text input, checboxes, radiobuttons
      test('I will fill a textbox Sandbox', async ({ page, /*browserName*/ }) => {
        let text = 'I am learning Playwright!';
        await test.step('I will type on a textBox', async () => {
            await expect (sandboxPage.boringTxt).toBeEditable();
            await sandboxPage.fillBoringTextBox(text);
            await expect (sandboxPage.boringTxt).toHaveValue(text);
        })
        await test.step('I will check a checkbox', async () => {
            await sandboxPage.checkPizzaCheckbox();
            await expect(sandboxPage.pizzaCbx).toBeChecked();
        })

        await test.step('I will select a radioBtn', async () => {
            await sandboxPage.checkYesRadioButton();
            await expect(sandboxPage.yesRb).toBeChecked();
            await expect(sandboxPage.noRb).not.toBeChecked();
        })
      })

      test('Validate that the expected checkboxes are displayed in the main page', async ({ page }) => {      
        await expect.soft(sandboxPage.pizzaCbx, 'The Pizza 🍕 checbox is not displayed').toBeVisible();
        await expect.soft(sandboxPage.hamburguerCbx, 'The Hamburguesa 🍔 checbox is not displayed').toBeVisible();
        await expect.soft(sandboxPage.pastaCbx, 'The Pasta 🍝 checbox is not displayed').toBeVisible();
        await expect.soft(sandboxPage.iceCreamCbx, 'The Helado 🍧 checbox is not displayed').toBeVisible();
        await expect.soft(sandboxPage.cakeCbx, 'The Torta 🍰 checbox is not displayed').toBeVisible();
      
        await test.info().attach('screenshot', {
            body: await page.screenshot(),
            contentType: 'image/png'
        })
    })
      
      
    test.afterEach(async ({ page }) => {
      await test.step('Close browser', async () => {
        await page.close();          
      })
    })
      
  })

})();