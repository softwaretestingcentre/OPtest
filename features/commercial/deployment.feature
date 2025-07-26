Feature: Deployment
The OctaiPipe platform (http://app.ace.octaipipe.ai) is used by the
commercial team to manage deployments on customer sites.

  Scenario: Octaipipe ACE is deployed to a new customer
    Given Como sees that "Acme" has a "valid" licence
    # When Como deploys Ace to Acme
    Then Como sees that "Acme" has the "latest" version of Ace installed

  Scenario: Octaipipe ACE is updated for an existing customer
    Given Como sees that "DC" has a "valid" licence
    # When Como deploys Ace to DC
    Then Como sees that "DC" has the "latest" version of Ace installed

  Scenario: Octaipipe ACE is deactivated for an existing customer
    Given Como sees that "OL" has an "expired" licence
    # When Como checks the status of Ace at OL
    Then Como can see that Ace is "Deactivated" for "OL"
