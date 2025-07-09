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
    Then Felicity sees that the advice includes:
      | Salutation | Status                                 | Prediction                                    | Recommendation              | Incentive | Accept          | Further                    |
      | Hi Chris   | Zone 1 temperatures are well below SLA | IT Load for this zone is predicted to decline | Adjusting the SAT set point | Savings   | Click to Accept | For more detailed analysis |

  Scenario Outline: Facility Manager accepts advice for various zones
    When Felicity accepts the advice about "<Zone>"
    Then She sees that "<Set Point>" is set to <Recommended Value>

    Examples:
      | Zone | Set Point | Recommended Value |
      |    1 | SAT       |              0.85 |
      |    2 | PAT       |              1.75 |
