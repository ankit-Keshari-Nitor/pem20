import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('User provides definition details to new activity', { timeout: 10 * 1000 }, async function () {
  const field = await this.page.getByLabel('Name');
  await expect(field).toBeVisible();
  field.fill('activity');
  await this.page.getByTestId('save').click();
});

Given('User adds partner task to the new activitie', { timeout: 10 * 1000 }, async function () {
  const dropTarget = this.page.locator('div.reactflow-wrapper');
  const dragap = this.page.locator('div.block-tray .partner');
  await dragap.dragTo(dropTarget);
  const dragPartner = this.page.locator('div.block-tray .partner')
  await dragPartner.dragTo(dropTarget);
  await dragPartner.hover();
  await this.page.mouse.down();
  await this.page.locator('div.react-flow__node-partner');



// ------------------------------------- Edges connection ----------------------------------------------------
//   const nodeSource = await this.page.locator('div.react-flow__node-start div.react-flow__handle-right');
//   await nodeSource.hover();
//   await this.page.mouse.down();

//   const nodeTarget = await this.page.locator('div.react-flow__node-partner div.react-flow__handle-left');
//   await nodeTarget.hover();
//   await this.page.mouse.up();


//   await dropTarget.hover();
//   await this.page.mouse.up();

  //await dropTarget.hover();

  // await expect(field).toBeVisible();
  // field.fill('activity');
  // await page.getByTestId('save').click();
});
