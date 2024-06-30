+++
title = "Git Rebase onto"
description = "How to solve Git conflicts or changing the branch history when rebasing onto a branch"
date = 2024-07-01

[taxonomies]
tags = ['Git', 'Rebase', 'Onto', 'Branch']

[extra]
static_thumbnail = "/images/2025-03-20/1.png"
subtitle = "How to modify commit history with git rebase onto"
+++

When you are working with Git, you may find yourself in a situation where you need to rebase your branch onto another branch.<br>
This can happen when you want to incorporate changes from one branch into another, but you want to keep the commit history clean and linear.

## What is `git rebase --onto`?

The `git rebase --onto` is a powerful command that allows you to rebase a range of commits onto a new base. This can be useful when you want to move a series of commits from one branch to another, or when you want to rebase a branch onto a different base commit.

The command takes three arguments:

1. The new base commit
2. The **exclusive** starting commit of the range to rebase
3. The **inclusive** ending commit of the range to rebase (default is _`HEAD`_)

The syntax for the `git rebase --onto` command is as follows:

```bash
git rebase --onto origin/[new-base] <start-commit> <end-commit>
```

## How to use `git rebase --onto`?

This is the git history of the `new-feature` branch:

```bash
X---Y---Z (master)
         \
          A---B---C---D---E---F (new-feature)
```

You run `git rebase` and get multiple conflicts and the branch history becomes messy.

At the end, the commits from the `new-feature` branch is incorrect, and you want to discard commits `A` and `B`.

To rebase the `new-feature` branch onto the `master` branch, you can use the following command:

```bash
(new-feature)$ git rebase --onto master B
```

This command tells Git to take the commits starting from `B` (not included) until the end, and apply them on top of the `master` branch.

```bash
X---Y---Z (master)
         \
          C---D---E---F (new-feature)
```

<div class="separator"></div>

Let's imagine another example, having the previous example, we only want to keep the commits `D` and `E` but discard the rest. In this case we should run:

```bash
(new-feature)$ git rebase --onto master C E
```

This command tells Git to take the commits starting from `C` (not included) and ending at `E` (included) and apply them on top of the `master` branch.

```bash
X---Y---Z (master)
         \
          D---E (new-feature)
```

## References

- [Git Rebase](https://git-scm.com/docs/git-rebase)
