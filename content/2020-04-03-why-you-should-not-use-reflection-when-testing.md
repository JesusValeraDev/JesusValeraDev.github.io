+++
title = "Why you should not use Reflection when testing"
description = "Do our tests get fragile when we use reflection? Do we get coupled to our code when we use it? Which alternatives do we have instead? Is it a good practice?"
date = 2020-04-03
aliases = ['is-it-a-good-idea-to-use-reflection-while-testing']

[taxonomies]
tags = ['PHP', 'Testing', 'Reflections', 'Architectural Design', 'Programming']

[extra]
static_thumbnail = "/images/2020-04-03/1.png"
subtitle = "with some code examples"
+++

![the-art-of-programming-meme](/images/2020-04-03/1.png)

<!-- more -->

## It causes bugs when refactoring due to the high coupling

When we use reflection our tests get too fragile, we are allowing our tests to know so much information about the real
implementation.
We need to hard-code the method name, and we are coupling our test method to the production code.
Furthermore, we need to write a lot about boilerplate to test a simple method.

- **Q**: I need to get at least 80% of code coverage, how can I get it without the Reflection class?
- **A**: You should test ONLY your public methods and depending on the variables we pass, we should reach all the possible
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
        return (new Addition())->simpleOperation($number1, $number2);
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

[//]: # (```php)
[//]: # (final class Addition)
[//]: # ({)
[//]: # (   public function simpleOperation&#40;int $number1, int $number2&#41;: int)
[//]: # (   {)
[//]: # (       return $number1 - $number2;)
[//]: # (   })
[//]: # (})
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#b48ead;">final class </span><span style="color:#d08770;">Addition
</span><span style="color:#343d46;">{
</span><span style="color:#343d46;">   </span><span style="color:#b48ead;">public function </span><span style="color:#8fa1b3;">simpleOperation</span><span style="color:#343d46;">(</span><span style="color:#b48ead;">int </span><span style="color:#bf616a;">$number1</span><span style="color:#343d46;">, </span><span style="color:#b48ead;">int </span><span style="color:#bf616a;">$number2</span><span style="color:#343d46;">): </span><span style="color:#b48ead;">int
</span><span style="color:#343d46;">   {
</span><span style="color:#343d46;">       </span><span style="color:#b48ead;">return </span><span style="color:#bf616a;">$number1 </span><span>- </span><span style="color:#bf616a;">$number2</span><span style="color:#343d46;">;
</span><span style="color:#343d46;">   }
</span><span style="color:#343d46;">}
</span></code></pre>

- **Q**: Will the ‘standard’ fail? What about the Reflection one?
- **A**: The standard will fail because we expect 4 as a result, but we got a 0.
  However, the reflection will pass, because we are not focusing on the real implementation, we are creating a false
  positive which can be dangerous.

## Dealing with some problems when not using Reflection

Let me show you a more realistic example (idea from 
[PHPTheRightWay](https://phptherightway.com/pages/Design-Patterns.html)):

[//]: # (```php)
[//]: # (final readonly class Vehicle)
[//]: # ({)
[//]: # (    public string $model;)
[//]: # (    public int $price;)
[//]: # ()
[//]: # (    public function __construct&#40;string $model&#41;)
[//]: # (    {)
[//]: # (        $this->model = $model;)
[//]: # (        $this->price = random_int&#40;1000, 3000&#41;;)
[//]: # (    })
[//]: # (})
[//]: # (```)

<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#b48ead;">final readonly class </span><span style="color:#d08770;">Vehicle
</span><span style="color:#343d46;">{
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public </span><span style="color:#d08770;">string </span><span style="color:#bf616a;">$model</span><span style="color:#343d46;">;
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public </span><span style="color:#d08770;">int </span><span style="color:#bf616a;">$price</span><span style="color:#343d46;">;
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public function </span><span style="color:#96b5b4;">__construct</span><span style="color:#343d46;">(</span><span style="color:#b48ead;">string </span><span style="color:#bf616a;">$model</span><span style="color:#343d46;">)
</span><span style="color:#343d46;">    {
</span><span style="color:#343d46;">        </span><span style="color:#bf616a;">$this</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">model </span><span>= </span><span style="color:#bf616a;">$model</span><span style="color:#343d46;">;
</span><span style="color:#343d46;">        </span><span style="color:#bf616a;">$this</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">price </span><span>= </span><span style="color:#96b5b4;">random_int</span><span style="color:#343d46;">(</span><span style="color:#d08770;">1000</span><span style="color:#343d46;">, </span><span style="color:#d08770;">3000</span><span style="color:#343d46;">);
</span><span style="color:#343d46;">    }
</span><span style="color:#343d46;">}
</span></code></pre>

To test the vehicle’s model is easy, but what about the price?

[//]: # (```php)
[//]: # (public function testModel&#40;&#41;: void)
[//]: # ({)
[//]: # (    $model = 'Seat';)
[//]: # (    $vehicle = new Vehicle&#40;$model&#41;;)
[//]: # ()
[//]: # (    $this->assertSame&#40;$model, $vehicle->model&#40;&#41;&#41;;)
[//]: # (})
[//]: # ()
[//]: # (public function testPrice&#40;&#41;: void)
[//]: # ({)
[//]: # (    $model = 'Seat';)
[//]: # (    $vehicle = new Vehicle&#40;$model&#41;;)
[//]: # ()
[//]: # (    $this->assertSame&#40; ¿¿?? , $vehicle->price&#40;&#41;&#41;;)
[//]: # (})
[//]: # (```)

<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php"><code class="language-php" data-lang="php"><span style="color:#b48ead;">public function </span><span style="color:#8fa1b3;">testModel</span><span>(): </span><span style="color:#d08770;">void
</span><span>{
</span><span>    </span><span style="color:#bf616a;">$model </span><span>= '</span><span style="color:#a3be8c;">Seat</span><span>';
</span><span>    </span><span style="color:#bf616a;">$vehicle </span><span>= </span><span style="color:#b48ead;">new </span><span style="color:#d08770;">Vehicle</span><span>(</span><span style="color:#bf616a;">$model</span><span>);
</span><span>
</span><span>    </span><span style="color:#bf616a;">$this</span><span>-&gt;</span><span style="color:#bf616a;">assertSame</span><span>(</span><span style="color:#bf616a;">$model</span><span>, </span><span style="color:#bf616a;">$vehicle</span><span>-&gt;</span><span style="color:#bf616a;">model</span><span>());
</span><span>}
</span><span>
</span><span style="color:#b48ead;">public function </span><span style="color:#8fa1b3;">testPrice</span><span>(): </span><span style="color:#d08770;">void
</span><span>{
</span><span>    </span><span style="color:#bf616a;">$model </span><span>= '</span><span style="color:#a3be8c;">Seat</span><span>';
</span><span>    </span><span style="color:#bf616a;">$vehicle </span><span>= </span><span style="color:#b48ead;">new </span><span style="color:#d08770;">Vehicle</span><span>(</span><span style="color:#bf616a;">$model</span><span>);
</span><span>
</span><span>    </span><span style="color:#bf616a;">$this</span><span>-&gt;</span><span style="color:#bf616a;">assertSame</span><span>( ¿¿?? , </span><span style="color:#bf616a;">$vehicle</span><span>-&gt;</span><span style="color:#bf616a;">price</span><span>());
</span><span>}
</span></code></pre>

One possible solution could be using the Reflection class to be able to set explicitly the price like:

[//]: # (```php)
[//]: # (public function testGetPrice&#40;&#41;: void)
[//]: # ({)
[//]: # (     /** @var Vehicle|MockObject $vehicle */)
[//]: # (     $vehicle = $this->createPartialMock&#40;Vehicle::class, []&#41;;)
[//]: # ()
[//]: # (     $reflection = new \ReflectionProperty&#40;Vehicle::class, 'price'&#41;;)
[//]: # (     $reflection->setAccessible&#40;true&#41;;)
[//]: # (     $price = 200;)
[//]: # (     $reflection->setValue&#40;$vehicle, $price&#41;;)
[//]: # ()
[//]: # (     $this->assertSame&#40;$price, $vehicle->price&#40;&#41;&#41;;)
[//]: # (})
[//]: # (```)

<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php"><code class="language-php" data-lang="php"><span style="color:#b48ead;">public function </span><span style="color:#8fa1b3;">testGetPrice</span><span>(): </span><span style="color:#d08770;">void
</span><span>{
</span><span>     </span><span style="color:#a7adba;">/** </span><span style="color:#b48ead;">@var</span><span style="color:#a7adba;"> Vehicle|MockObject $vehicle */
</span><span>     </span><span style="color:#bf616a;">$vehicle </span><span>= </span><span style="color:#bf616a;">$this</span><span>-&gt;</span><span style="color:#bf616a;">createPartialMock</span><span>(</span><span style="color:#d08770;">Vehicle</span><span>::</span><span style="color:#d08770;">class</span><span>, []);
</span><span>
</span><span>     </span><span style="color:#bf616a;">$reflection </span><span>= </span><span style="color:#b48ead;">new </span><span>\</span><span style="color:#d08770;">ReflectionProperty</span><span>(</span><span style="color:#d08770;">Vehicle</span><span>::</span><span style="color:#d08770;">class</span><span>, '</span><span style="color:#a3be8c;">price</span><span>');
</span><span>     </span><span style="color:#bf616a;">$reflection</span><span>-&gt;</span><span style="color:#bf616a;">setAccessible</span><span>(</span><span style="color:#d08770;">true</span><span>);
</span><span>     </span><span style="color:#bf616a;">$price </span><span>= </span><span style="color:#d08770;">200</span><span>;
</span><span>     </span><span style="color:#bf616a;">$reflection</span><span>-&gt;</span><span style="color:#bf616a;">setValue</span><span>(</span><span style="color:#bf616a;">$vehicle</span><span>, </span><span style="color:#bf616a;">$price</span><span>);
</span><span>
</span><span>     </span><span style="color:#bf616a;">$this</span><span>-&gt;</span><span style="color:#bf616a;">assertSame</span><span>(</span><span style="color:#bf616a;">$price</span><span>, </span><span style="color:#bf616a;">$vehicle</span><span>-&gt;</span><span style="color:#bf616a;">price</span><span>());
</span><span>}
</span></code></pre>

But our Vehicle class is final, so we cannot perform this test, also, we said we shouldn’t use the Reflection class, so,
probably we are doing something wrong in this class (TIP: you should make **final** your classes by default 😉).

- **Q**: So what is the problem here?
- **A**: The problem here is that we are performing an action inside the class (on the constructor) to which we do not
  have access from the outside.

One solution could be to inject the value in the constructor like:

[//]: # (```php)
[//]: # (<?php)
[//]: # (final readonly class Vehicle)
[//]: # ({)
[//]: # (    public function __construct&#40;)
[//]: # (        public string $model,)
[//]: # (        public int $price,)
[//]: # (    &#41; {)
[//]: # (    })
[//]: # (})
[//]: # (```)

<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#b48ead;">final </span><span style="color:#d08770;">readonly </span><span style="color:#b48ead;">class </span><span style="color:#d08770;">Vehicle
</span><span style="color:#343d46;">{
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public function </span><span style="color:#96b5b4;">__construct</span><span style="color:#343d46;">(
</span><span style="color:#343d46;">        </span><span style="color:#d08770;">public </span><span style="color:#b48ead;">string </span><span style="color:#bf616a;">$model</span><span style="color:#343d46;">,
</span><span style="color:#343d46;">        </span><span style="color:#d08770;">public </span><span style="color:#b48ead;">int </span><span style="color:#bf616a;">$price</span><span style="color:#343d46;">,
</span><span style="color:#343d46;">    ) {
</span><span style="color:#343d46;">    }
</span><span style="color:#343d46;">}
</span></code></pre>

And when we want to create this class, we could pass the final price as:

[//]: # (```php)
[//]: # ($vehiclePrice = random_int&#40;1000, 3000&#41;;)
[//]: # ($vehicle = new Vehicle&#40;‘Seat’, $vehiclePrice&#41;;)
[//]: # (```)

<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php"><code class="language-php" data-lang="php"><span style="color:#bf616a;">$vehiclePrice </span><span>= </span><span style="color:#96b5b4;">random_int</span><span>(</span><span style="color:#d08770;">1000</span><span>, </span><span style="color:#d08770;">3000</span><span>);
</span><span style="color:#bf616a;">$vehicle </span><span>= </span><span style="color:#b48ead;">new </span><span style="color:#d08770;">Vehicle</span><span>(‘</span><span style="color:#d08770;">Seat</span><span>’, </span><span style="color:#bf616a;">$vehiclePrice</span><span>);
</span></code></pre>

So, our price test could be like:

[//]: # (```php)
[//]: # (public function testPrice&#40;&#41;: void)
[//]: # ({)
[//]: # (    $price = 200;)
[//]: # (    $vehicle = new Vehicle&#40;'foo', $price&#41;;)
[//]: # ()
[//]: # (    $this->assertSame&#40;$price, $vehicle->price&#40;&#41;&#41;;)
[//]: # (})
[//]: # (```)

<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#b48ead;">public function </span><span style="color:#8fa1b3;">testPrice</span><span>(): </span><span style="color:#d08770;">void
</span><span>{
</span><span>    </span><span style="color:#bf616a;">$price </span><span>= </span><span style="color:#d08770;">200</span><span>;
</span><span>    </span><span style="color:#bf616a;">$vehicle </span><span>= </span><span style="color:#b48ead;">new </span><span style="color:#d08770;">Vehicle</span><span>('</span><span style="color:#a3be8c;">foo</span><span>', </span><span style="color:#bf616a;">$price</span><span>);
</span><span>
</span><span>    </span><span style="color:#bf616a;">$this</span><span>-&gt;</span><span style="color:#bf616a;">assertSame</span><span>(</span><span style="color:#bf616a;">$price</span><span>, </span><span style="color:#bf616a;">$vehicle</span><span>-&gt;</span><span style="color:#bf616a;">price</span><span>());
</span><span>}
</span></code></pre>

To sum up, I don’t recommend using the Reflection class anywhere in your code unless you are very aware of what you are
doing, usually, there are alternative implementations to what you want to achieve without using it.

![stone-figures](/images/2020-04-03/2.png)

Additionally, defining our classes as `final` helps us to have a better design, not only because it forbid us the use of
Reflection, but also it prevents us from mocking our business logic, which is good.
