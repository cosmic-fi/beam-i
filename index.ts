/**
   * Injects ad elements into the DOM at the specified target selector.
   * If multiple ads are provided, displays them as a slideshow.
   * @param targetSelector - CSS selector for the target element (e.g., '.ad-container' or '#adDiv')
   * @param adsData - Array of ad objects: { image: string, link: string, alt?: string }
     * @param options - Optional configuration object
     * @param options.delay - Delay in milliseconds for the ad slideshow
     * @param options.loop - Boolean indicating whether to loop the slideshow
     * @param options.adClass - CSS class to be applied to each ad element
     * @param options.onAdClick - Callback function executed when an ad is clicked
     * @param options.onAdChange - Callback function executed when the ad changes
     */
export function injectAds(
    targetSelector: string,
    adsData: Array<{ image: string; link: string; alt?: string }>,
    options?: { 
        delay?: number; 
        loop?: boolean; 
        adClass?: string; 
        onAdClick?: (ad: {
            image: string; 
            link: string; 
            alt?: string }) => void; 
            onAdChange?: (ad: { 
                image: string; 
                link: string; 
                alt?: string }, 
                index: number) => void 
            }
): void {
    const target = document.querySelector(targetSelector);
    if (!target) {
        console.warn(`injectAds: No element found for selector "${targetSelector}"`);
        return;
    }

    target.innerHTML = '';

    if (adsData.length === 0) return;

    let currentIndex = 0;
    let adElem: HTMLAnchorElement | null = null;
    let img: HTMLImageElement | null = null;
    const delay = options?.delay || 3000;
    const loop = options?.loop ?? true;
    const adClass = options?.adClass || '';

    const onAdClick = options?.onAdClick;
    const onAdChange = options?.onAdChange;

    function showAd(index: number) {
        if (!target) return;
        target.innerHTML = '';

        const ad = adsData[index];

        adElem = document.createElement('a');
        adElem.href = ad.link;
        adElem.target = '_blank';
        adElem.rel = 'noopener noreferrer';
        adElem.className = adClass;

        img = document.createElement('img');
        img.src = ad.image;
        img.alt = ad.alt || 'Advertisement';
        img.style.maxWidth = '100%';
        adElem.appendChild(img);
        target.appendChild(adElem);
        if (onAdClick) {
            adElem.onclick = () => onAdClick(ad);
        }
        if (onAdChange) {
            onAdChange(ad, index);
        }
    }

    showAd(currentIndex);

    if (adsData.length > 1) {
        const intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % adsData.length;
            showAd(currentIndex);
            if (!loop && currentIndex === adsData.length - 1) {
                clearInterval(intervalId); // Stop the interval if not looping
            }
        }, delay);
    }
}