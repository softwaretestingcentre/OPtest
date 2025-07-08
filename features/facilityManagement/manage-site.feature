Feature: Site Management
  As a Facility Manager, I want to:
    View my site performance
    View my site projections
    Configure the system
    Manage the Cooling AI
    Manage Cooling Approval
    View Cooling SLAs

  Scenario: Facility Manager sees current KPIs
    Given Felicity has opened their portal
    When they check their KPIs
    Then they see that the KPI data is current
      | KPI | Expected Value |
      | Due | $50.00         |
