+++
title = "PHPStorm tricks ✨"
description = ""
date = 2023-10-09
draft = true

[taxonomies]
tags = ['PHPStorm', 'PHPStorm', 'Intellij', 'Settings', 'Customize', 'IDE']

[extra]
static_thumbnail = "/images/2023-10-09/1.png"
subtitle = "Customize the IDE with templates, plugins and more"
+++

PHPStorm is a powerful IDE that helps to boost your development, but over time, we (the users) missed some settings, shortcuts or even 3rd party plugin that could help us even more when programming.

<!-- more -->

![phpstorm-logo](/images/2023-10-09/1.png)

## Plugins

I am sure you already know plugins like [Symfony Support](https://plugins.jetbrains.com/plugin/7219-symfony-support) and [Twig](https://plugins.jetbrains.com/plugin/7303-twig), or [Laravel Idea](https://plugins.jetbrains.com/plugin/13441-laravel-idea) and [Blade](https://plugins.jetbrains.com/plugin/7569-blade) depending on the framework you work with.<br>
There are even plugins for tools like [Pest](https://plugins.jetbrains.com/plugin/14636-pest), [Git](https://plugins.jetbrains.com/plugin/7499-gittoolbox) or [String Manipulation](https://plugins.jetbrains.com/plugin/2162-string-manipulation).

Another recommendation, in case you want to familiarize with the IDE shortcuts is [Key Promoter X](https://plugins.jetbrains.com/plugin/9792-key-promoter-x).

Although, my favorite so far, which is also not very well-known, is [PHP Inspections (EA Extended)](https://plugins.jetbrains.com/plugin/7622-php-inspections-ea-extended-").

It covers:
- architecture related issues
- weak types control and possible code construct simplifications
- performance issues
- non-optimal, duplicate and suspicious "if" conditions
- validation of magic methods usage
- regular expressions
- validation of exception handling workflow
- compatibility issues
- variety of time-consuming bugs
- PHPUnit API usage
- security issues

---

## Code Style

> Editor > Code Style > PHP

PHP is a programming language on which every body can write the code in a certain way, in order to unify the style, the industry decided to create some standards.
There are standards even for how we should create a `ClockInterface`.

One of the most popular and extremely important is the definition of the style, for that purpose, the PSR2 was created, PHP evolve very fast and some years later a new revision of that PRS was introduced
with the name PSR12.

Recently, as PHP still evolving extremely fast, PSR evolve into PER, unfortunately, we don't have the ability to set PER in PHPStorm, but we can with PSR-12, which at the end is very similar to PER.

~~~
Defining the Code Style to `PHP Standards Recommendations 12` ([PSR-12](https://www.php-fig.org/psr/psr-12/)) -> the new one is called [PER](https://www.php-fig.org/per/coding-style/), but PHPStorm doesn't allow it at the moment
- PSR-12 is the standard in our industry, and for some reason it is not set by default, if you are not using it, you should 🙂
~~~

## Live Templates

> Editor > Live Templates

Update Live Templates with `:void` and navigate pressing Enter.

[ADD SOME gif]

You need to add in `pri, prisf, prof, prosf, pubf, pubsf` the following `: $RETURN_TYPE$` in the `Template text` (bottom), then, press on **Edit variables** and insert `"void"` on _RETURN_VALUE_ field

```php
private function $NAME$($PARAMETERS$): $RETURN_TYPE$
{
    $END$
}
```


## File and Code Templates

> Editor > File and Code Templates

If you are into `strict_types` and `final` classes by default, you can modify the basic template when you create a new file.

### PHP File
```php
<?php
declare(strict_types=1);
#parse("PHP File Header.php")
```

### PHP Class
```php
<?php
declare(strict_types=1);

#parse("PHP File Header.php")

#if (${NAMESPACE})
namespace ${NAMESPACE};

#end
class ${NAME} {

}
```

### PHP Interface
```php
<?php
declare(strict_types=1);

#parse("PHP File Header.php")
#if (${NAMESPACE})
namespace ${NAMESPACE};

#end
interface ${NAME} {

}
```

## Shortcuts

### Custom shortcuts

- Select File in Project View -> Cmd + Shift + 1
- Split screen into 2 windows

> Help -> Keyboard Shortcut -> Download "PDF"
