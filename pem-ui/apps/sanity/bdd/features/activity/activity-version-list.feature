Feature: Activity List

  Background: 
    Given User navigates to the application
    When User navigates to "Definitions" of "Activities" [App-Nav]  

#   @current
  Scenario: Activity List page is loaded
    Then User verifies "Activity Definition" page is displayed [Page]["activities-list"]
    Then Open version drawer on click of version history icon
    Then User verifies activity version list default page "1" is displayed in [Page]["activities-version-list"]
    Then User verifies activity version list pagination with default page "1" is displayed in [Page]["activities-list"]
    Then User verifies activity version list perpage rows are displayed in [Page]["activities-list"]
    Then User verifies activities version list to view the activity in [Page]["activities-list"]
    Then User verifies activities version list to edit the activity in [Page]["activities-list"]