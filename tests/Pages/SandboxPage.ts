import { type Locator, type Page}  from '@playwright/test';


export class SandboxPage {

    //---------------------------
    //ATTRIBUTES
    //---------------------------
    readonly page:Page;
    readonly dynamicBtn: Locator;
    readonly dynamicLbl: Locator;
    readonly boringTxt: Locator;
    readonly pizzaCbx: Locator;
    readonly hamburguerCbx: Locator;
    readonly pastaCbx: Locator;
    readonly iceCreamCbx: Locator;
    readonly cakeCbx: Locator;
    readonly yesRb: Locator;
    readonly noRb: Locator;

    //---------------------------
    //METHODS AND FUNCTIONS
    //---------------------------
    constructor(page: Page){
        this.page=page;   
        this.dynamicBtn = page.getByRole('button', { name: 'Hacé click para generar un ID' });
        this.dynamicLbl = page.getByText('OMG, aparezco después de 3');
        this.boringTxt = page.getByRole('textbox', { name: 'Un aburrido texto' });
        this.pizzaCbx = page.getByText('Pizza 🍕');
        this.hamburguerCbx = page.getByText('Hamburguesa 🍔')
        this.pastaCbx = page.locator('div').filter({ hasText: /^Pasta 🍝$/ });
        this.iceCreamCbx = page.getByText('Helado 🍧');
        this.cakeCbx = page.getByText('Torta 🍰');
        this.yesRb = page.getByRole('radio', { name: 'Si' });
        this.noRb = page.getByRole('radio', { name: 'No' });
    }


    //---------------------------
    //METHODS AND FUNCTIONS
    //---------------------------

    // Check the pizza checkbox
    async checkPizzaCheckbox(){
        await this.pizzaCbx.check();
    }

    // Uncheck the pizza checkbox
    async uncheckPizzaCheckbox(){
        await this.pizzaCbx.uncheck();
    }

    // Check the hamburguer checkbox
    async checkHamburguerCheckbox(){
        await this.hamburguerCbx.check();
    }

    // Uncheck the hamburguer checkbox
    async uncheckHamburgerCheckbox(){
        await this.hamburguerCbx.uncheck();
    }

    // Check the pasta checkbox
    async checkPastaCheckbox(){
        await this.pastaCbx.check();
    }

    // Uncheck the pasta checkbox
    async uncheckPastaCheckbox(){
        await this.pastaCbx.uncheck();
    }

    // Check the icecream checkbox
    async checkIceCreamCheckbox(){
        await this.iceCreamCbx.check();
    }

    // Uncheck the icecream checkbox
    async uncheckIceCreamCheckbox(){
        await this.iceCreamCbx.uncheck();
    }

    // Check the Cake checkbox
    async checkCakeCheckbox(){
        await this.cakeCbx.check();
    }

    // Uncheck the Cake checkbox
    async uncheckCakeCheckbox(){
        await this.cakeCbx.uncheck();
    }

    // Click on dynamic button
    async clickOnDynamicButton(){
        await this.dynamicBtn.click();
    }

    // Fill boring text box
    async fillBoringTextBox(textToFill:string){
        await this.boringTxt.fill(textToFill);
    }

    // Check Yes Radio button
    async checkYesRadioButton(){
        await this.yesRb.check();
    }

    // Check No Radio button
    async checkNoRadioButton(){
        await this.noRb.check();
    }
    
}