import { test, Browser, Page, expect } from '@playwright/test';

// npx playwright test --ui: abrir el testUI para poder ver ejecucion real de los casos y obtener acceso a las dev tools desde playwright.
// npm playwright codegen www.freerangetesters.com -> nage a la pagina y te va escribiendo en algo temporal de las acciones realizadas

(async () => {

    let browser: Browser;
    let page: Page;
    //baseUrl added in the playwright.config.ts file
    //let baseUrl: string = "https://thefreerangetester.github.io/sandbox-automation-testing/";


    test.beforeEach(async ({ page }) => {
        await test.step('Navigate to the "The Free Range Testers Automation Sandbox" website', async () => {
            await page.goto('');
        })
    })

    test.describe('Executable actions in Automation Sandbox', () => {
        // Click on button test
        test('Click on Dynamic Button', async ({ page }) => {
        await test.step('I will click on the ID Dynamic button', async () => {
            const dynamicBtn = page.getByRole('button', { name: 'Hacé click para generar un ID' });
            await dynamicBtn.click(); 
            await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
            //force: await dynamicBtn.click({ force:true });;
            //double click: await dynamicBtn.dblclick();
            //right click: await dynamicBtn.click({ button: 'right' });
            //click with specified keyboard key pressed: await dynamicBtn.click({ modifiers: ['Shift'] });
            //mouse hover: await dynamicBtn.hover();
        })  
      })

/*
Annotations: 
      -.skip: skip the test case execution.
      -.only: execute only the specified test case/s
      -test.fail: report says that the test passed when test fail. Example: known issue, and we do not  want to stop the execution
      -test.fixme(): it is like a test.skip. But in the report shows that the test case must be fixed.
      - Add tag in the test name: example: test('I will fill a textbox @Sandbox', async ({ page }) => { then in the terminal execute "npx playwright test --grep '@smoke'" will execute all the test cases with the @Sanbox tag in the test title
*/

      //Fill text input, checboxes, radiobuttons
      test('I will fill a textbox Sandbox @smoke', async ({ page, /*browserName*/ }) => {
        test.info().annotations.push({
            type: 'user-story',
            description: 'This is the user story execution'
        });
        //test.skip(browserName === 'chromium', 'No funciona en chromium aun');
        let text = 'I am learning Playwright!';
        await test.step('I will type on a textBox', async () => {
            await expect (page.getByRole('textbox', { name: 'Un aburrido texto' })).toBeEditable();
            await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(text);
            await expect (page.getByRole('textbox', { name: 'Un aburrido texto' })).toHaveValue(text);
        })
        await test.step('I will check a checkbox', async () => {
            await page.getByRole('checkbox', { name: 'Pizza 🍕' }).check();
            await expect(page.getByRole('checkbox', { name: 'Pizza 🍕' })).toBeChecked();
            //Specify custom error message when assertion fails
            //await expect(page.getByRole('checkbox', { name: 'Pizza 🍕' }), 'Pizza checkbox is not checked').toBeChecked();
        })

        await test.step('I will select a radioBtn', async () => {
            await page.getByRole('radio', { name: 'Si' }).check();
            await expect(page.getByRole('radio', { name: 'Si' })).toBeChecked();
            await expect(page.getByRole('radio', { name: 'No' })).not.toBeChecked();
        })
      })

      test('Validate that the expected checkboxes are displayed in the main page', async ({ page }) => {
        
        await expect.soft(page.getByText('Pizza 🍕'), 'The Pizza 🍕 checbox is not displayed').toBeVisible();
        await expect.soft(page.getByText('Hamburguesa 🍔'), 'The Hamburguesa 🍔 checbox is not displayed').toBeVisible();
        await expect.soft(page.locator('div').filter({ hasText: /^Pasta 🍝$/ }), 'The Pasta 🍝 checbox is not displayed').toBeVisible();
        await expect.soft(page.getByText('Helado 🍧'), 'The Helado 🍧 checbox is not displayed').toBeVisible();
        await expect.soft(page.getByText('Torta 🍰'), 'The Torta 🍰 checbox is not displayed').toBeVisible();
      
        await test.info().attach('screenshot', {
            body: await page.screenshot(),
            contentType: 'image/png'
        })
    })
      
      
      test('Working with dropdowns', async ({ page }) => {
        await test.step('I will select a sport from the dropdown', async () => {
          await page.getByLabel('Dropdown').selectOption("Tennis");
          
          const sports = ['Fútbol', 'Tennis', 'Basketball'];         
          for (let sport of sports){
            let element = await page.$(`select#formBasicSelect > option:is(:text("${sport}"))`);
            if(!element){
                throw new Error('The ${sport} is not present in the dropdown')
            }
          }

          await page.getByRole('button', { name: 'Enviar' }).click();
        })
        await test.step('I will select a day of the week from the dropdown', async () => {
          await page.getByRole('button', { name: 'Día de la semana' }).click();
          await page.getByRole('link', { name: 'Martes' }).click();
        })
      })

      test('Verifying values in static table', async ({ page }) => {
        await test.step('', async () => {
            let expectedNames = ['Messi', 'Ronaldo', 'Mbappe'];
            let staticTableNames = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
            expect (expectedNames).toEqual(staticTableNames);    
        })
      })

      test('Validate that dynamic table values are updated after the browser reload', async ({ page }) => {
        await test.step('Get dynamic table and validate values changes after reload', async () => {
            let dynamicTableNames = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log(dynamicTableNames);

            await page.reload();

            let postDynamicTableNames = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log(postDynamicTableNames);

            expect(dynamicTableNames).not.toEqual(postDynamicTableNames);
        })
      })

       test('Clicking on Pop Up button', async ({ page }) => {
            await test.step('opening the Pop Up by clicking on the specified button', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })
            await test.step('Validate that the Pop Up is opened', async () => {
                expect(page.getByRole('button', { name: 'Cerrar' }).isVisible(), 'The Close button is not visible');
            })
            await test.step('Close the Pop Up', async () => {
                await page.getByRole('button', { name: 'Cerrar' }).click();
            })
            await test.step('Validate that the Pop Up is closed', async () => {
                await expect(page.getByRole('button', { name: 'Cerrar' }), 'The Pop Up is still open').not.toBeVisible();
            })
            /*
            await test.step('Other way to work with popups', async () => {
              const popupPromise = page.waitForEvent('popup');
              await page.getByRole('button', { name: 'Mostrar popup' }).click();
              const popup = await popupPromise;
              await popup.waitForLoadState();
              await expect(page.getByRole('button', { name: 'Cerrar' }), 'The Pop Up is open and ready to be used').toBeVisible();
              await page.getByRole('button', { name: 'Cerrar' }).click();
              await expect(page.getByRole('button', { name: 'Cerrar' }), 'The Pop Up is still open').not.toBeVisible();
            })*/

        })
      
      
      
      test.skip('Upload and download file', async ({ page }) => {
        await test.step('Add files to be uploaded', async () => {
          await page.getByLabel('Upload file').setInputFiles('<fileName>.pdf');
          await page.getByLabel('Upload file').setInputFiles(['<fileName1>.pdf', '<fileName2>.pdf']);
        })
        await test.step('Drag and Drop elements', async () => {
          await page.getByTestId('DragForm').dragTo(page.getByTestId('DragTo'));
        })
      })
      
      test.afterEach(async ({ page }) => {
        await test.step('Close browser', async () => {
          await page.close();  
        })
      })
      
    })

})();