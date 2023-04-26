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

## 1. What is a test?

A test is an empirical assertion that demonstrates the behaviour of an expected functionality from something.

<!-- more -->

![the-art-of-programming-meme](/images/2020-03-20/1.png)

The tests are classified by what they verify, the most important ones are the following:

### Functional tests

- Unit test
- Component test
- Integration test
- System test
- Smoke test
- Non-functional test

### Compatibility test

- Security test
- Stress test
- Usability test

A software needs all of them, but the most important concerning developers are unit, integration and functional tests.

## 2. Differences between test types

### Unit test

<img src="/images/2020-03-20/2.png" alt="given-when-then" style="width: 80%">

What is a unit test? We could consider, in our context, a public method from one API class. That means, a unit test is a
verification between the current input and expected output, it is an isolated logic and decoupled from the outside. It
is recommendable to use interfaces in order to invert the dependencies in our application (~DIP: Dependency Inversion
Principle).

Indeed, we can also depend on external dependencies using mocks or stubs.

The benefit of using unit test is that they took less time on execution, for that reason, they can be launched more
often. Also, they force you to write less coupled code, doing better software design.

So, a unit test is, therefore, the demonstration of an isolated functionality from the outside.

The unit tests give you:

- A simple way to test your code exhaustively and independently
- They command you to the portion of code that causes the problem

A test is not a unit test if…

- it performs queries to the database
- it connects in any way with the network
- it operates with a file system
- it cannot be launched in parallel with other unit tests
- you need to modify any file (config file for example) to be able to run it

They are also known as ‘white box testing’. We know the internal code from the method.

The tests are focused on the object state.

There are frameworks for automatizing this task, the most popular is the xUnit family: JUnit, PHPUnit…

### Integration test

The integration tests are similar to the units except that they are focused on proving the interaction between two or
more components together, they could be classes, modules, etc…

Further, this kind of tests can connect to the database, to the network, filesystem, etc.

The integration tests are slower than unit tests due to their complexity, besides, sometimes it’s needed to load
specific configuration in order to work properly.

These kinds of tests are dependent on the environment, I mean, if a test fails, the problem could be a different
configuration from one environment to another.

You can even create integration tests with PHPUnit, the `Unit` in the name is just a convention.

### Functional test

The functional tests are called end-to-end (E2E) or browser testing.

These kinds of tests do not check the how, but the what, I mean, if that specific test executes some magic but the
expected result is whatever we want.

In other words, we do not care what the developer did, we care about the output as we were the client.

<img src="/images/2020-03-20/3.png" alt="functional-test" style="width: 80%">

For example, if we send a form with a wrong value, we expect to see an error message in a specific field, we do not care
about what regular expression is and why it failed.

Those tests are also known as “black-box testing”. We do not know the code we are testing. They focus on object
behaviour.

One of the best known is Selenium.

## 3. Cohn pyramid

<img src="/images/2020-03-20/4.png" alt="cohn-pyramid" style="width: 80%">

There are different test types as we have just seen, even each one is focused on a particular issue from the
application.

At the pyramid bottom, the **unit tests** are accommodated, in the middle the **integration** ones and on the top the
**UI** tests.

The **unit tests** should represent the majority of them. Those tests give specific and really fast feedback to the user
(50%-60%).

The **integration tests** are slower than the units and are focused on complex tasks like HTTP requests, database
connections, cache operations and other stuff which require some application load (20%-40%).

Lastly, the **UI tests** at the pyramid top (0%-10%).

Those tests are the most delicate, took a lot of time and they are harder to write and maintain.

- When we said they are delicate, we mean they are too coupled to the source code and a minimal change in the code could
  provoke a failing test
- They took so much time to be executed; they used to apply a crawler object, which consists of a browser emulator that
  is capable of seeing the status page, clicking on some buttons, reading any DOM element and so on. Indeed, it is
  harder to find the failure in an ‘end-to-end’ test because they are unforeseen and took more time

It is not the same legacy as a greenfield project.

Depending on it, those values may vary.

In legacy projects which are really coupled to 3rd party libraries like the database, sometimes it is really hard to
write unit tests. The recommendation is to do the inverse, creating first integration tests to check you do not break
something and then re-factorize the code with unit tests step by step.

## 4. Methodologies

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

## 5. Unit test resources

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
