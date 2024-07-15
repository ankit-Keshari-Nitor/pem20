import { Then } from '@cucumber/cucumber';
import ActicityList from '../page_objects/activity/activity-list.po.js';

Then('verifies default page {string} is displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageNo, pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.verifyPageNumber(pageNo);
});

Then('verifies pagination with default page {string} is displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageNo, pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.pagination(pageNo);
});

Then('verifies perpage rows are displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.perPageRows();
});

Then('verifies activity current status is final and rollout button is enable', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.rolloutBtnEnable();
})

Then('Verifies rollout functionality', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.activityRollout();
})

Then('verifies activity current status is draft and mark as final button is enable', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.markAsFinalBtnEnable();
})

Then('Verifies mark as final functionality', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.activityMarkAsFinal();
})

Then('verifies activity current status is delete and restore button is enable', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.restoreBtnEnable();
})

Then('verifies to view the activity functionality in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.activityView();
})

Then('verifies to edit the activity functionality in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.activityEdit();
})

Then('verifies activity version drawer is opened on click of version history icon', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.activityVersionDrawer();
})
