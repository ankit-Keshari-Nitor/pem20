import { Then } from '@cucumber/cucumber';
import ActivityVersionList from '../page_objects/activity/activity-version-list.po.js';
import ActicityList from '../page_objects/activity/activity-list.po.js';


Then('verify the open version drawer by click of version history icon', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    const activityItem = await activityList.activityRow("Final");
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.openVersionDrawer(activityItem);
});

Then('verify activity version list default page {string} is displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageNo, pageId) {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.versionListVerifyPageNumber(pageNo);
});

Then('verify activity version list pagination with default page {string} is displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageNo, pageId) {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.versionPagination(pageNo);
});

Then('verify activity version list perpage rows are displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.versionPerPageRows();
});

Then('verify version current status is final and rollout button is enable', { timeout: 10 * 1000 }, async function () {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.rolloutBtnEnable();
})

Then('verify version rollout functionality', { timeout: 10 * 1000 }, async function () {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.versionRollout();
})

Then('verify version current status is draft and mark as final button is enable', { timeout: 10 * 1000 }, async function () {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.markAsFinalBtnEnable();
})

Then('verify version mark as final functionality', { timeout: 10 * 1000 }, async function () {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.versionMarkAsFinal();
})

Then('verify version current status is delete and restore button is enable', { timeout: 10 * 1000 }, async function () {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.restoreBtnEnable();
})

Then('verify version restore functionality', { timeout: 10 * 1000 }, async function () {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.versionRestore();
})

Then('verify activities version list to view the activity in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.activityVersionView();
})

Then('verify activities version list to edit the activity in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityVersionList = new ActivityVersionList(this.page);
    await activityVersionList.activityVersionEdit();
})