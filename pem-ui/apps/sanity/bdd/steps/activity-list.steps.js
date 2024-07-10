import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Then('User verifies default pagesize {string} is displayed in [Page][{string}]', async function (pageSize, pageId) {     
    const pageSizeElement = await this.page.locator('.cds--select__item-count .cds--select-input');
    await expect(pageSizeElement).toHaveValue(pageSize);
});

Then('User verifies default page {string} is displayed in [Page][{string}]', async function (pageNo, pageId) {     
    const pageNoElement = await this.page.locator('.cds--select__page-number .cds--select-input');
    await expect(pageNoElement).toHaveValue(pageNo);
});