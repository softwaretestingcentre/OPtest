Feature: Review Octaipipe advice
Octaipipe provides advice to Facility Managers to help them with site Management
The advice should read as natural language, summarizing the site model outputs
The advice includes some elements of:
- Site status
- Short term predictions
- Recommended actions
- Incentives
The FM can accept the advice or view more detailed analysis

  Background:
    Given Felicity has logged into Octaipipe

  Scenario: Facility Manager views advice
    When Felicity views the Explainer
    Then She sees up to date advice
      | Status                            | Prediction           | Recommendation           | Incentive    |
      | Zone 1 temperatures are below SLA | IT Load is declining | Adjust the SAT set point | Cost Savings |

  Scenario Outline: Facility Manager accepts advice for various zones
    When Felicity accepts the advice about "<Zone>"
    Then "<Set Point>" is set to <Recommended Value>

    Examples:
      | Zone | Set Point | Recommended Value |
      |    1 | SAT       |              0.85 |
      |    2 | PAT       |              1.75 |
