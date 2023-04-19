+++
title = "Getting started with Open Source Software"
description = "Learn why and how to work in OSS"
date = 2020-07-02

[taxonomies]
tags = ['Collaboration', 'Git', 'Github', 'Open Source', 'Programming']

[extra]
static_thumbnail = "/images/2020-07-02/1.png"
subtitle = "Being up-to-date and avoiding conflicts"
+++

<img alt="parliament-budapest" src="/images/2020-07-02/1.png" style="width: 100%"/>

<!-- more -->

<br>
Have you ever wondered how you could collaborate with open-source projects, but you didn’t know how to start? It
couldn’t be easier. Take a look:

- Fork the repository into your account.

<img alt="parliament-budapest" src="/images/2020-07-02/2.png" style="width: 100%"/>

- Clone the forked project on your computer.

[//]: # (```bash)
[//]: # (git clone git@github.com/myself/forked.git)
[//]: # (```)
<pre data-lang="bash" style="background-color:#eff1f5;color:#4f5b66;" class="language-bash"><code class="language-bash" data-lang="bash"><span><b>git clone git@github.com/myself/forked.git</b></span></code></pre>

- Add the upstream to sync with the new changes to your project.

<br>
<img alt="parliament-budapest" src="/images/2020-07-02/3.png" style="width: 80%"/>
<br>

[//]: # (```bash)
[//]: # (&#40;master&#41;$ git remote add upstream https://github.com/owner/repo.git)
[//]: # (# If you run `git remote -v` you should see:)
[//]: # (origin git@github.com:myself/forked.git &#40;fetch&#41;)
[//]: # (origin git@github.com:myself/forked.git &#40;push&#41;)
[//]: # (upstream git@github.com:owner/repo.git &#40;fetch&#41;)
[//]: # (upstream git@github.com:owner/repo.git &#40;push&#41;)
[//]: # (```)
<pre data-lang="bash" style="background-color:#eff1f5;color:#4f5b66;" class="language-bash "><code class="language-bash" data-lang="bash"><span>(</span><span style="color:#bf616a;">master</span><span>)$ <b>git remote add upstream https://github.com/owner/repo.git</b>
</span><span style="color:#a7adba;"># If you run <b>`git remote -v`</b> you should see:
</span><span style="color:#bf616a;">origin</span><span> git@github.com:myself/forked.git (fetch)
</span><span style="color:#bf616a;">origin</span><span> git@github.com:myself/forked.git (push)
</span><span style="color:#bf616a;">upstream</span><span> git@github.com:owner/repo.git (fetch)
</span><span style="color:#bf616a;">upstream</span><span> git@github.com:owner/repo.git (push)
</span></code></pre>

Get the last changes in your project (not necessary if you just forked the project).

[//]: # (```bash)
[//]: # (&#40;master&#41;$ git fetch upstream master)
[//]: # (&#40;master&#41;$ git merge upstream/master)
[//]: # (```)
<pre data-lang="bash" style="background-color:#eff1f5;color:#4f5b66;" class="language-bash "><code class="language-bash" data-lang="bash"><span>(</span><span style="color:#bf616a;">master</span><span>)$ <b>git fetch upstream master</b>
</span><span>(</span><span style="color:#bf616a;">master</span><span>)$ <b>git merge upstream/master</b>
</span></code></pre>

- Create a new branch.

[//]: # (```bash)
[//]: # (&#40;master&#41;$ git checkout -b new-branch)
[//]: # (```)
<pre data-lang="bash" style="background-color:#eff1f5;color:#4f5b66;" class="language-bash "><code class="language-bash" data-lang="bash"><span>(</span><span style="color:#bf616a;">master</span><span>)$ <b>git checkout</b></span><span style="color:#bf616a;"><b> -b</b></span><span><b> new-branch</b>
</span></code></pre>

Once you are done, let’s create a PR!

[//]: # (```bash)
[//]: # (&#40;new-branch&#41;$ git add . # Add to git your changes)
[//]: # (&#40;new-branch&#41;$ git commit -m ‘Type the commit message’)
[//]: # (&#40;new-branch&#41;$ git push origin new-branch # Push in forked & origin)
[//]: # (```)
<pre data-lang="bash" style="background-color:#eff1f5;color:#4f5b66;" class="language-bash "><code class="language-bash" data-lang="bash"><span>(</span><span style="color:#bf616a;">new-branch</span><span>)$ <b>git add .</b> </span><span style="color:#a7adba;"># Add to git your changes
</span><span>(</span><span style="color:#bf616a;">new-branch</span><span>)$ <b>git commit</b></span><span style="color:#bf616a;"><b> -m</b></span><span> <b>‘Type the commit message’</b>
</span><span>(</span><span style="color:#bf616a;">new-branch</span><span>)$ <b>git push origin new-branch </b></span><span style="color:#a7adba;"># Push in forked &amp; origin
</span></code></pre>

- If you get errors trying to push your last changes, add your SSH credentials.

[//]: # (```bash)
[//]: # (&#40;master&#41;$ git remote set-url origin git@github.com:myself/forked.git)
[//]: # (```)
<pre data-lang="bash" style="background-color:#eff1f5;color:#4f5b66;" class="language-bash "><code class="language-bash" data-lang="bash"><span>(</span><span style="color:#bf616a;">master</span><span>)$ <b>git remote set-url origin git@github.com:myself/forked.git</b>
</span></code></pre>

### That’s all!

> If your changes (_or someone else’s_) have been merged in the origin, you need to run **fetch upstream master** and 
> **git merge upstream/master** in master to be up-to-date!

<br>
<img alt="parliament-budapest" src="/images/2020-07-02/4.png" style="width: 90%"/>

## To sum up

[//]: # (```bash)
[//]: # (# Synchronize your local repository to the original one)
[//]: # (# Need to run only once the first time)
[//]: # (git remote add upstream git@github.com/owner/repo.git)
[//]: # (# Get all changes from sync project into upstream branch)
[//]: # (git fetch upstream master)
[//]: # (# Merge upstream branch into your current branch)
[//]: # (git merge upstream/master)
[//]: # (```)
<pre data-lang="bash" style="background-color:#eff1f5;color:#4f5b66;" class="language-bash "><code class="language-bash" data-lang="bash"><span style="color:#a7adba;"># Synchronize your local repository to the original one
</span><span style="color:#a7adba;"># Need to run only once the first time
</span><span style="color:#bf616a;"><b>git</b></span><span> <b>remote add upstream git@github.com/owner/repo.git</b>

</span><span style="color:#a7adba;"># Get all changes from sync project into upstream branch
</span><span style="color:#bf616a;"><b>git</b></span><span> <b>fetch upstream master</b>

</span><span style="color:#a7adba;"># Merge upstream branch into your current branch
</span><span style="color:#bf616a;"><b>git</b></span><span> <b>merge upstream/master</b>
</span></code></pre>

<div class="separator"></div>

## Reference

- [Syncing a fork | Github doc](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)
- [Learn Git commands | GitExplorer](https://gitexplorer.com/)
- [Git Tips | Oh Shit, Git!?!](https://ohshitgit.com/)