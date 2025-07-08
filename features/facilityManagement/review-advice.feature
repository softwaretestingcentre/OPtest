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
    Given Felicity has opened their portal

  Scenario Outline: Facility Manager views advice
    When Felicity views the Explainer
    Then She sees that the advice about <Area> includes <Advice>

    Examples:
      | Area           | Advice                                        |
      | Status         | Zone 1 temperatures are well below SLA        |
      | Prediction     | IT Load for this zone is predicted to decline |
      | Recommendation | Adjusting the SAT set point                   |
      | Incentive      | Cost Savings                                  |

  Scenario Outline: Facility Manager accepts advice for various zones
    When Felicity accepts the advice about "<Zone>"
    Then "<Set Point>" is set to <Recommended Value>
    Examples:
      | Zone | Set Point | Recommended Value |
      |    1 | SAT       |              0.85 |
      |    2 | PAT       |              1.75 |
