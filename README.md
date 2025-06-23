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

```html
<div id="ad-container"></div>
```

```javascript
import { injectAds } from './path-to-library';

document.addEventListener('DOMContentLoaded', () => {
  injectAds(
    '#ad-container',
    [
      { image: 'https://example.com/ad1.jpg', link: 'https://example.com', alt: 'Ad 1' },
      { image: 'https://example.com/ad2.jpg', link: 'https://example.com', alt: 'Ad 2' },
    ],
    {
      delay: 3000,          // Delay in milliseconds between ad changes
      loop: true,           // Whether to loop the slideshow
      adClass: 'custom-ad', // Optional CSS class for each ad element
      onAdClick: (ad) => {
        console.log('Ad clicked:', ad);
      },
      onAdChange: (ad, index) => {
        console.log(`Ad changed to index ${index}:`, ad);
      },
    }
  );
});
```