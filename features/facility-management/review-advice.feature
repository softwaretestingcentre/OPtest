Feature: Review advice
Octaipipe provides advice to Facility Managers to help them with site Management
The advice should read as natural language, summarizing the site evaluation
The advice includes some elements of:
- Site status
- Short term predictions
- Recommended actions
- Incentives
The FM can accept the advice or view more detailed analysis

  Background:
    Given Felicity has opened their portal
    # Reference site restored to known state

  Scenario: Facility Manager reviews TimeMachine advice
    When Felicity views the "TimeMachine" Explainer
    Then Felicity sees that the advice includes:
      | Clause         | Expectation                                   |
      | Salutation     | Hi Chris                                      |
      | Status         | Zone 1 temperatures are well below SLA        |
      | Prediction     | IT Load for this zone is predicted to decline |
      | Recommendation | Adjusting the SAT set point                   |
      | Objective      | Savings                                       |
      | Action         | Click to Accept                               |
      | Further        | For more detailed analysis                    |

  Scenario: Facility Manager reviews AgentRecommendation advice
    When Felicity views the "AgentRecommendation" Explainer
    Then Felicity sees that the advice includes:
      | Clause     | Expectation                                                              |
      | Metric     | supply air temperature                                                   |
      | Change     | from 22°C to 23°C                                                        |
      | Impact     | each 0.5°C rise in supply air setpoint can cut chiller energy by 2 to 3% |
      | Constraint | moderate IT load                                                         |
      | Margin     | approximately 2°C of safe margin                                         |
      | Standard   | ISO50001                                                                 |
      | Objective  | avoiding unnecessarily low supply temperatures                           |

  Scenario: Facility Manager reviews SLA Boundaries
    When Felicity views the SLA Boundaries
    Then Felicity sees that the SLA Zones match:
      | Metric    | Zone        |
      | Current   | Comfortable |
      | Projected | Allowable   |

  Scenario Outline: Facility Manager accepts advice for various zones
    When Felicity accepts the advice about "<Zone>"
    Then She sees that "<Set Point>" is set to <Recommended Value>

    Examples:
      | Zone | Set Point | Recommended Value |
      |    1 | SAT       |              0.85 |
      |    2 | PAT       |              1.75 |
