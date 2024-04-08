+++
title = "The testing pyramid"
description = "A post about the testing pyramid and its importance in the software development. The importance of the unit tests, integration tests and UI tests."
date = 2024-04-09

[taxonomies]
tags = ['Programming', 'Test', 'Cohn', 'Pyramid']

[extra]
static_thumbnail = "/images/2024-04-09/1.png"
subtitle = "How to structure your test suite 🗼"
+++

The Testing Pyramid (also known as _Cohn Pyramid_) is a concept that visualizes the ideal distribution of different
types of tests within a testing strategy. It resembles a pyramid with three layers: **unit tests** at the base, followed
by **integration tests** in the middle, and finally, **end-to-end tests** on top.

<img src="/images/2024-04-09/1.png" alt="cohn-pyramid">

### Unit Tests

- Unit tests are small, focused tests that validate the behavior of individual components or units of code in isolation
- They are typically written and executed by developers during the coding process
- Unit tests help ensure that each function, method, or class behaves correctly under various conditions
- Since unit tests are fast to write and execute, they form the broad base of the Testing Pyramid (**ideally 50-60% of
  all tests**)

### Integration Tests

- Integration tests verify interactions between different components or modules of the system
- Unlike unit tests, which isolate specific units of code, integration tests examine how these units work together
- Integration tests ensure that various parts of the system integrate smoothly and communicate effectively
- They are broader in scope than unit tests and may involve testing across multiple layers of the application, such as
  testing database interactions or API endpoints
- Integration tests help identify issues that may arise when different components interact with each other
- They are slower to write and execute than unit tests but are faster than end-to-end tests (**ideally 20-40% of all
  tests**)

### End-to-End Tests

- End-to-end (E2E) tests simulate real user scenarios by testing the entire application from start to finish
- These tests interact with the application as a user would, often through the user interface (UI)
- E2E tests validate the flow of the application and help ensure that all components work together seamlessly in a
  production-like environment
- While end-to-end tests provide the highest level of confidence, they are also the slowest and most brittle tests to
  write and maintain (**ideally 0-10% of all tests**)

## Conclusion

The Testing Pyramid promotes a balanced testing strategy where the majority of tests are fast, focused, and inexpensive
to maintain (unit tests), while fewer tests are allocated to higher layers (integration and end-to-end tests). This
approach ensures efficient test coverage while minimizing the time and effort required for testing, ultimately leading
to faster feedback cycles and more robust software.

<div class="separator"></div>

Also, keep in mind on which kind of the project you are working on - it is not the same working in a legacy rather than
a greenfield project. Depending on it, those values may vary.

In legacy projects which are really coupled to 3rd party libraries like the database, sometimes it is really hard to
write unit tests. The recommendation is to follow the inverse order, I mean, in order to do not break the current
functionality, due to the fragility, it might be worth to write first an integration or an end-to-end tests, and having
this security net, you can then refactorize the code and finally write the unit tests.

