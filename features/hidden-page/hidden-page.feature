Feature: Juice Shop has a hidden pages

  Scenario Outline: Haxxor opens the hidden pages
    When she opens the "<Hidden Page>"
    Then she sees she has solved the "<Hidden Page>" challenge

    Examples:
      | Hidden Page    |
      | Score Board    |
      | Privacy Policy |
