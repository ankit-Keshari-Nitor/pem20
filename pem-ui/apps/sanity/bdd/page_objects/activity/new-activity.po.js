import { expect } from '@playwright/test';

class NewActivity {
    constructor(page) {
        
        this.page = page;

        this.propertyBlock = this.page.locator('div.block-properties-container');
        this.saveBtn = this.page.getByRole('button', { name: 'Save' });
        
    }

    // Activity Define Form
    async fillActivityDefination() {
        const formField = await this.propertyBlock.locator('div.form-field');

        const fieldOne = formField.first();
        const inputfield = await fieldOne.locator("input#name").first();
        await expect(inputfield).toBeVisible();
        await inputfield.fill('Demo-Activity');

        const fieldSecond = formField.nth(1);
        const descriptionField = await fieldSecond.locator("textarea#description").first();
        await expect(descriptionField).toBeVisible();
        await descriptionField.fill('Demo-Activity Description');

        await this.saveBtn.first().click();

    }

    // Task Drag and Drop
    async dragBlock(blockName){

        const dropTarget = this.page.locator('div.reactflow-wrapper');
        const dragap = this.page.locator(`div.block-tray .${blockName}`);
        await dragap.dragTo(dropTarget);
        const dragPartner = this.page.locator(`div.block-tray .${blockName}`);
        await dragPartner.dragTo(dropTarget);
        await dragPartner.hover();
        await this.page.mouse.down();
        await this.page.locator(`div.react-flow__node-${blockName}`).click();
    }

    // Task Define Form
    async fillsDetails(blockName){
        await this.page.locator(`div.react-flow__nodes .react-flow__node-${blockName}`).click();
    }
}

export default NewActivity;