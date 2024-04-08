+++
title = "The importance of tests in our software"
description = "A test is an empirical assertion that demonstrates the behaviour of expected functionality. Examples of test types, suggestions and their importance"
date = 2020-03-20
aliases = ['the-importance-of-the-tests-in-our-software']

[taxonomies]
tags = ['PHP', 'Testing', 'Unit Testing', 'Programming', 'Scalability']

[extra]
static_thumbnail = "/images/2020-03-20/1.png"
subtitle = "Introduction to unit testing with PHP"
+++

## Test Methodologies

### Test-Last

This is the worst methodology and sadly the most common.

It happens when you type the tests AFTER you wrote the production code.

#### Pros:

- At least you have tests (it is dangerous because you can fall into the false sensation of coverage and false
  positives…)

#### Cons:

- It is boring because you already have the sensation you are working on something that is already done

### Test-First

This methodology is when you type the tests BEFORE you wrote the production code.

#### Pros:

- This methodology focuses only on green tests
- It is great for integration tests

#### Cons:

- You do not care so much about a good design of the tests nor the production code

### TDD (test-driven development)

<img src="/images/2020-03-20/5.png" alt="tdd" style="width: 80%">

This methodology is when you type the tests BEFORE you wrote the production code BUT you are refactoring the code as
long as you are working on them.

First, you wrote the test code getting the red light and ONLY then, you work on the implementation to get the green
light. Afterwards, you refactor it and so on.

#### Cons:

- The sensation of slower development
- It requires an important learning curve
- Its implementation is complex in legacy codes

## Unit test resources

We use to say “mock” when we want to reference a test double, but there are actually five different types and mock is
only one of them.

It can really help you understand what you’re trying to accomplish with your test if you know about what you are doing.

### Test doubles

A Test Double is any object that stands in for a real dependency in automated testing. Usually, in PHPUnit, we make test
doubles for other classes, but you can also double built-in PHP functions or closures.

The five types of Test Doubles are:

- **Dummy** — Used only as a placeholder when an argument needs to be filled in
- **Stub** — Provides fake data to the System Under Test
- **Spy** — Records information about how it is used and can provide that information back
- **Mock** — Defines an expectation on how it will be used, and with what parameters. Will cause a test to fail
  automatically if the expectation isn’t met
- **Fake** — An actual implementation of the contract, but is unsuitable for production
