Feature: Activity List

  Background: 
    Given User navigates to the application
    When User navigates to "Definitions" of "Activities" [App-Nav]  

  @current
  Scenario: Activity List page is loaded
    Then verifies "Activity Definition" page is displayed [Page]["activities-list"]
    Then verifies default page "1" is displayed in [Page]["activities-list"]
    Then verifies pagination with default page "1" is displayed in [Page]["activities-list"]
    Then verifies perpage rows are displayed in [Page]["activities-list"]
    Then verifies activity current status is final and rollout button is enable
    Then Verifies rollout functionality
    Then verifies activity current status is draft and mark as final button is enable
    Then Verifies mark as final functionality
    Then verifies activity current status is delete and restore button is enable
    Then verifies to view the activity functionality in [Page]["activities-list"]
    Then verifies to edit the activity functionality in [Page]["activities-list"]
    Then verifies activity version drawer is opened on click of version history icon