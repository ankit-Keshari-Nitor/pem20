Feature: Activity List

  Background: 
    Given User navigates to the application
    When User navigates to "Definitions" of "Activities" [App-Nav]  

  @current
  Scenario: Activity Version List page is loaded
    Then verify "Activity Definition" page is displayed [Page]["activities-list"]
    Then verify the open version drawer by click of version history icon
    Then verify activity version list default page "1" is displayed in [Page]["activities-version-list"]
    Then verify activity version list pagination with default page "1" is displayed in [Page]["activities-list"]
    Then verify activity version list perpage rows are displayed in [Page]["activities-list"]
    Then verify version current status is final and rollout button is enable
    Then verify version rollout functionality
    Then verify version current status is draft and mark as final button is enable
    Then verify version mark as final functionality
    Then verify version current status is delete and restore button is enable
    Then verify version restore functionality
    Then verify activities version list to view the activity in [Page]["activities-list"]
    Then verify activities version list to edit the activity in [Page]["activities-list"]