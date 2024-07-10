Feature: Activity List

  Background: 
    Given User navigates to the application
    When User navigates to "Definitions" of "Activities" [App-Nav]  

  @current
  Scenario: Activity List page is loaded
    Then User verifies "Activity Definition" page is displayed [Page]["activities-list"]
    Then User verifies default pagesize "10" is displayed in [Page]["activities-list"]
    Then User verifies default page "1" is displayed in [Page]["activities-list"]
  