Feature: Critique Octaipipe advice
The advisor is an LLM agent, therefore:
- The output may not be deterministic
- The output may differ between runs
- The output may differ as the base model is updated
- The advisor should indicate its level of confidence

  Scenario Outline: Explainer recommendations are consistent between runs
    Given There are archive results for "<Site>"
    When Des generates recommendations for "<Site>"
    Then Des sees that the recommendations for "<Site>" are consistent over time

    Examples:
      | Site                         |
      | Equinox Erasmus              |
      | GlobalSwatch Galactica       |
      | Amazin Web Services Atlantia |

  Scenario Outline: Explainer recommendations are consistent after the base model is updated
    Given Des updates the base model from "1.3" to "1.4"
    When Des generates recommendations for "Site 1"
    Then Des sees that the advice for "<Zone>" is for "<Set Point>" to be "<Recommended Value>"

    Examples:
      | Zone | Set Point | Recommended Value |
      |    1 | SAT       |              0.85 |
      |    2 | PAT       |              1.75 |
