import { expect } from '@playwright/test';

class ActicityList {
    constructor(page) {
        this.page = page;

        // DataTable
        this.tableData = this.page.locator('.cds--data-table-content');

        // Paginaion 
        this.paginationSelection = this.page.locator('.cds--select__page-number .cds--select-input');
        this.forwardcdsPage = this.page.locator('.cds--pagination__button--forward');
        this.backwardPage = this.page.locator('.cds--pagination__button--backward');

        // PerPage
        this.perPageItem = this.page.locator('.cds--select__item-count .cds--select-input');

        this.currentPage = this.page.locator('.shell-breadscrumb-container .cds--breadcrumb-item--current a');
        this.activityMenu = this.page.locator('.cds--header__menu-bar li a');

    }
    // Verify the page Number
    async verifyPageNumber(pageNo) {

        // On Which page you are
        const pageSizeElement = await this.paginationSelection
        await expect(pageSizeElement).toHaveValue(pageNo);
    }

    // Paginations
    async pagination(pageNo) {

        const pageSizeElement = await this.paginationSelection;
        // Forward(Next) page
        const nextPage = String(Number(pageNo) + 1);
        await this.forwardcdsPage.click();
        await expect(pageSizeElement).toHaveValue(nextPage);

        // BackWard(Previous) page
        await this.backwardPage.click();
        await expect(pageSizeElement).toHaveValue(pageNo);
    }

    // Per Page Rows
    async perPageRows() {

        // ROW COUNT
        const defaultItemCount = await this.perPageItem;
        const countRow = await this.tableData.locator('tr').count();
        await expect(defaultItemCount).toHaveValue(String(countRow - 1));
    }

    // Find Activity Row By Current Status
    async activityRow(currentStatus) {

        await this.page.waitForTimeout(10);
        const row = await this.tableData.locator('tr');
        const countRow = await row.count();
        for (let i = 1; i < countRow; i++) {
            const cells = await row.nth(i).locator('td').nth(2).locator('span').innerText();
            if (cells === currentStatus) {
                return row.nth(i);
            }
        }
    }

    // Activity RollOut
    async activityRollout() {

        await this.page.waitForTimeout(10);
        const finalStatusRow = await this.activityRow("Final");
        const activityName = await finalStatusRow.locator('td').nth(0).locator('.information-text').innerText();
        const btn = await finalStatusRow.locator('td').nth(4).locator('.action-item-rollout')
        const btnName = await btn.innerText();
        expect(btnName).toContain('Rollout')

        // // RollOut Action
        await btn.click();
        const modal = await this.page.locator('.is-visible .cds--modal-header__heading');
        const text = await modal.innerText();
        await expect(text).toContain(activityName);
        await this.page.locator('.is-visible .cds--modal-close-button button').click();

    }

    // Activity Mark As Final
    async activityMarkAsFinal() {

        await this.page.waitForTimeout(10);
        const drafStatusRow = await this.activityRow("Draft");
        const btn = await drafStatusRow.locator('td').nth(4).locator('.action-item-mark-as-final');
        const btnName = await btn.innerText();
        expect(btnName).toContain('Mark As Final')

        // Mark As Final Action
        await btn.click();
        const modal = await this.page.locator('.is-visible .cds--modal-header__heading');
        const text = await modal.innerText();
        await expect(text).toContain("Confirmation");
        await this.page.locator('.is-visible .cds--modal-close-button button').click();
    }

    // Activity Restore
    async activityRestore() {

        await this.page.waitForTimeout(10);
        const drafStatusRow = await this.activityRow("Delete");
        const btn = await drafStatusRow.locator('td').nth(4).locator('.action-item-restore');
        const btnName = await btn.innerText();
        expect(btnName).toContain('Restore')

        // Restore Action
    }

    // Back To Main Activity List Page
    async backToActivityPage(subMenu, menu) {

        await this.activityMenu.filter({ hasText: menu }).click();
        await this.page.locator('.cds--side-nav__item a .cds--side-nav__link-text').filter({ hasText: subMenu }).click();
        await this.page.locator('[data-testid="side-nav-toggle-button"]').click();
    }

    // Activity View From Ellipse
    async activityView() {

        await this.page.waitForTimeout(10);
        const drafRow = await this.activityRow("Draft");
        const btn = await drafRow.locator('td').nth(5).locator('.cds--overflow-menu__wrapper button');
        await btn.click();
        await this.page.locator('ul.cds--overflow-menu-options--open .activity-view-overflow-menu').click();

        const menuName = await this.currentPage.innerText();
        await expect(menuName).toContain("Workflow");
        await this.backToActivityPage("Definitions", "Activities");

    }

    // Activity Edit From Ellipse
    async activityEdit(){
        await this.page.waitForTimeout(10);
        const drafRow = await this.activityRow("Draft");
        const btn = await drafRow.locator('td').nth(5).locator('.cds--overflow-menu__wrapper button');
        await btn.click();
        await this.page.locator('ul.cds--overflow-menu-options--open .activity-edit-overflow-menu').click();

        const menuName = await this.currentPage.innerText();
        await expect(menuName).toContain("Workflow");
        await this.backToActivityPage("Definitions", "Activities");
    }
}

export default ActicityList;