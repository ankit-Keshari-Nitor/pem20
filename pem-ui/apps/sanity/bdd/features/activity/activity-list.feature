Feature: Activity List

  Background: 
    Given User navigates to the application
    When User navigates to "Definitions" of "Activities" [App-Nav]  

  # @current
  Scenario: Activity List page is loaded
    Then verify "Activity Definition" page is displayed [Page]["activities-list"]
    Then verify default page "1" is displayed in [Page]["activities-list"]
    Then verify pagination with default page "1" is displayed in [Page]["activities-list"]
    Then verify perpage rows are displayed in [Page]["activities-list"]
    Then verify activity current status is final and rollout button is enable
    Then verify rollout functionality
    Then verify activity current status is draft and mark as final button is enable
    Then verify mark as final functionality
    Then verify activity current status is delete and restore button is enable
    Then verify restore functionality
    Then verify to view the activity functionality in [Page]["activities-list"]
    Then verify to edit the activity functionality in [Page]["activities-list"]
    Then verify activity version drawer is opened on click of version history icon