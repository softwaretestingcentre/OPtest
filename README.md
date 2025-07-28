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

Note that there are some test cases that are not runnable - the others are in a "pending" state awaiting step definitions.

### App design

The application is built as simple website pages delivered by Express.

I built the application iteratively using prompts to `Copilot/GPT-4.1`, e.g:

- `Create a webpage to deliver the functionality described in this BDD Feature/Scenario`
- `Create a new dashboard page that matches the attached screenshot`
- `Create an API server that provides an endpoint that supplies all the vertex values for the Environment SLA chart`
- `Update the drawEnvSLAChart function so that it fetches the vertex data from this endpoint`

> It was interesting to watch Copilot refactor its own code - e.g. as I requested more API endpoints, it moved their code out of app.js into separate files in the api folder.

Once the basic functionality was there, I could tweak the design either manually or by using further prompts, e.g:

- `Add a timechart showing energy consumption decreasing over time and the text contained in a floating window`
- `Change the x axis to show the last 8 months`
- `Change the chart line colour to orange and show values descending gradually overall but randomly increasing at times, going from 135 to 95`
- `Make the containers for the set point changes values wider and move them to the right edge`

I also asked for help with specific algorithms:

- `How can I determine if a point is inside a polygon in a canvas element`

> I could have worked this out myself, but it returned the answer instantly - and it worked first time - saving me a huge amount of time and frustration.

### Test Design

In keeping with the Serenity/JS BDD framework, `features` are defined using a small number of steps expressed in business language.

These rely on `step-definitions` which in turn call helper classes either in the Serenity framework or defined under `tests`.

These helper classes will then perform the low-level UI or API interactions that drive the app to meet the expected behaviour.

Following the Screenplay pattern, we have 3 Actors working in different business areas:

| Actor    | Works In            |
| -------- | ------------------- |
| Felicity | Facility Management |
| Des      | Data Science        |
| Como     | Commercial          |

### Test Execution

Any change to the repo will trigger all the tests to run as a Github Action and publish a [SerenityBDD report](https://softwaretestingcentre.github.io/OPtest/) on the `gh-pages` branch
