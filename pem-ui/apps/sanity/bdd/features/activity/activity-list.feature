Feature: Activity List

  Background: 
    Given User navigates to the application
    When User navigates to "Definitions" of "Activities" [App-Nav]  

  @current
  Scenario: Activity List page is loaded
    Then verify "Activity Definition" page is displayed [Page]["activities-list"]
    Then verify default page "1" is displayed in [Page]["activities-list"]

    # Activity List page
    Then verify pagination with default page "1" is displayed in [Page]["activities-list"]
    Then verify perpage rows are displayed in [Page]["activities-list"]
    Then verify activity current status is final and rollout button is enable
    Then verify rollout functionality
    Then verify activity current status is draft and mark as final button is enable
    Then verify mark as final functionality
    Then verify activity current status is delete and restore button is enable
    Then verify restore functionality

    # New Activity Create
    When User clicks on "New" link in [Page]["activities-list"]
    Then User verifies "Workflow" is displayed as current breadscrumb on [Page]["new-activity"]
    Given User fill the definition details for new activity

    # For Partner Task
    Given User drags "PARTNER_TASK" block and fills details on definition tab
    Given User fill the exit validation for "PARTNER_TASK" 
    Given User connects start node to "PARTNER_TASK" node and "PARTNER_TASK" node to end node 

    # For Approval Task
    # Given User drags "APPROVAL_TASK" block and fills details on definition tab
    # Given User fill the exit validation for "APPROVAL_TASK" 
    # Given User connects start node to "PARTNER_TASK" node and "APPROVAL_TASK" node to end node

    # For Attribute Task
    # Given User drags "ATTRIBUTE_TASK" block and fills details on definition tab
    # Given User fill the exit validation for "ATTRIBUTE_TASK" 
    # Given User connects start node to "APPROVAL_TASK" node and "ATTRIBUTE_TASK" node to end node

    # For Sponsor Task
    # Given User drags "SPONSOR_TASK" block and fills details on definition tab
    # Given User fill the exit validation for "SPONSOR_TASK" 
    # Given User connects start node to "ATTRIBUTE_TASK" node and "SPONSOR_TASK" node to end node

    # For Custom 
    # Given User drags "CUSTOM" block and fills details on definition tab
    # Given User fill the exit validation for "CUSTOM" 
    # Given User connects start node to "SPONSOR_TASK" node and "CUSTOM" node to end node

    # For System
    # Given User drags "SYSTEM" block and fills details on definition tab
    # Given User fill the exit validation for "SYSTEM" 
    # Given User connects start node to "CUSTOM" node and "SYSTEM" node to end node
    # Given User connects start node to "PARTNER_TASK" node and "SYSTEM" node to end node 

    # Activity save and list page
    Given User save the new activity
    Then User verifies activity list page after save completion
    
    # View and Edit Feature
    Then verify to view the activity functionality in [Page]["activities-list"]
    Then verify to edit the activity functionality in [Page]["activities-list"]

    # Version Drawer
    Then verify activity version drawer is opened on click of version history icon
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