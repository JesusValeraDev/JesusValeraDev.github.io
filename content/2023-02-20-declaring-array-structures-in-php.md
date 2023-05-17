+++
title = "Declaring array structures in PHP"
description = "In PHP is not possible to define explicitly the types of your arrays, but using PHPDoc + static analysers (PHPStan or Psalm) we can do it. Here is how"
date = 2023-02-20

[taxonomies]
tags = ["Programming", "PHP", "Arrays", "Phpstan", "Psalm"]

[extra]
static_thumbnail = "/images/2023-02-20/1.png"
subtitle = ""
+++

![statue-people-with-a-string-and-a-cat](/images/2023-02-20/1.png)

<!-- more -->

Unfortunately, it is not possible to define explicit array types as other programming languages do such as Java:

```java
List<User> users = new ArrayList<>();
```

There have been some attempts to achieve that, one of the most recent ones was done by **Nikita Popov** in
this [pull request](https://github.com/PHPGenerics/php-generics-rfc/issues/45), sadly, the conclusion was regarding the
current PHP status it is not possible, it would require rewriting a huge amount of code and some of them are very
critical.

Hopefully, some tools like **PHPStan** or **Psalm** help us to analyze the code statically, which means, they do not
execute but check the code for inconsistencies based on PHP comments.

There are 3 different ways to define the type of elements in a PHP array:

1. Legacy way: `User[]`
2. List Shape: `array<int,mixed>` & `list<mixed>`
3. Object Shape: `array{0:int, foo:?string, bar:mixed}`

## The Legacy way

This is a fashioned way to define a list of elements from a certain type, the problem is it becomes ambiguous, and
clients that use this kind of list cannot know if keys are integers, floats or strings.
Also, static analyzers will not fail if you try to get an element by key with an incorrect type, in these scenarios, I
would suggest using `array<int,mixed>`.

In the end, the more explicit, the better.

[//]: # (```php)
[//]: # (<?php)
[//]: # (/** @var User[] $users */)
[//]: # ($users = [ ... ];)
[//]: # ()
[//]: # (# Are keys auto-incremental integers, random numbers, maybe strings... ?)
[//]: # ($firstUser = $users[ ? ];)
[//]: # ()
[//]: # (# Static analyzers won't complain if you use an incorrect type 🤕)
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#a7adba;">/** </span><span style="color:#b48ead;">@var</span><span style="color:#a7adba;"> User[] $users */
</span><span style="color:#bf616a;">$users </span><span>= [ ... ];
</span><span>
</span><span style="color:#a7adba;"># Are keys auto-incremental integers, random numbers, maybe strings... ?
</span><span style="color:#bf616a;">$firstUser </span><span>= </span><span style="color:#bf616a;">$users</span><span>[ ? ];
</span><span>
</span><span style="color:#a7adba;"># <b>Static analyzers won't complain</b> if you use an incorrect type 🤕
</span></code></pre>

# List Shape

We use lists when we have an array of elements with the same type.<br>
To do that, we use the **diamond syntax** to declare the types of the key and the value: `array<int,mixed>`. There is a very handy shortcut when the key is an auto-incremental integer: `list<mixed>`.

[//]: # (```php)
[//]: # (<?php)
[//]: # (/** @var array<string, User> $users */)
[//]: # ($users = [)
[//]: # (    'jesus' => new User&#40;'Jesus Valera'&#41;,)
[//]: # (    'chema' => new User&#40;'Chema Valera'&#41;,)
[//]: # (];)
[//]: # ()
[//]: # ($userJesus = $users['jesus'];)
[//]: # ($userChema = $users['chema'];)
[//]: # ()
[//]: # ($users[0]; # ERROR: "Offset 0 does not exist on array<string, User>")
[//]: # ()
[//]: # (---)
[//]: # ()
[//]: # (/** @var list<User> $users */)
[//]: # ($users = [ ... ];)
[//]: # ()
[//]: # ($firstUser = reset&#40;$users&#41;;)
[//]: # ($lastUser = end&#40;$users&#41;;)
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#a7adba;">/** </span><span style="color:#b48ead;">@var</span><span style="color:#a7adba;"> array&lt;string, User&gt; $users */
</span><span style="color:#bf616a;">$users </span><span>= [
</span><span>    '</span><span style="color:#a3be8c;">jesus</span><span>' =&gt; </span><span style="color:#b48ead;">new </span><span style="color:#d08770;">User</span><span>('</span><span style="color:#a3be8c;">Jesus Valera</span><span>'),
</span><span>    '</span><span style="color:#a3be8c;">chema</span><span>' =&gt; </span><span style="color:#b48ead;">new </span><span style="color:#d08770;">User</span><span>('</span><span style="color:#a3be8c;">Chema Valera</span><span>'),
</span><span>];
</span><span>
</span><span style="color:#bf616a;">$userJesus </span><span>= </span><span style="color:#bf616a;">$users</span><span>['</span><span style="color:#a3be8c;">jesus</span><span>'];
</span><span style="color:#bf616a;">$userChema </span><span>= </span><span style="color:#bf616a;">$users</span><span>['</span><span style="color:#a3be8c;">chema</span><span>'];
</span><span>
</span><span style="color:#bf616a;">$users</span><span>[</span><span style="color:#d08770;">0</span><span>]; </span><span style="color:#a7adba;"># ERROR: "Offset 0 does not exist on array&lt;string, User&gt;"
</span><span>
</span><span>---
</span><span>
</span><span style="color:#a7adba;">/** </span><span style="color:#b48ead;">@var</span><span style="color:#a7adba;"> list&lt;User&gt; $users */
</span><span style="color:#bf616a;">$users </span><span>= [ ... ];
</span><span>
</span><span style="color:#bf616a;">$firstUser </span><span>= </span><span style="color:#96b5b4;">reset</span><span>(</span><span style="color:#bf616a;">$users</span><span>);
</span><span style="color:#bf616a;">$lastUser </span><span>= </span><span style="color:#96b5b4;">end</span><span>(</span><span style="color:#bf616a;">$users</span><span>);
</span></code></pre>

## Object Shape

We use object shape when the array is not a collection of objects but a map which holds information.<br>
To do that, we use the **curly bracket syntax** and define the key name and the type, we can split by commas if there are multiple elements: `array{foo:int, bar:string}`.

[//]: # (```php)
[//]: # (<?php)
[//]: # (/** @var array{id:int, birthdate:DateTimeImmutable} */)
[//]: # ($additionalInfo = [ ... ];)
[//]: # ()
[//]: # ($id = $additionalInfo['id']; # int)
[//]: # ($birthdate = $additionalInfo['birthdate']; # DateTimeImmutable)
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#a7adba;">/** </span><span style="color:#b48ead;">@var</span><span style="color:#a7adba;"> array{id:int, birthdate:DateTimeImmutable} */
</span><span style="color:#bf616a;">$additionalInfo </span><span>= [ ... ];
</span><span>
</span><span style="color:#bf616a;">$id </span><span>= </span><span style="color:#bf616a;">$additionalInfo</span><span>['</span><span style="color:#a3be8c;">id</span><span>']; </span><span style="color:#a7adba;"># int
</span><span style="color:#bf616a;">$birthdate </span><span>= </span><span style="color:#bf616a;">$additionalInfo</span><span>['</span><span style="color:#a3be8c;">birthdate</span><span>']; </span><span style="color:#a7adba;"># DateTimeImmutable
</span></code></pre>

<div class="separator"></div>

Example of a User class that holds two arrays: a list and an object shape.

[//]: # (```php)
[//]: # (<?php)
[//]: # (final class User)
[//]: # ({)
[//]: # (    /** @var list<Comment> */)
[//]: # (    public readonly array $comments;)
[//]: # ()
[//]: # (    /** @var array{id:int, birthdate:DateTimeImmutable} */)
[//]: # (    public readonly array $additionalInfo;)
[//]: # (})
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#b48ead;">final class </span><span style="color:#d08770;">User
</span><span style="color:#343d46;">{
</span><span style="color:#343d46;">    </span><span style="color:#a7adba;">/** </span><span style="color:#b48ead;">@var</span><span style="color:#a7adba;"> list&lt;Comment&gt; */
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public </span><span style="color:#d08770;">readonly </span><span style="color:#b48ead;">array </span><span style="color:#bf616a;">$comments</span><span style="color:#343d46;">;
</span><span style="color:#343d46;">
</span><span style="color:#343d46;">    </span><span style="color:#a7adba;">/** </span><span style="color:#b48ead;">@var</span><span style="color:#a7adba;"> array{id:int, birthdate:DateTimeImmutable} */
</span><span style="color:#343d46;">    </span><span style="color:#b48ead;">public </span><span style="color:#d08770;">readonly </span><span style="color:#b48ead;">array </span><span style="color:#bf616a;">$additionalInfo</span><span style="color:#343d46;">;
</span><span style="color:#343d46;">}
</span></code></pre>

There are multiple advantages when using these PHP comments, not only provide better feedback on the array shape to the developers but IDEs will suggest auto-completion when iterating on individual elements!

<div class="separator"></div>

Of course, it is possible to represent any complex array structure in PHP with these PHP comments. Example:

[//]: # (```php)
[//]: # (<?php)
[//]: # (/**)
[//]: # ( * @var list<)
[//]: # ( *   array{)
[//]: # ( *     uuid?: string,)
[//]: # ( *     content: array{name:string, foo:?stdClass},)
[//]: # ( *   })
[//]: # ( * > $array)
[//]: # ( */)
[//]: # ($array = [)
[//]: # (    0 => [)
[//]: # (        'uuid' => 'XXXX-XXX-XXX-XXXX',)
[//]: # (        'content' => [)
[//]: # (            'name' => 'str',)
[//]: # (            'foo' => null,)
[//]: # (        ],)
[//]: # (    ],)
[//]: # (    1 => [)
[//]: # (        'content' => [)
[//]: # (            'name' => 'str',)
[//]: # (            'foo' => new stdClass&#40;&#41;,)
[//]: # (        ],)
[//]: # (    ],)
[//]: # (    // ...)
[//]: # (];)
[//]: # (```)
<pre data-lang="php" style="background-color:#eff1f5;color:#4f5b66;" class="language-php "><code class="language-php" data-lang="php"><span style="color:#a7adba;">/**
</span><span style="color:#a7adba;"> * </span><span style="color:#b48ead;">@var</span><span style="color:#a7adba;"> list&lt;
</span><span style="color:#a7adba;"> *   array{
</span><span style="color:#a7adba;"> *     uuid?: string,
</span><span style="color:#a7adba;"> *     content: array{name:string, foo:?stdClass},
</span><span style="color:#a7adba;"> *   }
</span><span style="color:#a7adba;"> * &gt; $array
</span><span style="color:#a7adba;"> */
</span><span style="color:#bf616a;">$array </span><span>= [
</span><span>    </span><span style="color:#d08770;">0 </span><span>=&gt; [
</span><span>        '</span><span style="color:#a3be8c;">uuid</span><span>' =&gt; '</span><span style="color:#a3be8c;">XXXX-XXX-XXX-XXXX</span><span>',
</span><span>        '</span><span style="color:#a3be8c;">content</span><span>' =&gt; [
</span><span>            '</span><span style="color:#a3be8c;">name</span><span>' =&gt; '</span><span style="color:#a3be8c;">str</span><span>',
</span><span>            '</span><span style="color:#a3be8c;">foo</span><span>' =&gt; </span><span style="color:#d08770;">null</span><span>,
</span><span>        ],
</span><span>    ],
</span><span>    </span><span style="color:#d08770;">1 </span><span>=&gt; [
</span><span>        '</span><span style="color:#a3be8c;">content</span><span>' =&gt; [
</span><span>            '</span><span style="color:#a3be8c;">name</span><span>' =&gt; '</span><span style="color:#a3be8c;">str</span><span>',
</span><span>            '</span><span style="color:#a3be8c;">foo</span><span>' =&gt; </span><span style="color:#b48ead;">new </span><span style="color:#d08770;">stdClass</span><span>(),
</span><span>        ],
</span><span>    ],
</span><span>    </span><span style="color:#a7adba;">// ...
</span><span>];
</span></code></pre>

> We can use the PHP comments on arrays anywhere (class properties, function params, inline initialization…)

## Resources:

- [Psalm | Array Shapes](https://psalm.dev/docs/annotating_code/type_syntax/array_types/)
- [PHPStan | PHPDoc Types](https://phpstan.org/writing-php-code/phpdoc-types#array-shapes)
