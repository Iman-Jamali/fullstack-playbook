# Github Actions

## Overview

It is a continuous integration and continuous delivery (CI/CD) platform which allows you to automate your build, test and deployment pipeline.

## Github Actions Components

Github Actions can be configured to be triggered when an event occurs in your repository.

### Workflows

- A workflow is a configurable automated process that will run one or more jobs.
  - defined by YAML
  - Stored under `.github/workflows` directory in a repository.
    - a repository can have multiple workflows
    - You can reference a workflow within another workflow
  - triggered by
    - An event in your repository
    - Manually
    - At a defined schedule

### Events

An event is a specific activity in a repository that triggers a workflow run.

A workflow can be be triggered [List of all triggers events](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows):

- By an activity originated from GitHub Repository
  - creates a pull request
  - Opens an issue
  - Pushes a commit to a repository.
  - Merge a PR
- A workflow Can also be triggered by:
  - A schedule
  - Posting to a REST API
  - Manually

### Jobs

A job is a set of steps in a workflow that execute on the same runner. Each step is either a shell script that will be executed, or an action that will be run. Steps are executed in order and are dependent on each other. Since each step is executed on the same runner, you can share data from one step to another. For example, you can have a step that builds your application followed by a step that tests the application that was built.

You can configure a job's dependencies with other jobs; by default, jobs have no dependencies and run in parallel with each other. When a job takes a dependency on another job, it will wait for the dependent job to complete before it can run. For example, you may have multiple build jobs for different architectures that have no dependencies, and a packaging job that is dependent on those jobs. The build jobs will run in parallel, and when they have all completed successfully, the packaging job will run.

### Actions

An action is a custom application for the GitHub Actions platform that performs a complex but frequently repeated task. Use an action to help reduce the amount of repetitive code that you write in your workflow files. An action can pull your git repository from GitHub, set up the correct toolchain for your build environment, or set up the authentication to your cloud provider.

You can write your own actions, or you can find actions to use in your workflows in the GitHub Marketplace.

### Runners

A runner is a server that runs your workflows when they're triggered. Each runner can run a single job at a time. GitHub provides Ubuntu Linux, Microsoft Windows, and macOS runners to run your workflows; each workflow run executes in a fresh, newly-provisioned virtual machine. GitHub also offers larger runners, which are available in larger configurations. For more information, see "Using larger runners." If you need a different operating system or require a specific hardware configuration, you can host your own runners.
