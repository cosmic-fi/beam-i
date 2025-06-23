/**
 * Injects ad elements into the DOM at the specified target selector.
 * If multiple ads are provided, displays them as a slideshow.
 * @param targetSelector - CSS selector for the target element (e.g., '.ad-container' or '#adDiv')
 * @param adsData - Array of ad objects: { image: string, link: string, alt?: string }
 */
export function injectAds(
    targetSelector: string,
    adsData: Array<{ image: string; link: string; alt?: string }>
): void {
    // Find the target element in the DOM using the provided selector
    const target = document.querySelector(targetSelector);
    if (!target) {
        // Warn and exit if no element matches the selector
        console.warn(`injectAds: No element found for selector "${targetSelector}"`);
        return;
    }

    // Clear any existing content inside the target element
    target.innerHTML = '';

    // If no ads data is provided, exit early
    if (adsData.length === 0) return;

    // Initialize the current ad index and element references
    let currentIndex = 0;
    let adElem: HTMLAnchorElement | null = null;
    let img: HTMLImageElement | null = null;

    /**
     * Displays the ad at the specified index inside the target element.
     * @param index - Index of the ad to show
     */
    function showAd(index: number) {
        if (!target) return;
        // Clear previous ad content
        target.innerHTML = '';

        // Get the ad data for the current index
        const ad = adsData[index];

        // Create an anchor element linking to the ad's URL
        adElem = document.createElement('a');
        adElem.href = ad.link;
        adElem.target = '_blank'; // Open link in new tab
        adElem.rel = 'noopener noreferrer'; // Security best practice

        // Create an image element for the ad
        img = document.createElement('img');
        img.src = ad.image;
        img.alt = ad.alt || 'Advertisement'; // Use provided alt or default text
        img.style.maxWidth = '100%'; // Responsive image sizing

        // Append the image inside the anchor, then append anchor to target
        adElem.appendChild(img);
        target.appendChild(adElem);
    }

    // Show the first ad initially
    showAd(currentIndex);

    // If there are multiple ads, cycle through them every 3 seconds
    if (adsData.length > 1) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % adsData.length;
            showAd(currentIndex);
        }, 3000); // Change ad every 3 seconds
    }
}