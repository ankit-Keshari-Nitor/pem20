import { expect } from '@playwright/test';

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

}

export default ActivityVersionList;