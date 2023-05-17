+++
title = "How does the Service Container work?"
description = "What is a service container and how does it work? Let's answer these questions and create one from scratch"
date = 2022-10-21

[taxonomies]
tags = ['Service Container', 'Binding', 'Laravel', 'Symfony', 'Programming']

[extra]
static_thumbnail = "/images/2022-10-21/1.png"
subtitle = ""
+++

![acropolis-greece](/images/2022-10-21/1.png)

<!-- more -->

A _Service Container_ is basically a class that behaves like a _box_, we can think of it as a _singleton_ object (but it
is not, it is simply an object that is instantiated by the framework while it is being bootstrapped), on which we can
declare all of our dependencies to be resolved automatically by the framework.

The role of a _Service Container_ is to define which classes (with their inner dependencies) should be resolved
automatically.

Usually, frameworks like Symfony or Laravel brings already a bunch of interfaces that will resolve automatically
specific classes. So, for `\Psr\Log\LoggerInterface` there is somewhere a class that implements this interface
like `Monolog` or any other.

Let's imagine we have a service whose dependency is a `UserRepository` (this dependency belongs to our use case, so it
is not defined in the framework), additionally, depending on the environment, we want to inject
a `PostgreSQLUserRepository` or a `InMemoryUserRespository` instance.

> This post will be based on the two most popular PHP frameworks (Symfony & Laravel), but the idea works for any other
> programming language/framework.

## Symfony

We can define our services as `php` or `yaml` file extension (you can define this configuration directly in
the `src/Kernel.php` file).

[//]: # (```php)
[//]: # (<?php)
[//]: # (# config/services.php)
[//]: # (namespace Symfony\Component\DependencyInjection\Loader\Configurator;)
[//]: # ()
[//]: # (return function&#40;ContainerConfigurator $containerConfigurator&#41; {)
[//]: # (    $services = $containerConfigurator->services&#40;&#41;;)
[//]: # ()
[//]: # (    $services->set&#40;)
[//]: # (        \App\Domain\UserRepository::class,)
[//]: # (        \App\Infrastructure\PostgreSQLUserRepository::class)
[//]: # (    &#41;;)
[//]: # (};)
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#a7adba;"># config/services.php
</span><span>
</span><span style="color:#b48ead;">namespace </span><span>Symfony\Component\DependencyInjection\Loader\Configurator;
</span><span>
</span><span style="color:#b48ead;">return function</span><span>(</span><span style="color:#d08770;">ContainerConfigurator </span><span style="color:#bf616a;">$containerConfigurator</span><span>) {
</span><span>    </span><span style="color:#bf616a;">$services </span><span>= </span><span style="color:#bf616a;">$containerConfigurator</span><span>-&gt;</span><span style="color:#bf616a;">services</span><span>();
</span><span>
</span><span>    </span><span style="color:#bf616a;">$services</span><span>-&gt;</span><span style="color:#bf616a;">set</span><span>(
</span><span>        \App\Domain\</span><span style="color:#d08770;"><b>UserRepository</b></span><span>::</span><span style="color:#d08770;">class</span><span>,
</span><span>        \App\Infrastructure\</span><span style="color:#d08770;"><b>PostgreSQLUserRepository</b></span><span>::</span><span style="color:#d08770;">class
</span><span>    );
</span><span>};
</span></code></pre>

Alternatively, we can define a different instance for the _testing_ environment:

[//]: # (```php)
[//]: # (<?php)
[//]: # (# config/services_test.yml)
[//]: # (namespace Symfony\Component\DependencyInjection\Loader\Configurator;)
[//]: # ()
[//]: # (return function&#40;ContainerConfigurator $containerConfigurator&#41; {)
[//]: # (    $services = $containerConfigurator->services&#40;&#41;;)
[//]: # ()
[//]: # (    $services->set&#40;)
[//]: # (        \App\Domain\UserRepository::class,)
[//]: # (        \App\Infrastructure\InMemoryUserRespository::class)
[//]: # (    &#41;;)
[//]: # (};)
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#a7adba;"># config/services_test.yml
</span><span>
</span><span style="color:#b48ead;">namespace </span><span>Symfony\Component\DependencyInjection\Loader\Configurator;
</span><span>
</span><span style="color:#b48ead;">return function</span><span>(</span><span style="color:#d08770;">ContainerConfigurator </span><span style="color:#bf616a;">$containerConfigurator</span><span>) {
</span><span>    </span><span style="color:#bf616a;">$services </span><span>= </span><span style="color:#bf616a;">$containerConfigurator</span><span>-&gt;</span><span style="color:#bf616a;">services</span><span>();
</span><span>
</span><span>    </span><span style="color:#bf616a;">$services</span><span>-&gt;</span><span style="color:#bf616a;">set</span><span>(
</span><span>        \App\Domain\</span><span style="color:#d08770;"><b>UserRepository</b></span><span>::</span><span style="color:#d08770;">class</span><span>,
</span><span>        \App\Infrastructure\</span><span style="color:#d08770;"><b>InMemoryUserRespository</b></span><span>::</span><span style="color:#d08770;">class
</span><span>    );
</span><span>};
</span></code></pre>

## Laravel

In Laravel, however, you can do this in the `AppServiceProvider` class.

[//]: # (```php)
[//]: # (namespace App\Providers;)
[//]: # ()
[//]: # (final class AppServiceProvider extends ServiceProvider)
[//]: # ({)
[//]: # (    public function register&#40;&#41;: void)
[//]: # (    {)
[//]: # (        if &#40;env&#40;'APP_ENV'&#41; === 'test'&#41; {)
[//]: # (            $this->app->bind&#40;)
[//]: # (                App\Domain\UserRepository::class,)
[//]: # (                App\Infra\InMemoryUserRespository::class)
[//]: # (            &#41;;)
[//]: # (        } else {)
[//]: # (            $this->app->bind&#40;)
[//]: # (                App\Domain\UserRepository::class,)
[//]: # (                App\Infra\PostgreSQLUserRepository::class)
[//]: # (            &#41;;)
[//]: # (        })
[//]: # (    })
[//]: # ()
[//]: # (    public function boot&#40;&#41;: void)
[//]: # (    {)
[//]: # (        // ...)
[//]: # (    })
[//]: # (})
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#b48ead;">namespace </span><span>App\Providers;
</span><span>
</span><span style="color:#b48ead;">final class </span><span style="color:#d08770;">AppServiceProvider </span><span style="color:#b48ead;">extends </span><span style="color:#a3be8c;">ServiceProvider
</span><span style="color:#343d46;">{
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public function </span><span style="color:#8fa1b3;">register</span><span style="color:#343d46;">(): </span><span style="color:#d08770;">void
</span><span style="color:#343d46;">    {
</span><span style="color:#343d46;">        </span><span style="color:#b48ead;">if </span><span style="color:#343d46;">(</span><span style="color:#bf616a;">env</span><span style="color:#343d46;">(</span><span>'</span><span style="color:#a3be8c;">APP_ENV</span><span>'</span><span style="color:#343d46;">) </span><span>=== '</span><span style="color:#a3be8c;">test</span><span>'</span><span style="color:#343d46;">) {
</span><span style="color:#343d46;">            </span><span style="color:#bf616a;">$this</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">app</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">bind</span><span style="color:#343d46;">(
</span><span style="color:#343d46;">                App\Domain\</span><span style="color:#d08770;">UserRepository</span><span style="color:#343d46;">::</span><span style="color:#d08770;">class</span><span style="color:#343d46;">,
</span><span style="color:#343d46;">                App\Infra\</span><span style="color:#d08770;">InMemoryUserRespository</span><span style="color:#343d46;">::</span><span style="color:#d08770;">class
</span><span style="color:#343d46;">            );
</span><span style="color:#343d46;">        } </span><span style="color:#b48ead;">else </span><span style="color:#343d46;">{
</span><span style="color:#343d46;">            </span><span style="color:#bf616a;">$this</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">app</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">bind</span><span style="color:#343d46;">(
</span><span style="color:#343d46;">                App\Domain\</span><span style="color:#d08770;">UserRepository</span><span style="color:#343d46;">::</span><span style="color:#d08770;">class</span><span style="color:#343d46;">,
</span><span style="color:#343d46;">                App\Infra\</span><span style="color:#d08770;">PostgreSQLUserRepository</span><span style="color:#343d46;">::</span><span style="color:#d08770;">class
</span><span style="color:#343d46;">            );
</span><span style="color:#343d46;">        }
</span><span style="color:#343d46;">    }
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public function </span><span style="color:#8fa1b3;">boot</span><span style="color:#343d46;">(): </span><span style="color:#d08770;">void
</span><span style="color:#343d46;">    {
</span><span style="color:#343d46;">        </span><span style="color:#a7adba;">// ...
</span><span style="color:#343d46;">    }
</span><span style="color:#343d46;">}
</span></code></pre>

### Injecting the dependencies in our services

So, from now on, the next time we try to inject our interface `UserRepository` as a dependency in the constructor of
another class, eg:

[//]: # (```php)
[//]: # (<?php)
[//]: # (final class UserCreator)
[//]: # ({)
[//]: # (    public function __construct&#40;)
[//]: # (        private UserRepository $userRepository,)
[//]: # (    &#41; {})
[//]: # ()
[//]: # (    // ...)
[//]: # (})
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#b48ead;">final class </span><span style="color:#d08770;">UserCreator
</span><span style="color:#343d46;">{
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public function </span><span style="color:#96b5b4;">__construct</span><span style="color:#343d46;">(
</span><span style="color:#343d46;">        </span><span style="color:#d08770;">private UserRepository </span><span style="color:#bf616a;">$userRepository</span><span style="color:#343d46;">,
</span><span style="color:#343d46;">    ) {}
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">    </span><span style="color:#a7adba;">// ...
</span><span style="color:#343d46;">}
</span></code></pre>

The framework will handle it, checking firstly if we defined in our service provider the injected class and creating a
new instance of it. In case this class has any dependency, the framework will resolve them automatically recursively by
reflection until the class is ready, in case any dependency cannot be resolved or the dependency is a primitive, and we
didn't define the value, it will throw an exception.

<div class="separator"></div>

Let’s go deeper into the technical details, how could you create such a dependency resolver? This is how we did in
Gacela ([link](https://github.com/gacela-project/container/blob/d3f0714306cbe1e77707741a4146411d84539f2a/src/Container/DependencyResolver.php)),
and this is a simplified version of it:

[//]: # (```php)
[//]: # (final class DependencyResolver)
[//]: # ({)
[//]: # (    /** @var array<class-string,mixed> */)
[//]: # (    private array $container;)
[//]: # ()
[//]: # (    public function resolve&#40;string $className&#41;: object)
[//]: # (    {)
[//]: # (        $reflectionClass = new ReflectionClass&#40;$className&#41;;)
[//]: # (        $constructor = $reflectionClass->getConstructor&#40;&#41;;)
[//]: # ()
[//]: # (        # If constructor is empty, we can do a `new $className&#40;&#41;`)
[//]: # (        if &#40;null === $constructor&#41; {)
[//]: # (            return $reflectionClass->newInstance&#40;&#41;;)
[//]: # (        })
[//]: # ()
[//]: # (        # If not empty, let's resolve the class dependencies)
[//]: # (        $dependencies = [];)
[//]: # (        foreach &#40;$constructor->getParameters&#40;&#41; as $parameter&#41; {)
[//]: # (            $paramName = $parameter->getType&#40;&#41;?->getName&#40;&#41;;)
[//]: # (            $dependencies[] = $this->container[$paramName])
[//]: # (                ?? $this->resolve&#40;$paramName&#41;; # 🌀 Recursion)
[//]: # (        })
[//]: # ()
[//]: # (        # Finally, we store in the container the resolved class)
[//]: # (        $class = $reflectionClass->newInstanceArgs&#40;$dependencies&#41;;)
[//]: # (        $this->container[$className] = $class;)
[//]: # ()
[//]: # (        return $class;)
[//]: # (    })
[//]: # (})
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#b48ead;">final class </span><span style="color:#d08770;">DependencyResolver
</span><span style="color:#343d46;">{
</span><span style="color:#343d46;">    </span><span style="color:#a7adba;">/** </span><span style="color:#b48ead;">@var</span><span style="color:#a7adba;"> array&lt;class-string,mixed&gt; */
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">private </span><span style="color:#d08770;">array </span><span style="color:#bf616a;">$container</span><span style="color:#343d46;">;
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public function </span><span style="color:#8fa1b3;">resolve</span><span style="color:#343d46;">(</span><span style="color:#b48ead;">string </span><span style="color:#bf616a;">$className</span><span style="color:#343d46;">): </span><span style="color:#b48ead;">object
</span><span style="color:#343d46;">    {
</span><span style="color:#343d46;">        </span><span style="color:#bf616a;">$reflectionClass </span><span>= </span><span style="color:#b48ead;">new </span><span style="color:#d08770;">ReflectionClass</span><span style="color:#343d46;">(</span><span style="color:#bf616a;">$className</span><span style="color:#343d46;">);
</span><span style="color:#343d46;">        </span><span style="color:#bf616a;">$constructor </span><span>= </span><span style="color:#bf616a;">$reflectionClass</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">getConstructor</span><span style="color:#343d46;">();
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">        </span><span style="color:#a7adba;"># If constructor is empty, we can do a `new $className()`
</span><span style="color:#343d46;">        </span><span style="color:#b48ead;">if </span><span style="color:#343d46;">(</span><span style="color:#d08770;">null </span><span>=== </span><span style="color:#bf616a;">$constructor</span><span style="color:#343d46;">) {
</span><span style="color:#343d46;">            </span><span style="color:#b48ead;">return </span><span style="color:#bf616a;">$reflectionClass</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">newInstance</span><span style="color:#343d46;">();
</span><span style="color:#343d46;">        }
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">        </span><span style="color:#a7adba;"># If not empty, let's resolve the class dependencies
</span><span style="color:#343d46;">        </span><span style="color:#bf616a;">$dependencies </span><span>= </span><span style="color:#343d46;">[];
</span><span style="color:#343d46;">        </span><span style="color:#b48ead;">foreach </span><span style="color:#343d46;">(</span><span style="color:#bf616a;">$constructor</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">getParameters</span><span style="color:#343d46;">() </span><span>as </span><span style="color:#bf616a;">$parameter</span><span style="color:#343d46;">) {
</span><span style="color:#343d46;">            </span><span style="color:#bf616a;">$paramName </span><span>= </span><span style="color:#bf616a;">$parameter</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">getType</span><span style="color:#343d46;">()?-&gt;</span><span style="color:#bf616a;">getName</span><span style="color:#343d46;">();
</span><span style="color:#343d46;">            </span><span style="color:#bf616a;">$dependencies</span><span style="color:#343d46;">[] </span><span>= </span><span style="color:#bf616a;">$this</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">container</span><span style="color:#343d46;">[</span><span style="color:#bf616a;">$paramName</span><span style="color:#343d46;">]
</span><span style="color:#343d46;">                ?? </span><span style="color:#bf616a;">$this</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">resolve</span><span style="color:#343d46;">(</span><span style="color:#bf616a;">$paramName</span><span style="color:#343d46;">); </span><span style="color:#a7adba;"># 🌀 Recursion
</span><span style="color:#343d46;">        }
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">        </span><span style="color:#a7adba;"># Finally, we store in the container the resolved class
</span><span style="color:#343d46;">        </span><span style="color:#bf616a;">$class </span><span>= </span><span style="color:#bf616a;">$reflectionClass</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">newInstanceArgs</span><span style="color:#343d46;">(</span><span style="color:#bf616a;">$dependencies</span><span style="color:#343d46;">);
</span><span style="color:#343d46;">        </span><span style="color:#bf616a;">$this</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">container</span><span style="color:#343d46;">[</span><span style="color:#bf616a;">$className</span><span style="color:#343d46;">] </span><span>= </span><span style="color:#bf616a;">$class</span><span style="color:#343d46;">;
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">        </span><span style="color:#b48ead;">return </span><span style="color:#bf616a;">$class</span><span style="color:#343d46;">;
</span><span style="color:#343d46;">    }
</span><span style="color:#343d46;">}
</span></code></pre>

This is the idea of what a framework does under the hood; ideally, we should use a cache layer.
Using reflection takes a lot of resources, and it is very slow; additionally, we are not taking into consideration
different scenarios like what to do depending on whether the resolved parameter is a primitive or even a callable.

![parthenon-greece](/images/2022-10-21/2.png)

## Reference:

- [Symfony — Service Container](https://symfony.com/doc/current/service_container.html)
- [Laravel — Service Container](https://laravel.com/docs/9.x/container#binding-primitives)
- [Gacela — Bindings](https://gacela-project.com/docs/bootstrap/#bindings)