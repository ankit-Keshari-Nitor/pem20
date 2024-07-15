import { Then } from '@cucumber/cucumber';
import ActicityList from '../page_objects/activity/activity-list.po.js';

Then('verify default page {string} is displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageNo, pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.verifyPageNumber(pageNo);
});

Then('verify pagination with default page {string} is displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageNo, pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.pagination(pageNo);
});

Then('verify perpage rows are displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.perPageRows();
});

Then('verify activity current status is final and rollout button is enable', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.rolloutBtnEnable();
})

Then('verify rollout functionality', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.activityRollout();
})

Then('verify activity current status is draft and mark as final button is enable', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.markAsFinalBtnEnable();
})

Then('verify mark as final functionality', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.activityMarkAsFinal();
})

Then('verify activity current status is delete and restore button is enable', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.restoreBtnEnable();
})

Then('verify restore functionality', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.activityRestore();
})

Then('verify to view the activity functionality in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.activityView();
})

Then('verify to edit the activity functionality in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.activityEdit();
})

Then('verify activity version drawer is opened on click of version history icon', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.activityVersionDrawer();
})
