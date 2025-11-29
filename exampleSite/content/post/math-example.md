---
title: "Math Rendering Example"
date: 2024-12-22T15:00:00+08:00
categories: ["examples"]
tags: ["math", "katex"]
math: true
description: "Demonstration of KaTeX math rendering capabilities"
---

This post demonstrates the math rendering capabilities of the Hugo Theme Daemon using KaTeX.

<!--more-->

## Inline Math

You can write inline math equations like $E = mc^2$ or $a^2 + b^2 = c^2$ directly in your text.

The quadratic formula is $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$ and it's beautiful!

## Block Math

For more complex equations, use block math:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### Calculus

The derivative of $f(x) = x^n$ is:

$$
\frac{d}{dx}(x^n) = nx^{n-1}
$$

Integration by parts:

$$
\int u \, dv = uv - \int v \, du
$$

### Linear Algebra

Matrix notation:

$$
A = \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{bmatrix}
$$

Eigenvalue equation:

$$
Av = \lambda v
$$

### Statistics

The normal distribution probability density function:

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}
$$

Bayes' theorem:

$$
P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}
$$

### Greek Letters

Common Greek letters in equations:

- Alpha: $\alpha$, Beta: $\beta$, Gamma: $\gamma$
- Delta: $\delta$, Epsilon: $\epsilon$, Theta: $\theta$
- Lambda: $\lambda$, Mu: $\mu$, Pi: $\pi$
- Sigma: $\sigma$, Phi: $\phi$, Omega: $\omega$

### Complex Expressions

The Schrödinger equation:

$$
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \left[-\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t)\right]\Psi(\mathbf{r},t)
$$

Maxwell's equations:

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\epsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\epsilon_0\frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

### Series and Summations

Infinite series:

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

Geometric series:

$$
\sum_{k=0}^{n} ar^k = a\frac{1-r^{n+1}}{1-r}
$$

### Limits

Basic limit:

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

L'Hôpital's rule example:

$$
\lim_{x \to 0} \frac{e^x - 1}{x} = \lim_{x \to 0} \frac{e^x}{1} = 1
$$

## Usage Tips

1. Enable math rendering in your post front matter: `math: true`
2. Use `$...$` for inline math
3. Use `$$...$$` for display math (block equations)
4. Use `\(...\)` as an alternative for inline math
5. Use `\[...\]` as an alternative for display math

Enjoy writing beautiful mathematical content with Hugo Theme Daemon! 🧮
