# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

Beginner focused information can be found below in [Open a Pull Request](#opening-a-pull-request) and [Code Review](#code-review).

### Table of Contents

* [Code of Conduct](#code-of-conduct)
* [I don't want to read this whole thing, I just have a question!!!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)
* [How Can I Contribute?](#how-can-i-contribute)
   * [Opening a Pull Request](#opening-a-pull-request)
   * [Code Review](#code-review)
   * [Best practices](#best-practices)

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). 
By participating, you are expected to uphold this code.
Please report unacceptable behavior to [coc@flagsio.com](mailto:coc@flagsio.com).

## I don't want to read this whole thing I just have a question!!!

> **Note:** Please don't file an issue to ask a question. You'll get faster results by using the resources below.

We have an official documentation page where you can learn a lot about how the project works.
Please read that first and then if you still have a question open a new issue.

* [Documentation](https://docs.flagsio.com/)

## How Can I Contribute?

### Opening a Pull Request

Pull requests are often called a "PR".
We follow the standard [github pull request](https://help.github.com/articles/about-pull-requests/) process.

The process described here has several goals:

- Maintain the project quality
- Fix problems that are important to users
- Engage the community in working toward the best possible solution
- Enable a sustainable system for the maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
1. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing<details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

### Code Review

To make it easier for your PR to receive reviews, consider the reviewers will need you to:

* follow the existing project coding conventions
* write [good commit messages](https://chris.beams.io/posts/git-commit/)
* break large changes into a logical series of smaller patches/commits which individually make easily understandable changes, and in aggregate solve a broader issue

Reviewers, the people giving the review, are highly encouraged to revisit the [Code of Conduct](CODE_OF_CONDUCT.md) and must go above and beyond to promote a collaborative, respectful community.
When reviewing PRs from others [The Gentle Art of Patch Review](http://sage.thesharps.us/2014/09/01/the-gentle-art-of-patch-review/) suggests an iterative series of focuses which is designed to lead new contributors to positive collaboration without inundating them initially with nuances:

* Is the idea behind the contribution sound?
* Is the contribution architected correctly?
* Is the contribution polished?

### Best practices

- Write clear and meaningful git commit messages.
- If the PR will *completely* fix a specific issue, include `fixes #123` in the PR body (where 123 is the specific issue number the PR will fix. This will automatically close the issue when the PR is merged.
- Make sure you don't include `@mentions` or `fixes` keywords in your git commit messages. These should be included in the PR body instead.
- When you make a PR for small change (such as fixing a typo, style change, or grammar fix), please squash your commits so that we can maintain a cleaner git history.
- Make sure you include a clear and detailed PR description explaining the reasons for the changes, and ensuring there is sufficient information for the reviewer to understand your PR.
- Additional Readings:
  - [chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/)
  - [github.com/blog/1506-closing-issues-via-pull-requests ](https://github.com/blog/1506-closing-issues-via-pull-requests)
  - [davidwalsh.name/squash-commits-git ](https://davidwalsh.name/squash-commits-git)
  - [https://mtlynch.io/code-review-love/](https://mtlynch.io/code-review-love/)
