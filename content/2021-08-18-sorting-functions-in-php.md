+++
title = "Sorting functions in PHP"
description = "In PHP there are multiple ways to sort a collection, and sometimes it’s not clear which method we should use. Let's take a look at the alternatives."
date = 2021-08-18

[taxonomies]
tags = ['PHP', 'Programming', 'Sorting Algorithms', 'Oop', 'Functional Programming']

[extra]
static_thumbnail = "/images/2021-08-18/1.png"
subtitle = "And the Spaceship Operator 🚀🚀🚀"
+++

![rock-mountain-santiago-compostela](/images/2021-08-18/1.png)

<!-- more -->

When dealing with PHP, there are multiple ways to sort a collection of items, and sometimes it’s not clear which method we should use and why.

> What is the difference between _`sort()`_, _`arsort()`_ and _`uasort()`_?

Before explaining the repercussions of `a`, `r`, `k` and `u` + `sort()` function, we need to know the very basic concept of lists and maps.

## List

A list is an ordered collection.<br>
The order is sequential starting from 0 and increasing 1 by 1 for each item.<br>
It is also possible to have duplicated items in a list.<br>

```
$list = ['Croatia', 'Belgium', 'Austria', 'Belgium', 'Denmark'];
print_r($list);

Array
(
    [0] => Croatia
    [1] => Belgium
    [2] => Austria
    [3] => Belgium
    [4] => Denmark
)
```

## Map (also known as Dictionaries)

A map is an unordered collection.<br>
Each element is composed of a key and a value.<br>
It is not possible to have the same key more than once.<br>

```
$map = [
    'Croatia' => 0,
    'Belgium' => 1,
    'Austria' => 2,
    'Denmark' => 3,
    'Belgium' => 4,
];
print_r($map);

Array
(
    [Croatia] => 0
    [Belgium] => 4 // 'Belgium => 1' was overriden
    [Austria] => 2
    [Denmark] => 3
)
```

<div class="separator"></div>

It was important to do a quick overview of maps and lists, they are different kinds of collections, and because of that, each one has its own specific sorting methods.

The idea of those `a`, `r`, `k` & `u` + `sort()` is to work as modifiers as follows:

<div style="font-size: 1.3rem">
R = reverse ➝ sort in descencing order, lists & maps<br>
K = key ➝ sort by key, only for maps<br>
A = associative ➝ sort by value, only for maps<br>
U = user-defined ➝ defined by the user in a callback
</div>

## Sorting Lists 🧵

### sort() & rsort()

These methods sort lists in _ascending/descending_ order.

[//]: # (```)
[//]: # (# sort: Sort list by ascending order.)
[//]: # ($sort = ['Croatia', 'Belgium', 'Austria', 'Belgium'];)
[//]: # (sort&#40;$sort&#41;;)
[//]: # ()
[//]: # (Array)
[//]: # (&#40;)
[//]: # (    [0] => Austria)
[//]: # (    [1] => Belgium)
[//]: # (    [2] => Belgium)
[//]: # (    [3] => Croatia)
[//]: # (&#41;)
[//]: # ()
[//]: # (---)
[//]: # ()
[//]: # (# rsort: Sort list by descending order.)
[//]: # ($rsort = ['Croatia', 'Belgium', 'Austria', 'Belgium'];)
[//]: # (rsort&#40;$rsort&#41;;)
[//]: # ()
[//]: # (Array)
[//]: # (&#40;)
[//]: # (    [0] => Croatia)
[//]: # (    [1] => Belgium)
[//]: # (    [2] => Belgium)
[//]: # (    [3] => Austria)
[//]: # (&#41;)
[//]: # (```)
<pre style="background-color:#eff1f5;color:#4f5b66;"><code><span># <b>sort</b>: Sort list by <b>ascending</b> order.
</span><span>$sort = ['Croatia', 'Belgium', 'Austria', 'Belgium'];
</span><span>sort($sort);
</span><span>
</span><span>Array
</span><span>(
</span><span>    [0] =&gt; <b>A</b>ustria
</span><span>    [1] =&gt; <b>B</b>elgium
</span><span>    [2] =&gt; <b>B</b>elgium
</span><span>    [3] =&gt; <b>C</b>roatia
</span><span>)
</span><span>
</span><span>---
</span><span>
</span><span># <b>rsort</b>: Sort list by <b>descending</b> order.
</span><span>$rsort = ['Croatia', 'Belgium', 'Austria', 'Belgium'];
</span><span>rsort($rsort);
</span><span>
</span><span>Array
</span><span>(
</span><span>    [0] =&gt; <b>C</b>roatia
</span><span>    [1] =&gt; <b>B</b>elgium
</span><span>    [2] =&gt; <b>B</b>elgium
</span><span>    [3] =&gt; <b>A</b>ustria
</span><span>)
</span></code></pre>

## Sorting Maps 🗺️

### asort(), arsort(), ksort() & krsort()

These methods sort associative arrays by _key/value_ in _ascending/descending_ order.

[//]: # (```)
[//]: # (# ksort: Sort map by key in ascending order.)
[//]: # ($ksort = [100 => 'Croatia', 200 => 'Austria', 300 => 'Belgium'];)
[//]: # (ksort&#40;$ksort&#41;;)
[//]: # ()
[//]: # (Array)
[//]: # (&#40;)
[//]: # (    [100] => Croatia)
[//]: # (    [200] => Austria)
[//]: # (    [300] => Belgium)
[//]: # (&#41;)
[//]: # ()
[//]: # (---)
[//]: # ()
[//]: # (# krsort: Sort map by key in descending order.)
[//]: # ($krsort = [100 => 'Croatia', 200 => 'Austria', 300 => 'Belgium'];)
[//]: # (krsort&#40;$krsort&#41;;)
[//]: # ()
[//]: # (Array)
[//]: # (&#40;)
[//]: # (    [300] => Belgium)
[//]: # (    [200] => Austria)
[//]: # (    [100] => Croatia)
[//]: # (&#41;)
[//]: # ()
[//]: # (---)
[//]: # ()
[//]: # (# asort: Sort map by value in ascending order.)
[//]: # ($asort = [100 => 'Croatia', 200 => 'Austria', 300 => 'Belgium'];)
[//]: # (asort&#40;$asort&#41;;)
[//]: # ()
[//]: # (Array)
[//]: # (&#40;)
[//]: # (    [200] => Austria)
[//]: # (    [300] => Belgium)
[//]: # (    [100] => Croatia)
[//]: # (&#41;)
[//]: # ()
[//]: # (---)
[//]: # ()
[//]: # (# arsort: Sort map by value in descending order.)
[//]: # ($arsort = [100 => 'Croatia', 200 => 'Austria', 300 => 'Belgium'];)
[//]: # (arsort&#40;$arsort&#41;;)
[//]: # ()
[//]: # (Array)
[//]: # (&#40;)
[//]: # (    [100] => Croatia)
[//]: # (    [300] => Belgium)
[//]: # (    [200] => Austria)
[//]: # (&#41;)
[//]: # (```)
<pre style="background-color:#eff1f5;color:#4f5b66;"><code><span># <b>ksort</b>: Sort map by <b>key</b> in <b>ascending</b> order.
</span><span>$ksort = [100 =&gt; 'Croatia', 200 =&gt; 'Austria', 300 =&gt; 'Belgium'];
</span><span>ksort($ksort);
</span><span>
</span><span>Array
</span><span>(
</span><span>    [<b>100</b>] =&gt; Croatia
</span><span>    [<b>200</b>] =&gt; Austria
</span><span>    [<b>300</b>] =&gt; Belgium
</span><span>)
</span><span>
</span><span>---
</span><span>
</span><span># <b>krsort</b>: Sort map by <b>key</b> in <b>descending</b> order.
</span><span>$krsort = [100 =&gt; 'Croatia', 200 =&gt; 'Austria', 300 =&gt; 'Belgium'];
</span><span>krsort($krsort);
</span><span>
</span><span>Array
</span><span>(
</span><span>    [<b>300</b>] =&gt; Belgium
</span><span>    [<b>200</b>] =&gt; Austria
</span><span>    [<b>100</b>] =&gt; Croatia
</span><span>)
</span><span>
</span><span>---
</span><span>
</span><span># <b>asort</b>: Sort map by <b>value</b> in <b>ascending</b> order.
</span><span>$asort = [100 =&gt; 'Croatia', 200 =&gt; 'Austria', 300 =&gt; 'Belgium'];
</span><span>asort($asort);
</span><span>
</span><span>Array
</span><span>(
</span><span>    [200] =&gt; <b>A</b>ustria
</span><span>    [300] =&gt; <b>B</b>elgium
</span><span>    [100] =&gt; <b>C</b>roatia
</span><span>)
</span><span>
</span><span>---
</span><span>
</span><span># <b>arsort</b>: Sort map by <b>value</b> in <b>descending</b> order.
</span><span>$arsort = [100 =&gt; 'Croatia', 200 =&gt; 'Austria', 300 =&gt; 'Belgium'];
</span><span>arsort($arsort);
</span><span>
</span><span>Array
</span><span>(
</span><span>    [100] =&gt; <b>C</b>roatia
</span><span>    [300] =&gt; <b>B</b>elgium
</span><span>    [200] =&gt; <b>A</b>ustria
</span><span>)
</span></code></pre>

## User-defined functions 👩‍💻

Until now everything was nice, but as you know, usually we have a collection of complex objects, and sometimes we want
to define our own sorting function, in these scenarios, the _asort()_ method simply doesn't work. Eg:

“Sorting a collection of `Product` by price in ascending order, and when more than one product has the same price, sort
them _alphabetically_ by the name”.

We need to find a more sophisticated approach. And this is only possible if we can define our own sorting method, in
this case, we can take advantage of using the `spaceship operator`! 🚀

Basically, this operator is syntactic sugar specialized for comparisons.

The first parameter is the array we want to sort and the second is a callback that returns an integer value.

[//]: # (```)
[//]: # (/** @var callable&#40;mixed,mixed&#41;:int $callable */)
[//]: # ($callable = function &#40;mixed $a, mixed $b&#41;: int { ... })
[//]: # ()
[//]: # (usort&#40;&$array, $callable&#41;: bool)
[//]: # (```)
<pre style="background-color:#eff1f5;color:#4f5b66;"><code><span>/** @var <b>callable(mixed,mixed):int</b> $callable */
</span><span>$callable = function (mixed $a, mixed $b): int { ... }
</span><span>
</span><span>usort(&amp;$array, $callable): bool
</span></code></pre>

The values this callable must return are `-1`, `0` and `1` if the current item is less, equal or greater than the
previous one, to be sorted before or after in the collection.

```
function compare(int $a, int $b): int
{
    if ($a == $b) {
        return 0;
    }
    return ($a < $b) ? -1 : 1;
}

# Is the same than...

function compare(int $a, int $b): int
{
    return $a <=> $b;
}

# Is the same than...

fn (int $a, int $b): int => $a <=> $b;
```

### usort(), uksort() & uasort()

These methods sort by keys or values (preserving or resetting the keys) in a user-defined callback. Let’s see some
examples:

[//]: # (```)
[//]: # (# usort: Sort list/map by callback from the values, keys are reset.)
[//]: # ($usort = [100 => 'Croatia', 300 => 'Austria', 200 => 'Belgium'];)
[//]: # (usort&#40;$usort, fn &#40;string $a, string $b&#41;: int => $a <=> $b&#41;;)
[//]: # ()
[//]: # (Array)
[//]: # (&#40;)
[//]: # (    [0] => Austria)
[//]: # (    [1] => Belgium)
[//]: # (    [2] => Croatia)
[//]: # (&#41;)
[//]: # ()
[//]: # (---)
[//]: # ()
[//]: # (# uksort: Sort map by callback from the keys.)
[//]: # ($uksort = [100 => 'Croatia', 300 => 'Austria', 200 => 'Belgium'];)
[//]: # (uksort&#40;$uksort, fn &#40;int $a, int $b&#41;: int => $a <=> $b&#41;;)
[//]: # ()
[//]: # (Array)
[//]: # (&#40;)
[//]: # (    [100] => Croatia)
[//]: # (    [200] => Belgium)
[//]: # (    [300] => Austria)
[//]: # (&#41;)
[//]: # ()
[//]: # (---)
[//]: # ()
[//]: # (# uasort: Sort map by callback from the values preserving the keys.)
[//]: # ($uasort = [100 => 'Croatia', 300 => 'Austria', 200 => 'Belgium'];)
[//]: # (uasort&#40;$uasort, fn &#40;string $a, string $b&#41;: int => $a <=> $b&#41;;)
[//]: # ()
[//]: # (Array)
[//]: # (&#40;)
[//]: # (    [300] => Austria)
[//]: # (    [200] => Belgium)
[//]: # (    [100] => Croatia)
[//]: # (&#41;)
[//]: # (```)
<pre style="background-color:#eff1f5;color:#4f5b66;"><code><span># <b>usort</b>: Sort list/map by callback from the <b>values</b>, <i>keys are reset</i>.
</span><span>$usort = [100 =&gt; 'Croatia', 300 =&gt; 'Austria', 200 =&gt; 'Belgium'];
</span><span>usort($usort, fn (string $a, string $b): int =&gt; $a &lt;=&gt; $b);
</span><span>
</span><span>Array
</span><span>(
</span><span>    [<b>0</b>] =&gt; <b>A</b>ustria
</span><span>    [<b>1</b>] =&gt; <b>B</b>elgium
</span><span>    [<b>2</b>] =&gt; <b>C</b>roatia
</span><span>)
</span><span>
</span><span>---
</span><span>
</span><span># <b>uksort</b>: Sort map by callback from the <b>keys</b>.
</span><span>$uksort = [100 =&gt; 'Croatia', 300 =&gt; 'Austria', 200 =&gt; 'Belgium'];
</span><span>uksort($uksort, fn (int $a, int $b): int =&gt; $a &lt;=&gt; $b);
</span><span>
</span><span>Array
</span><span>(
</span><span>    [<b>100</b>] =&gt; Croatia
</span><span>    [<b>200</b>] =&gt; Belgium
</span><span>    [<b>300</b>] =&gt; Austria
</span><span>)
</span><span>
</span><span>---
</span><span>
</span><span># <b>uasort</b>: Sort map by callback from the <b>values</b> <i>preserving the keys</i>.
</span><span>$uasort = [100 =&gt; 'Croatia', 300 =&gt; 'Austria', 200 =&gt; 'Belgium'];
</span><span>uasort($uasort, fn (string $a, string $b): int =&gt; $a &lt;=&gt; $b);
</span><span>
</span><span>Array
</span><span>(
</span><span>    [300] =&gt; <b>A</b>ustria
</span><span>    [200] =&gt; <b>B</b>elgium
</span><span>    [100] =&gt; <b>C</b>roatia
</span><span>)
</span></code></pre>

For the sake of simplicity, I used the function: `fn ($a, $b) => $a <=> $b;` if the collection was holding complex
objects, it would be the same but comparing some property, it depends on your needs.

## 📑 Cheat Sheet

[//]: # (```bash)
[//]: # (sort&#40;&#41; - sort list in ascending order)
[//]: # (rsort&#40;&#41; - sort list in descending order)
[//]: # ()
[//]: # (asort&#40;&#41; - sort map by value in ascending order )
[//]: # (ksort&#40;&#41; - sort map by key in ascending order)
[//]: # (arsort&#40;&#41; - sort map by value in descending order)
[//]: # (krsort&#40;&#41; - sort map by key in descending order)
[//]: # ()
[//]: # (usort&#40;&#41; - sort list or map by value in a user-defined callback, reset keys)
[//]: # (uksort&#40;&#41; - sort map by keys in a user-defined callback)
[//]: # (uasort&#40;&#41; - sort map by value in a user-defined callback)
[//]: # (```)
<pre data-lang="bash" style="background-color:#eff1f5;color:#4f5b66;" class="language-bash "><code class="language-bash" data-lang="bash"><b>sort()</b> - sort list in ascending order
<span><b>rsort()</b> - sort list in descending order
</span><span>
</span><span><b>asort()</b> - sort map by value in ascending order 
</span><span><b>ksort()</b> - sort map by key in ascending order
</span><span><b>arsort()</b> - sort map by value in descending order
</span><span><b>krsort()</b> - sort map by key in descending order
</span><span>
</span><span><b>usort()</b> - sort list or map by value in a user-defined callback, reset keys
</span><span><b>uksort()</b> - sort map by keys in a user-defined callback
</span><span><b>uasort()</b> - sort map by value in a user-defined callback
</span></code></pre>

> &ast; Take into account that the array is passed by reference to the sorting function, which means you must initialize
> the array in a different line, and the sorting function will mutate the original array 👀

## Reference

- Array Sorting | [PHP Doc](https://www.php.net/manual/en/array.sorting.php)
- PHP Sorting Arrays | [W3Schools](https://www.w3schools.com/php/php_arrays_sort.asp)
- Difference between Set, List and Map in
  Java | [Java67](https://www.java67.com/2013/01/difference-between-set-list-and-map-in-java.html)