import { Then } from '@cucumber/cucumber';
import ActivityVersionList from '../page_objects/activity/activity-version-list.po.js';
import ActicityList from '../page_objects/activity/activity-list.po.js';


Then('Open version drawer on click of version history icon', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    const activityItem = await activityList.activityRow("Final");
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.openVersionDrawer(activityItem);
});

Then('User verifies activity version list default page {string} is displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageNo, pageId) {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.versionListVerifyPageNumber(pageNo);
});

Then('User verifies activity version list pagination with default page {string} is displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageNo, pageId) {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.versionPagination(pageNo);
});

Then('User verifies activity version list perpage rows are displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.versionPerPageRows();
});

Then('User verifies activities version list to view the activity in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.activityVersionView();
})

Then('User verifies activities version list to edit the activity in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.activityVersionEdit();
})