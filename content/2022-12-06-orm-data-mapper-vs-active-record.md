+++
title = "ORM: Data Mapper vs Active Record"
description = "Overview between ORMs (Data Mapper vs Active Record) in PHP using Eloquent & Doctrine, which we will take a look at Repository Pattern and how it helps us."
date = 2022-12-06

[taxonomies]
tags = ["PHP", "Testing", "Orm", "Programming", "Refactoring"]

[extra]
static_thumbnail = "/images/2022-12-06/1.png"
subtitle = "Which one is better and why?"
+++

![a](/images/2022-12-06/1.png)

<!-- more -->

ORM stands for **Object-Relational Mapping**, that is, the technique that transforms Objects from OOP into rows in the
database and vice versa.

There are two patterns:

- **Active Record**: The record (entity) itself can actively change the DB
- **Data Mapper**: There is an external object that persists the entities

> I will skip everything related to the DB setup like the XML configuration files for the Data Mapper and the
_hasOne()_ / _hasMany()_ methods for the Active Record.

## Active Record

As I previously mentioned, the entity itself can be created, updated or deleted. In PHP for example, Eloquent is an
Active Record ORM developed by the Laravel community.

[//]: # (```php)
[//]: # (final class UserCreator)
[//]: # ({)
[//]: # (    public function create&#40;UserInformation $userInfo&#41;: void)
[//]: # (    {)
[//]: # (        $address = Address::createFrom&#40;$userInfo->address&#40;&#41;&#41;;)
[//]: # (        $address->save&#40;&#41; # Address is stored in the database)
[//]: # ()
[//]: # (        $user = User::createFrom&#40;$userInfo->user&#40;&#41;&#41;;)
[//]: # (        $user->address = $address; // Set relationship)
[//]: # (        $user->save&#40;&#41;; # User is stored in the database)
[//]: # (    })
[//]: # (})
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#b48ead;">final class </span><span style="color:#d08770;">UserCreator
</span><span style="color:#343d46;">{
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public function </span><span style="color:#8fa1b3;">create</span><span style="color:#343d46;">(</span><span style="color:#d08770;">UserInformation </span><span>$</span><span style="color:#bf616a;">userInfo</span><span style="color:#343d46;">): </span><span style="color:#d08770;">void
</span><span style="color:#343d46;">    {
</span><span style="color:#343d46;">        </span><span>$</span><span style="color:#bf616a;">address </span><span>= </span><span style="color:#d08770;">Address</span><span style="color:#343d46;">::</span><span style="color:#bf616a;">createFrom</span><span style="color:#343d46;">(</span><span>$</span><span style="color:#bf616a;">userInfo</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">address</span><span style="color:#343d46;">());
</span><span style="color:#343d46;">        </span><span>$</span><span style="color:#bf616a;">address</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">save</span><span style="color:#343d46;">() </span><span style="color:#a7adba;"># Address is stored in the database
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">        </span><span>$</span><span style="color:#bf616a;">user </span><span>= </span><span style="color:#d08770;">User</span><span style="color:#343d46;">::</span><span style="color:#bf616a;">createFrom</span><span style="color:#343d46;">(</span><span>$</span><span style="color:#bf616a;">userInfo</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">user</span><span style="color:#343d46;">());
</span><span style="color:#343d46;">        </span><span>$</span><span style="color:#bf616a;">user</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">address </span><span>= $</span><span style="color:#bf616a;">address</span><span style="color:#343d46;">; </span><span style="color:#a7adba;">// Set relationship
</span><span style="color:#343d46;">        </span><span>$</span><span style="color:#bf616a;">user</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">save</span><span style="color:#343d46;">(); </span><span style="color:#a7adba;"># User is stored in the database
</span><span style="color:#343d46;">    }
</span><span style="color:#343d46;">}
</span></code></pre>

# Data Mapper

In the data mapper, we need an external class that will update the DB. In PHP for example, Doctrine is the de facto Data
Mapper ORM for Symfony.

[//]: # (```php)
[//]: # (final class UserCreator)
[//]: # ({)
[//]: # (    public function __construct&#40;)
[//]: # (        private EntityManager $entityManager,)
[//]: # (    &#41; {})
[//]: # ()
[//]: # (    public function create&#40;UserInformation $userInfo&#41;: void)
[//]: # (    {)
[//]: # (        $address = Address::createFrom&#40;$userInfo->address&#40;&#41;&#41;;)
[//]: # (        $user = User::createFrom&#40;$userInfo->user&#40;&#41;&#41;;)
[//]: # (        $user->address = $address; # Set relationship)
[//]: # ()
[//]: # (        # We persist all objects we want to update)
[//]: # (        $this->entityManager->persist&#40;$address&#41;;)
[//]: # (        $this->entityManager->persist&#40;$user&#41;;)
[//]: # ()
[//]: # (        # Finally, flushing the entity manager will execute the SQLs)
[//]: # (        $this->entityManager->flush&#40;&#41;;)
[//]: # (    })
[//]: # (})
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#b48ead;">final class </span><span style="color:#d08770;">UserCreator
</span><span style="color:#343d46;">{
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public function </span><span style="color:#96b5b4;">__construct</span><span style="color:#343d46;">(
</span><span style="color:#343d46;">        </span><span style="color:#d08770;">private EntityManager </span><span>$</span><span style="color:#bf616a;">entityManager</span><span style="color:#343d46;">,
</span><span style="color:#343d46;">    ) {}
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public function </span><span style="color:#8fa1b3;">create</span><span style="color:#343d46;">(</span><span style="color:#d08770;">UserInformation </span><span>$</span><span style="color:#bf616a;">userInfo</span><span style="color:#343d46;">): </span><span style="color:#d08770;">void
</span><span style="color:#343d46;">    {
</span><span style="color:#343d46;">        </span><span>$</span><span style="color:#bf616a;">address </span><span>= </span><span style="color:#d08770;">Address</span><span style="color:#343d46;">::</span><span style="color:#bf616a;">createFrom</span><span style="color:#343d46;">(</span><span>$</span><span style="color:#bf616a;">userInfo</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">address</span><span style="color:#343d46;">());
</span><span style="color:#343d46;">        </span><span>$</span><span style="color:#bf616a;">user </span><span>= </span><span style="color:#d08770;">User</span><span style="color:#343d46;">::</span><span style="color:#bf616a;">createFrom</span><span style="color:#343d46;">(</span><span>$</span><span style="color:#bf616a;">userInfo</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">user</span><span style="color:#343d46;">());
</span><span style="color:#343d46;">        </span><span>$</span><span style="color:#bf616a;">user</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">address </span><span>= $</span><span style="color:#bf616a;">address</span><span style="color:#343d46;">; </span><span style="color:#a7adba;"># Set relationship
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">        </span><span style="color:#a7adba;"># We persist all objects we want to update
</span><span style="color:#343d46;">        </span><span>$</span><span style="color:#bf616a;">this</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">entityManager</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">persist</span><span style="color:#343d46;">(</span><span>$</span><span style="color:#bf616a;">address</span><span style="color:#343d46;">);
</span><span style="color:#343d46;">        </span><span>$</span><span style="color:#bf616a;">this</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">entityManager</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">persist</span><span style="color:#343d46;">(</span><span>$</span><span style="color:#bf616a;">user</span><span style="color:#343d46;">);
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">        </span><span style="color:#a7adba;"># Finally, flushing the entity manager will execute the SQLs
</span><span style="color:#343d46;">        </span><span>$</span><span style="color:#bf616a;">this</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">entityManager</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">flush</span><span style="color:#343d46;">();
</span><span style="color:#343d46;">    }
</span><span style="color:#343d46;">}
</span></code></pre>

<div class="separator"></div>

So far, the code was very similar in both situations, you have to create a specific entity object, (for simplicity) we
used a `createFrom()` named-constructor in both snippets and we called `save()` or `persist()` and `flush()` depending
on the scenario.

Although, if you take a look at both snippets, you can see already the Data Mapper is using an external
dependency (`Entity Manager` object) which is odd and clearly, is harder if you decide to introduce some tests to
the `UserCreator` class, meanwhile in the `Active Record` class, the entities are saving themselves, so we don’t have
any dependency at a glance, but that is not completely true, the entity itself has knowledge of the DB, and it will be
difficult to write some tests if we use the `User` entity directly.

## Repository Pattern

The repository pattern is a design pattern that hides the database logic into a new class, exposing only the methods we
want to provide to the user.

In order to do this, we need to create an interface and a class that will implement the interface where we will drop all
logic.

```php
<?php

# App/User/Domain
interface UserRepository
{
    public function save(UserInformation $userInfo): void;
}

~~~~

# App/User/Infrastructure
final class ActiveRecordUserRepository implements UserRepository
{
    public function save(UserInformation $userInfo): void
    {
        $address = Address::createFrom($userInfo->address());
        $address->save()

        $user = User::createFrom($userInfo->user());
        $user->address = $address;
        $user->save();
    }
}

final class DataMapperUserRepository implements UserRepository
{
    public function __construct(
        private EntityManager $entityManager,
    ) {}

    public function save(UserInformation $userInfo): void
    {
        $address = Address::createFrom($userInfo->address());
        $user = User::createFrom($userInfo->user());
        $user->address = $address;

        $this->entityManager->persist($address);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}
```

So the last step is to define which class will be resolved when we inject our `UserRepository` interface, and finally,
our `UserCreator` will be like:

[//]: # (```php)
[//]: # (<?php)
[//]: # (final class UserCreator)
[//]: # ({)
[//]: # (    public function __construct&#40;)
[//]: # (        private UserRepository $userRepository,)
[//]: # (    &#41; {})
[//]: # ()
[//]: # (    public function create&#40;UserInformation $userInfo&#41;: void)
[//]: # (    {)
[//]: # (        $this->userRepository->save&#40;$userInfo&#41;;)
[//]: # (    })
[//]: # (})
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#b48ead;">final class </span><span style="color:#d08770;">UserCreator
</span><span style="color:#343d46;">{
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public function </span><span style="color:#96b5b4;">__construct</span><span style="color:#343d46;">(
</span><span style="color:#343d46;">        </span><span style="color:#d08770;">private UserRepository </span><span>$</span><span style="color:#bf616a;">userRepository</span><span style="color:#343d46;">,
</span><span style="color:#343d46;">    ) {}
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public function </span><span style="color:#8fa1b3;">create</span><span style="color:#343d46;">(</span><span style="color:#d08770;">UserInformation </span><span>$</span><span style="color:#bf616a;">userInfo</span><span style="color:#343d46;">): </span><span style="color:#d08770;">void
</span><span style="color:#343d46;">    {
</span><span style="color:#343d46;">        </span><span>$</span><span style="color:#bf616a;">this</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">userRepository</span><span style="color:#343d46;">-&gt;</span><span style="color:#bf616a;">save</span><span style="color:#343d46;">(</span><span>$</span><span style="color:#bf616a;">userInfo</span><span style="color:#343d46;">);
</span><span style="color:#343d46;">    }
</span><span style="color:#343d46;">}
</span></code></pre>

Regarding tests, with the current `UserCreator` implementation, it would be really simple to add a unit test, but it
won’t make sense as the saving logic would be mocked, and the test would provide no value at all.<br>
A functional test where we check the user and the address was actually persisted in the database properly makes more
sense, but I will skip the test as it would add unnecessary complexity to the post 🙂
