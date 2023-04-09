+++
title = "Is it a good idea to use Reflection while testing?"
description = "Do our tests get fragile when we use reflection? Do we get coupled to our code when we use it? Which alternatives do we have instead? Is it a good practice?"
date = 2020-04-03

[taxonomies]
tags = ['PHP', 'Testing', 'Reflections', 'Architectural Design', 'Programming']

[extra]
static_thumbnail = "/images/2020-04-03/1.webp"
+++

![the-art-of-programming-meme](/images/2020-04-03/1.webp)

**TL;DR**: No, and let me explain you why.

## It causes bugs when refactoring due to the highly coupling

When we use reflection our tests get too fragile, we are allowing our tests to know so much information about the real
implementation.
We need to hard-code the method name and we are coupling our test method to the production code.
Furthermore, we need to write a lot about boilerplate to test a simple method.

- **Q**: I need to get at least an 80% of code coverage, how can I get it without Reflection class?
- **A**: You should test ONLY your public methods and depend on the variables we pass, we should reach all the possible
  paths.

So, we do not need to test the private methods per se, they are called indirectly from our public functions.

## Comparison between standard and Reflection tests

```php
<?php declare(strict_types=1);

final class Addition
{
    public function simpleOperation(int $number1, int $number2): int
    {
        return $number1 + $number2;
    }
}

final class Operation
{
    public function addition(int $number1, int $number2): int
    {
        $addition = new Addition();
        return $addition->simpleOperation($number1, $number2);
    }
}

final class OperationTest
{
    // Without Reflection.
    public function testSimpleOperationWithoutReflection(): void
    {
        $operation = new Operation();
        $this->assertSame(4, $operation->addition(2, 2));
    }

    // With Reflection.
    public function testSimpleOperationWithReflection(): void
    {
        $addition = $this->createPartialMock(Addition::class, [
            'simpleOperation',
        ]);

        $result = 2 + 2;
        $addition
            ->expects($this->once())
            ->method('simpleOperation')
            ->willReturn($result);

        $operation = new \ReflectionClass(Operation::class);
        $reflection = $operation->invoke($addition);

        $this->assertSame($result, $reflection->addition());
    }
}
```

What would happen if we modified the `simpleOperation()` method from the Addition class to the following and we run the
tests?

```php
final class Addition
{
   public function simpleOperation(int $number1, int $number2): int
   {
       return $number1 - $number2;
   }
}
```

- **Q**: Will the ‘standard’ fail? What about the Reflection one?
- **A**: The standard will fail because we expect 4 as a result but we got a 0.
  However, the reflection one will pass, because we are not focusing on the real implementation, we are creating a false
  positive which can be dangerous.

## Dealing with some problems when not using Reflection

Let me show you a more realistic example (idea from 
[PHPTheRightWay](https://phptherightway.com/pages/Design-Patterns.html)):

```php
<?php declare(strict_types=1);

final class Vehicle
{
    private string $model;
    private int $price;

    public function __construct(string $model)
    {
        $this->model = $model;
        $this->price = mt_rand(1000, 3000);
    }

    public function model(): string
    {
        return $this->model;
    }

    public function price(): int
    {
        return $this->price;
    }
}
```

To test the vehicle’s model is easy, but what about the price?

```php
public function testModel(): void
{
    $model = 'Seat';
    $vehicle = new Vehicle($model);
    $this->assertSame($model, $vehicle->model());
}

public function testPrice(): void
{
    $model = 'Seat';
    $vehicle = new Vehicle($model);
    $this->assertSame(???, $vehicle->price());
}
```

One possible solution could be using the Reflection class to be able to set explicitly the price like:

```php
public function testGetPrice(): void
{
     /** @var Vehicle|MockObject $vehicle */
     $vehicle = $this->createPartialMock(Vehicle::class, []);

     $reflection = new \ReflectionProperty(Vehicle::class, 'price');
     $reflection->setAccessible(true);
     $price = 200;
     $reflection->setValue($vehicle, $price);

     $this->assertSame($price, $vehicle->price());
}
```

But our Vehicle class is final, so we cannot perform this test, also, we said we shouldn’t use the Reflection class, so,
probably we are doing something wrong in this class (TIP: you should make **final** your classes by default 😉).

- **Q**: So what is the problem here?
- **A**: The problem here is that we are performing an action inside the class (on the constructor) to which we do not
  have access from the outside.

One solution could be to inject the value in the constructor like:

```php
<?php declare(strict_types=1);
final class Vehicle
{
    // . . .

    public function __construct(string $model, int $price)
    {
        $this->model = $model;
        $this->price = $price;
    }

    // . . .
}
```

And when we want to create this class, we could pass the final price as:

```php
$vehiclePrice = mt_rand(1000, 3000);
$vehicle = new Vehicle(‘Seat’, $vehiclePrice);
```

So, our price test could be like:

```php
public function testPrice(): void
{
    $price = 200;
    $vehicle = new Vehicle('foo', $price);

    $this->assertSame($price, $vehicle->price());
}
```

To sum up, I don’t recommend you to implement the Reflection class for tests (also for production code).

Defining our classes as `final` helps us to have a better design, not only because it forbid us the use of Reflection,
but also it prevents us from mocking our business logic, which is good.

But about the evil behind the mocking, we will talk in another post.
