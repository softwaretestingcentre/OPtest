Feature: Deployment
The endpoint /api/licence is used by the commercial team to manage deployments on customer sites.

  Scenario: Octaipipe ACE is deployed to a new customer
    Given Como sees that "Acme" has a "valid" licence and version "none"
    When Como deploys Ace to "Acme"
    Then Como sees that "Acme" has the "latest" version of Ace installed
    And Como can see that Ace is "Active" for "Acme"

  Scenario: Octaipipe ACE is updated for an existing customer
    Given Como sees that "DC" has a "valid" licence and version "previous"
    When Como deploys Ace to "DC"
    Then Como sees that "DC" has the "latest" version of Ace installed
    And Como can see that Ace is "Active" for "DC"

  Scenario: Octaipipe ACE is deactivated for an existing customer
    Given Como sees that "OL" has an "expired" licence and version "latest"
    When Como deactivates Ace for "OL"
    Then Como can see that Ace is "Deactivated" for "OL"
    And Como sees that "OL" has "none" version of Ace installed
