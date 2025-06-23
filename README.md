# Ad Injector Library

A simple TypeScript library to inject advertisement elements into the DOM and display them as a slideshow.

## Features

- Inject ads into any DOM element by CSS selector.
- Supports multiple ads cycling every 3 seconds.
- Responsive image sizing.
- Opens ad links in new tabs with security best practices.

## Installation

Copy the `injectAds` function from the library into your project or install it as a package if published.

## Usage

```typescript
import { injectAds } from './path-to-library';

injectAds('#ad-container', [
  { image: 'https://example.com/ad1.jpg', link: 'https://example.com', alt: 'Ad 1' },
  { image: 'https://example.com/ad2.jpg', link: 'https://example.com', alt: 'Ad 2' },
]);
