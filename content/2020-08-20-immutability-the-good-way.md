+++
title = "Immutability, the good way"
description = "Pactical examples of immutability in PHP"
date = 2020-08-20
draft = true

[taxonomies]
tags = ['PHP', 'Immutability', 'Good Practices', 'Programming', 'OOP']

[extra]
static_thumbnail = "/images/2020-08-20/1.png"
subtitle = "Practical examples of immutability in PHP"
+++

A **mutable** object can be modified after its creation, an **immutable** cannot.

<img alt="parliament-budapest" src="/images/2020-08-20/1.png" style="width: 100%"/>
<br>

<!-- more -->

An immutable object will remain in the same state as it was created. Design and implementation will be much easier and
consistent. In the case of problems, locate a potential bug is faster due that it won’t have side-effects.

Although, creating immutable objects sometimes require more code, and it doesn’t fit in all scenarios (entities need to
be mutable for example).

## Mutability examples and their impacts

```php
<?php

final  class ProductTransfer
{
    public function __construct(
        public string $name,
        public float $price,
        public array $tags,
        public \DateTime $releaseDate,
    ) {}

    public function toString(): string
    {
        return sprintf(
            'Name: %s\nPrice: %.2f\nTags: {%s}\nRelease date: %s\n',
            $this->name,
            $this->price,
            implode(', ', $this->tags),
            $this->releaseDate->format('Y-m-d')
        );
    }
}

---

(new ProductTransfer(
    name: 'Asus 452X',
    price: 1024.5,
    tags: ['computer', 'asus'],
    releaseDate: \DateTime::createFromFormat('Y-m-d', '1999-12-31')
))->toString();

*** OUTPUT ***

> Name: Asus 452X
> Price: 1024.50
> Tags: {computer, asus}
> Release date: 1999-12-31
```

We are going to store some object properties in a different variable. We will modify their values and finally print the
variable and the object itself.

## Modifying the name (being a string)

```php
<?php

$name = $product->name;
$name = 'Acer FC-288';

echo "Modified name: {$name}" . PHP_EOL;
echo $product->toString();

*** OUTPUT ***

> Modified name: <b>Acer FC-288</b>

> Name: Asus 452X
> Price: 1024.50
> Tags: {computer, asus}
> Release date: 1999-12-31
```

Strings in PHP are copied by value, therefore. When we modify the variable $name the original value from $product->name
will remain the same.

## Modifying the price (being a number)

```php
<?php

$price = $product->price;
$price = 1.0;

echo "Modified price: {$price}" . PHP_EOL;
echo $product->toString();

*** OUTPUT ***

> Modified price: <b>1.0</b>

> Name: Asus 452X
> Price: 1024.50
> Tags: {computer, asus}
> Release date: 1999-12-31
```

Numbers in PHP are also copied by value.

## Modifying the tags (being an array)

```php
<?php

$tags = $product->tags;
$tags = ['phone', 'reconditioned'];

echo sprintf('Modified tags: {%s}' . PHP_EOL, implode(', ', $tags));
echo $product->toString();

*** OUTPUT ***

> Modified tags: <b>{phone, reconditioned}</b>

> Name: Asus 452X
> Price: 1024.50
> Tags: {computer, asus}
> Release date: 1999-12-31
```

In Java, arrays are passed by reference, however. In PHP they are considered as primitive types, which means if you have
an array with 5.000 elements and you pass it to a function, that array will be fully copied inside that function and any
modification won’t alter the original one.

## Modifying the released date (being an object)

```php
<?php

$date = $product->releaseDate;
$date = $date->modify(<b>'+1 day'</b>);

echo "Modified released date: {$date->format('Y-m-d')}" . PHP_EOL;
echo $product->toString();

*** OUTPUT ***

> Modified release date: <b>2000-01-01</b>

> Name: Asus 452X
> Price: 1024.50
> Tags: {computer, asus}
> Release date: <b>2000-01-01</b>
```

In OOP languages, objects are passed (or assigned) by reference: any modification will alter the original object.

## Trying immutability

If we replace the `\DateTime` by a `\DateTimeImmutable` class, let’s see what happens with the previous example.

```php
<?php

final  class ProductTransfer
{
    public function __construct(
        public string $name,
        public float $price,
        public array $tags,
        public \DateTimeImmutable $releaseDate
    ) {}

    // . . .
}

---

$date = $product->releaseDate;
$date = $date->modify(<b>'+1 day'</b>);

echo "Modified released date: {$date->format('Y-m-d')}" . PHP_EOL;
echo $product->toString();

*** OUTPUT ***

> Modified date: <b>2000-01-01</b>

> Name: Asus 452X
> Price: 1024.50
> Tags: {computer, asus}
> Release date: <b>1999-12-310</b>
```

This is happening because what _\DateTimeImmutable_ does is to create a new instance of the same object with the same
values.

Perfect, now our code is working like a charm, doesn’t it? Well, take a look at the following snippet.

```php
<?php

/** @var \DateTimeImmutable $date */
$date = <b>&$product->releaseDate;</b> // Notice the '&' character 👀
$date = $date->modify(<b>'+1 day'</b>);

echo "Modified released date: {$date->format('Y-m-d')}" . PHP_EOL;
echo $product->toString();

*** OUTPUT ***

> Modified name: <b>2000-01-01</b>

> Name: Asus 452X
> Price: 1024.50
> Tags: {computer, asus}
> Release date: <b>2000-01-01</b>
```

The ‘&’ operator is used to get a value by reference, which means we are modifying the original value instead of
creating a copy of this element (this is the standard behaviour for primitive types).

The point of Data Transfer Objects (DTOs) is to have immutable objects. Regarding the previous snippet, we have two
alternatives.

On the one hand, is to make private the properties and implement getters, then, in the getter use the clone keyword.

```php
<?php

private \DateTimeImmutable $releaseDate;

public function releaseDate(): \DateTimeImmutable
{
    return clone $this->releaseDate; // Notice the 'clone' 👀
}

---

// 🚨 Error - Only variables should be assigned by reference
// $date = <b>&</b>$product->releaseDate();
```

On the other hand, is about a static analyzer code library (such as Psalm), it will complain if you are not taking into
account the PHPDoc that you define.

```php
<?php

/** @psalm-immutable */
final  class ProductTransfer
{
    public function __construct(
        public string $name,
        //  ...
    ) {}

    // ...
}

---

// 🚨 Error - InaccessibleProperty Product::$name is marked readonly
// $product->name = 'Acer FC-288';
```

As you can see, having the _@psalm-immutable_ on your immutable classes you don’t need to worry about any of this
(cloning or getters), and you can even leave your properties public without any fear because they are write-only.

<div class="separator"></div>

## Reference

- [PHP best practices | Chemaclass](https://php.chemaclass.com/technical-skills/immutability.html)
- [Mutable vs Immutable Objects | InterviewCake](https://www.interviewcake.com/concept/java/mutable)
- [From Impure to Pure Code | Tommi Kaikkonen](https://tommikaikkonen.github.io/impure-to-pure/)
- [Entity vs DTO | StackOverflow](https://stackoverflow.com/a/51458159/4988034)