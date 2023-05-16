+++
title = "Why and How to decouple your classes"
description = "Some frameworks embrace you to using their own helpers, but this has some negative impact on your code and we will take a look at it in this post."
date = 2022-08-17

[taxonomies]
tags = ['PHP', 'Solid', 'Decoupling', 'Dependency Inversion', 'OOP']

[extra]
static_thumbnail = "/images/2022-08-17/1.png"
subtitle = ""
+++

![caravaca-fuentes-marques-1](/images/2022-08-17/1.png)

<!-- more -->

There are some ways to couple your code, some frameworks like Laravel embrace you to do using their own _façades_ or
even using _ORM_ as _ActiveRecord_, but this is also possible using PHP native methods like `time()` beyond others.

Unfortunately, in the long run, if you don't invert the dependencies, the code will get messy faster/easier, hurting
your application. To avoid this, you must write tests. Writing tests help you realize how coupled is your business logic
to infrastructure code.

## Examples of classes that should be decoupled

### Belongs to the Programming language itself like

- I/O functions like `fopen()`, `file_exists()`, `file_put_contents()`…
- Network related like `curl_init()`, `http_response_code()`, `setcookie()`…
- Relative to time like `date()`, `time()`, `microtime()`…
- System like `getenv()`, `exec()`, `system()`…

### Belongs to the infrastructure code like

- Framework classes like Laravel Façades
- Database (Active Record or raw queries instead of `Repository` pattern)
- Third-party services like `Monolog`, `Mandrill`, `Salesforce`…

## Decoupling a real example

For the next example, let’s try to use a Laravel facade and a PHP function.

Imagine we have the following service, and we really want to invert the dependencies. As you can see, we have the
`trans()` facade and the `date()` PHP function.

namespace Infrastructure;

```php
namespace Infrastructure;

final class WelcomeController
{
    /**
     * Output: "hello {$name} @ {Y-m-d}"
     */
    public function __invoke(string $name): string
    {
        return trans('messages.welcome', [
            'name' => $name,
            'date' => date('Y-m-d'),
        ]);
    }
}
```

The first thing we should do is to move the `trans()` Laravel function logic to a different service, in order to do
that, we have to introduce an interface as follows:

```php
namespace Domain;

interface TranslatorInterface
{
   function trans(string $message, string ...$placeholders): string;
}
```

And we can place in this class the original Laravel implementation.

```php
namespace Infrastructure;

final class LaravelTranslator implements TranslatorInterface
{
   public function trans(string $message, string ...$placeholders)
   {
      return trans($message, ...$placeholders);
   }
}
```

So, from this point on, we are able to switch the translator class to our Laravel custom one or a third-party one by
implementing the `TranslatorInterface`.

Finally, we can inject the new `Translator` service in our `Controller` defining in the service container which
implementation we want to resolve when the framework faces the `TranslatorInterface` in the constructor.

namespace Infrastructure;

```php
namespace Infrastructure;

final class WelcomeController
{
    public function __construct(
        private TranslatorInterface $translator,
    ) {}

    public function __invoke(Request $request): void
    {
        $name = $request->get('name');
        return $this->translator->trans(
            'messages.welcome',
            ['name' => $name, 'date' => date('Y-m-d')],
       );
    }
}
```

The next step is to do the same but with the `date()` method.

```php
namespace Domain;

interface DateInterface
{
   function toString(): string;
}
```

And the PHP implementation:

```php
namespace Infrastructure;

final class SystemDate implements DateInterface
{
    public function toString(): string
    {
        return date('Y-m-d');
    }
}
```

Let’s do the same as we did previously, but this time we can inject our own `SystemDate` implementation through the
`DateInterface` interface.

```php
namespace Infrastructure;

final class WelcomeController
{
    public function __construct(
        private TranslatorInterface $translatorService,
        private DateInterface $date,
    ) {}

    public function __invoke(Request $request): void
    {
        $name = $request->get('name');
        return $this->translatorService->trans(
            'messages.welcome',
            ['name' => $name, 'date' => $this->date->toString()],
       );
    }
}
```

> ⚠️ Do not forget to add both mapping interfaces between `TranslatorInterface` and `LaravelTranslator`, and
> `DateInterface` and `SystemDate` in the `ServiceProvider` class.

Finally, we are up to creating our controller test.

```php
namespace Test/Infrastructure;

final class WelcomeControllerTest
{
    public function test_invoke(): void
    {
        $translate = new LaravelTranslator();

        $date = $this->createStub(DateInterface::class);
        $date->method('toString')->willReturn('2022-02-22');

        $request = $this->createStub(Request::class);
        $request->method('get')->willReturn('World');

        $controller = new WelcomeController($translate, $date);
        $response = $controller->__invoke($request);

        self::assertSame('hello World @ 2022-02-22', $response);
    }
}
```

![caravaca-fuentes-marques-2](/images/2022-08-17/2.png)