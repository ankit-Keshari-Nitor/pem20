Feature: Activity List

  Background: 
    Given User navigates to the application
    When User navigates to "Definitions" of "Activities" [App-Nav]  

  @current
  Scenario: Activity List page is loaded
    Then User verifies "Activity Definition" page is displayed [Page]["activities-list"]
    Then User verifies default page "1" is displayed in [Page]["activities-list"]
    Then User verifies pagination with default page "1" is displayed in [Page]["activities-list"]
    Then User verifies perpage rows are displayed in [Page]["activities-list"]
    Then User verifies activity current status is final and rollout button is enable
    Then User verifies activity current status is draft and mark as final button is enable
    Then User verifies activity current status is delete and restore button is enable
    Then User verifies to view the activity in [Page]["activities-list"]
    Then User verifies to edit the activity in [Page]["activities-list"]
    # Then User verifies the filter 

  