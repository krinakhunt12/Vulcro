'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for lazy loading content using Intersection Observer API
 * 
 * This hook monitors when an element enters the viewport and triggers loading.
 * Perfect for lazy loading sections, images, or components below the fold.
 * 
 * @param {Object} options - Intersection Observer options
 * @param {string} options.root - Root element for intersection (default: null = viewport)
 * @param {string} options.rootMargin - Margin around root (e.g., '200px' to load 200px before entering viewport)
 * @param {number} options.threshold - Percentage of visibility to trigger (0.0 to 1.0)
 * @param {boolean} options.triggerOnce - Only trigger once and stop observing (default: true)
 * 
 * @returns {Object} - { ref, isIntersecting, hasIntersected }
 * 
 * @example
 * const { ref, isIntersecting } = useLazyLoad({ rootMargin: '100px' });
 * 
 * return (
 *   <div ref={ref}>
 *     {isIntersecting ? <HeavyComponent /> : <Skeleton />}
 *   </div>
 * );
 */
export function useLazyLoad(options = {}) {
  const {
    root = null,
    rootMargin = '50px', // Start loading 50px before element enters viewport
    threshold = 0.01, // Trigger when 1% of element is visible
    triggerOnce = true, // Stop observing after first intersection
  } = options;

  const elementRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    
    // Check if Intersection Observer is supported
    if (!element || typeof IntersectionObserver === 'undefined') {
      // Fallback: load immediately if not supported
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    // Create observer instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isElementIntersecting = entry.isIntersecting;
          
          setIsIntersecting(isElementIntersecting);
          
          // Mark as intersected once
          if (isElementIntersecting) {
            setHasIntersected(true);
            
            // Unobserve if triggerOnce is true
            if (triggerOnce) {
              observer.unobserve(element);
            }
          }
        });
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    // Start observing
    observer.observe(element);

    // Cleanup
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return {
    ref: elementRef,
    isIntersecting,
    hasIntersected,
  };
}

/**
 * Simple hook to check if element is in viewport
 * Returns true once element enters viewport
 * 
 * @example
 * const { ref, isVisible } = useInView();
 * 
 * return (
 *   <section ref={ref}>
 *     {isVisible && <Content />}
 *   </section>
 * );
 */
export function useInView(options = {}) {
  const { ref, hasIntersected } = useLazyLoad({
    triggerOnce: true,
    ...options,
  });

  return {
    ref,
    isVisible: hasIntersected,
  };
}
