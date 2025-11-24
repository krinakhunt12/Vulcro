"use client";

import React from 'react';
import { useInView } from '@/hooks/useLazyLoad';
import { SectionSkeleton } from '@/components/skeletons';

/**
 * LazySection - Wrapper component for lazy loading page sections
 * 
 * This component uses Intersection Observer to detect when a section
 * enters the viewport and only then renders its children.
 * Perfect for heavy sections below the fold.
 * 
 * @param {React.ReactNode} children - Content to lazy load
 * @param {React.ReactNode} fallback - Loading state (default: SectionSkeleton)
 * @param {string} className - Additional CSS classes
 * @param {number} rootMargin - Distance before viewport to trigger loading
 * 
 * @example
 * <LazySection fallback={<ProductListSkeleton />}>
 *   <BestSellers />
 * </LazySection>
 */

export default function LazySection({ 
  children, 
  fallback = <SectionSkeleton />, 
  className = '',
  rootMargin = '100px' 
}) {
  const { ref, isVisible } = useInView({ rootMargin });

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
}
