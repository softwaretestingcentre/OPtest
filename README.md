# Sample BDD for OP

A few example features and scenarios for OP QA.

Uses the Serenity/JS framework
[![Serenity/JS on GitHub](https://img.shields.io/badge/github-serenity--js-yellow?logo=github)](https://github.com/serenity-js/serenity-js)

And a simple app with basic HTML pages and REST responses to test UI and API interactions

### Installation

The code depends on node v22, so use your version manager to install the correct version before proceeding, e.g:
```
nvm install v22.14.0
```

Once you have the repo code on your computer, run the following command in the directory where you've cloned the project:
```
npm ci
```

Running [`npm ci`](https://docs.npmjs.com/cli/v6/commands/npm-ci) downloads the [Node modules](https://docs.npmjs.com/about-packages-and-modules) this project depends on,
as well the [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-cli) reporter jar. 

### Execution

The project provides several [NPM scripts](https://docs.npmjs.com/cli/v6/using-npm/scripts) defined in [`package.json`](package.json):

```
npm run clean           # removes reports from any previous test run
npm start               # starts a mini HTTP server with a few mock pages and REST reponses
npm test                # executes the example test suite
                        # and generates the report under ./target/site/serenity
```

Note that there are 14 test cases but only 6 are runnable - the others are in a "pending" state awaiting step definitions.

### Design

In keeping with the Serenity/JS BDD framework, `features` are defined using a small number of steps expressed in business language. 

These rely on `step-definitions` which in turn call helper classes either in the Serenity framework or defined under `tests`. 

These helper classes will then perform the low-level UI or API interactions that drive the app to meet the expected behaviour.


Following the Screenplay pattern, we have 3 Actors working in different business areas:

| Actor | Works In |
| ----- | -------- |
| Felicity | Facility Management |
| Des | Data Science |
| Como | Commercial |