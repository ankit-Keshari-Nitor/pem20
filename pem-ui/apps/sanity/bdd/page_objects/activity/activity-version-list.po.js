import { expect } from '@playwright/test';
import ActicityList from '../page_objects/activity/activity-list.po.js';
class ActivityVersionList {
    constructor(page){
        
        this.page = page;

        // Table Data
        this.tableData = this.page.locator('[data-testid="drawer"] .cds--data-table-content');

        // Drawer Header
        this.versionDrawerHeader = this.page.locator('div.headers-drawer');

        // Pagination
        this.paginationSelection = this.page.locator('[data-testid="drawer"] .cds--select__page-number .cds--select-input');
        this.forwardcdsPage = this.page.locator('[data-testid="drawer"] .cds--pagination__button--forward');
        this.backwardPage = this.page.locator('[data-testid="drawer"] .cds--pagination__button--backward');
        this.perPageItem = this.page.locator('[data-testid="drawer"] .cds--select__item-count .cds--select-input');

        this.versionView = this.page.locator('ul.cds--overflow-menu-options--open .activity-view-overflow-menu');
        this.versionEdit = this.page.locator('ul.cds--overflow-menu-options--open .activity-edit-overflow-menu');
    }

    // Open Version Drawer
    async openVersionDrawer(row) {
        await row.locator('td').nth(3).locator('.cds--popover--high-contrast').click();
    }

    // Verify default page
    async versionListVerifyPageNumber(pageNo) {
        const pageSizeElement = await this.paginationSelection
        await expect(pageSizeElement).toHaveValue(pageNo);
    }

    // Pagination
    async versionPagination(pageNo) {
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
    async versionPerPageRows() {
        const defaultItemCount = await this.perPageItem;
        const countRow = await this.tableData.locator('tr').count();
        await expect(defaultItemCount).toHaveValue(String(countRow - 1));
    }

    async activityVersionRow(currentStatus) {

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

    // Activity Version View From Ellipse
    async activityVersionView() {

        await this.page.waitForTimeout(10);
        const drafRow = await this.activityVersionRow("Draft");
        const btn = await drafRow.locator('td').nth(4).locator('.cds--overflow-menu__wrapper button');
        await btn.click();
        await this.versionView.click();

        const menuName = await this.currentPage.innerText();
        await expect(menuName).toContain("Workflow");
        const activityList = new ActicityList(this.page);
        await activityList.backToActivityPage("Definitions", "Activities");

    }

    // Activity Version Edit From Ellipse
    async activityVersionEdit() {
        await this.page.waitForTimeout(10);
        const drafRow = await this.activityVersionRow("Draft");
        const btn = await drafRow.locator('td').nth(4).locator('.cds--overflow-menu__wrapper button');
        await btn.click();
        await this.versionEdit.click();

        const menuName = await this.currentPage.innerText();
        await expect(menuName).toContain("Workflow");
        const activityList = new ActicityList(this.page);
        await activityList.backToActivityPage("Definitions", "Activities");
    }

}

export default ActivityVersionList;