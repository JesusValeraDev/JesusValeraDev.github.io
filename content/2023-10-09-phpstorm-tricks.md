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

![phpstorm-logo](/images/2023-10-09/1.png)

## Plugins

Plugins are a crucial part of any IDE, they can help you to write better code with suggestions and/or spotting bugs.

Depending on the framework you work with, I am sure you know plugins like [Symfony Support](https://plugins.jetbrains.com/plugin/7219-symfony-support)
and [Twig](https://plugins.jetbrains.com/plugin/7303-twig), or [Laravel Idea](https://plugins.jetbrains.com/plugin/13441-laravel-idea) and [Blade](https://plugins.jetbrains.com/plugin/7569-blade).
However, there are other interesting plugins like [GitToolBox](https://plugins.jetbrains.com/plugin/7499-gittoolbox), [Pest](https://plugins.jetbrains.com/plugin/14636-pest), or [String Manipulation](https://plugins.jetbrains.com/plugin/2162-string-manipulation).

Another (not so popular) recommendation, in case you want to familiarize with the IDE shortcuts is [Key Promoter X](https://plugins.jetbrains.com/plugin/9792-key-promoter-x).

Although, my favorite so far, which is also not very well-known, is [PHP Inspections (EA Extended)](https://plugins.jetbrains.com/plugin/7622-php-inspections-ea-extended-"). This plugin helps you with:
- architecture related issues
- regular expressions
- non-optimal, duplicate and suspicious "if" conditions
- performance issues

---

## Code Style

PHP is a programming language where anybody can write the code on their own, in order to internationalize the industry, some people reunited and decided to create <span style="text-decoration: underline dotted" title="PHP Standard Recommendation">PSRs</span>.<br>
For that reason, there are standards for `Loggering` ([PSR-3](https://www.php-fig.org/psr/psr-3)), `Event Dispatcher` ([PSR-14](https://www.php-fig.org/psr/psr-14)), and even `Clock` ([PSR-20](https://www.php-fig.org/psr/psr-20)). Check the full list [here](https://www.php-fig.org/psr/).

One of the most popular is related to the `Code Style`, that is:
- Should I use tabs or spaces?
- Where should I place the opening-bracket?
- When instantiating a class, parenthesis is mandatory when the constructor is empty?

In recent years, due to the fast changes the language had, PSR-2 became deprecated, and PSR-12 was created instead, but as the language continues evolving very fast, <span style="text-decoration: underline dotted" title="PHP Evolving Recommendation">PERs</span> were introduced.<br>
At some point, PSR-12 will be replaced by this [PER](https://www.php-fig.org/per/coding-style/), unfortunately, it is not possible to define at the moment your code as `PER`, but `PSR-12` in PHPStorm, anyway, `PSR-12` is enough in the 95% of the situations.

To define `PSR-12` as the code style in PHPStorm:

> Settings ➔ Editor ➔ Code Style ➔ PHP ➔ "Set from..." ➔ PSR12

---

## Live Templates

> Editor > Live Templates

Update Live Templates with `:void` and navigate pressing Enter.

[ADD SOME gif]

You need to add in `pri, prisf, prof, prosf, pubf, pubsf` the following `: $RETURN_TYPE$` in the `Template text` (bottom), then, press on **Edit variables** and insert `"void"` on _RETURN_VALUE_ field

```php source
private function $NAME$($PARAMETERS$): $RETURN_TYPE$
{
    $END$
}
```


## File and Code Templates

> Editor > File and Code Templates

If you are into `strict_types` and `final` classes by default, you can modify the basic template when you create a new file.

### PHP File
```php source
declare(strict_types=1);
#parse("PHP File Header.php")
```

### PHP Class
```php source
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
```php source
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
