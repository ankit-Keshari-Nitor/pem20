Feature: New Activity Definition 

  Background: 
    Given User navigates to the application
    When User navigates to "Definitions" of "Activities" [App-Nav]  
  
 @current
  Scenario: Verify that user is able to create new activity
    When User clicks on "New" link in [Page]["activities-list"]
    Then User verifies "Workflow" is displayed as current breadscrumb on [Page]["new-activity"]
    Given User fill the definition details for new activity
    Given User drags "PARTNER_TASK" block and fills details on definition tab
    Given User fill the exit validation for "PARTNER_TASK" 
    Given User connects start node to "PARTNER_TASK" node and "PARTNER_TASK" node to end node 
    Given User save the new activity
    Then User verifies activity list page after save completion


  