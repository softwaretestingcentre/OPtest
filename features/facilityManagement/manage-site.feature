Feature: Site Management
As a Facility Manager, I want to:
    View my site performance
    View my site projections
    Configure the system
    Manage the Cooling AI
    Manage Cooling Approval
    View Cooling SLAs

  Scenario: Facility Manager can view Site KPIs
    Given Felicity has logged into ACE
    When Felicity views their portal
    Then she sees KPIs based on recent data
      | KPI | Expected Value |
      | PUE |            1.3 |
