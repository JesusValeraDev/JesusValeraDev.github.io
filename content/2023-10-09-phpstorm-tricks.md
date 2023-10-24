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

PHPStorm is a powerful IDE that helps to boost your development, some of them are hidden, let's take a look at them to make PHPStorm even better! ⚡️

![phpstorm-logo](/images/2023-10-09/1.png)

## Plugins

Plugins are a crucial part of an IDE.

If you are a Symfony user, probably you use plugins like [Symfony Support](https://plugins.jetbrains.com/plugin/7219-symfony-support) and [Twig](https://plugins.jetbrains.com/plugin/7303-twig) for the templating.
In the other hand, if you are a Laravel one, there are [Laravel Idea](https://plugins.jetbrains.com/plugin/13441-laravel-idea) and [Blade](https://plugins.jetbrains.com/plugin/7569-blade).
However, there are other interesting plugins such as [GitToolBox](https://plugins.jetbrains.com/plugin/7499-gittoolbox) or [String Manipulation](https://plugins.jetbrains.com/plugin/2162-string-manipulation) that you should check if you never tried them.<br>
Another recommendation, in case you want to familiarize with the IDE shortcuts is [Key Promoter X](https://plugins.jetbrains.com/plugin/9792-key-promoter-x).

Although, my favorite so far, which is also not very well-known is [PHP Inspections (EA Extended)](https://plugins.jetbrains.com/plugin/7622-php-inspections-ea-extended-). This plugin helps you (among others) with:
- architecture related issues
- regular expressions
- non-optimal, duplicate and suspicious "if" conditions
- performance issues

You can check the full list on their [GitHub](https://github.com/kalessil/phpinspectionsea) page, this one is a **MUST**.

---

## Code Style

PHP is a programming language where everybody can write the code as they wish, in order to unify the industry, <span style="text-decoration: underline dotted" title="PHP Standard Recommendation">PSRs</span> was born.<br>
That is the reason we can find standards for `Loggering` ([PSR-3](https://www.php-fig.org/psr/psr-3)), `Event Dispatcher` ([PSR-14](https://www.php-fig.org/psr/psr-14)), and even for the `Clock` ([PSR-20](https://www.php-fig.org/psr/psr-20)). You can check the full list of all available PSRs [here](https://www.php-fig.org/psr/).

One of the most popular PSRs is concerning the `Code Style`, that is, it defines things like:
- Should I use tabs or spaces?
- Where should I place the brackets in a method? And in a conditional/loop?
- Are the parenthesis required when instantiating a class with empty constructor?

During the last years, due to the big and fast changes the language experienced, PSR-2 was quickly replaced by PSR-12. However, the language continues evolving very fast, so <span style="text-decoration: underline dotted" title="PHP Evolving Recommendation">PERs</span> were introduced.<br>
Unfortunately, at the moment is only possible to define the `Code Style` of your IDE `PSR-12` in PHPStorm, anyway, `PSR-12` is enough in the 95% of the situations.

To define PSR-12 by default, go to the following path and select **PSR12**.

> Settings ➔ Editor ➔ Code Style ➔ PHP ➔ "Set from..." ➔ PSR12

![phpstorm-define-psr-12](/images/2023-10-09/2.png)

---

## Live Templates

Live Templates are snippets of codes that you use very often, and you can write with a few characters.

PHPStorm brings some live templates, for example, if we type `prif`, the generated code will be:

```php source
private function ░()
{

}
```

There is a live template for all function combinations: `prif`, `prisf`, `prof`, `prosf`, `pubf` & `pubsf`.

In case you want to enhance the auto-completion with a default `: void`, you can use variables.

<img src="/images/2023-10-09/3.gif" alt="live templates in action" />

In order to achieve that, go to `Editor  ➔ Live Templates` and adjust each template with:

```javascript
private function $NAME$($PARAMETERS$): $RETURN_TYPE$
{
    $END$
}
```

Finally, press on **Edit variables** and insert `"void"` (with quotes) on **RETURN_TYPE** field.

![live-template-setup](/images/2023-10-09/4.jpeg)

## File and Code Templates

File and Code Templates are ... (when you create a new file, the scaffolding of these new files will have the following information...)


> Editor > File and Code Templates

If you are into `strict_types` and `final` classes by default, you can modify the basic template when you create a new file.

### PHP File
```php
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
