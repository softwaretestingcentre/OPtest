Feature: Site Management

As a Facility Manager, I want to:
View my site performance
View my site projections
Configure the system
Manage the Cooling AI
Manage Cooling Approval
View Cooling SLAs


Background:
    Given Felicity has logged into Octaipipe


Scenario: Facility Manager can view Site KPIs
    When Felicity views the home page
    Then she sees KPIs based on recent data
        | KPI | Expected Value |
        | PUE | 1.3 |
