import { Then } from '@cucumber/cucumber';
import ActicityList from '../page_objects/activity/activity-list.po.js';

Then('User verifies default page {string} is displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageNo, pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.verifyPageNumber(pageNo);
});

Then('User verifies pagination with default page {string} is displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageNo, pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.pagination(pageNo);
});

Then('User verifies perpage rows are displayed in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.perPageRows();
});

Then('User verifies activity current status is final and rollout button is enable', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.activityRollout();
})

Then('User verifies activity current status is draft and mark as final button is enable', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.activityMarkAsFinal();
})

Then('User verifies activity current status is delete and restore button is enable', { timeout: 10 * 1000 }, async function () {
    const activityList = new ActicityList(this.page);
    await activityList.activityRestore();
})

Then('user verifies to view the activity in [Page][{string}]', { timeout: 10 * 1000 }, async function (pageId) {
    const activityList = new ActicityList(this.page);
    await activityList.activityView();
})
