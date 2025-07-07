Feature: Commercial can deploy to customer sites
The OctaiPipe platform (http://app.ace.octaipipe.ai) is used by the
commercial team to manage deployments on customer sites.

  Scenario: Octaipipe ACE is deployed to a new customer
    Given Acme has obtained a licence
    When Como deploys Ace to Acme
    Then Acme has the latest version of Ace installed

  Scenario: Octaipipe ACE is updated for an existing customer
    Given DC has a valid licence
    When Como deploys Ace to DC
    Then DC has the latest version of Ace installed

  Scenario: Octaipipe ACE is deactivated for an existing customer
    Given OL has an expired licence
    When Como checks the status of Ace at OL
    Then He can see that Ace is deactivated
