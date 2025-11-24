"use client";
import { useState } from "react";
import Image from 'next/image';

/**
 * Gallery Component with Optimized Image Loading
 * 
 * Features:
 * - First image loads with priority (above the fold)
 * - Thumbnail images lazy load
 * - Next.js Image optimization for automatic format selection
 * - Responsive sizing based on viewport
 */
export default function Gallery({ images = [] }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-1 flex flex-col gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`relative w-full h-20 overflow-hidden rounded-md border ${i===index? 'border-black':'border-gray-300'} transition-all`}
          >
            {/* Lazy load thumbnails - not critical for initial render */}
            <Image 
              src={img} 
              alt={`Product thumbnail ${i + 1}`}
              fill
              sizes="80px"
              className="object-cover"
              loading="lazy"
              quality={75}
            />
          </button>
        ))}
      </div>

      <div className="col-span-4">
        <div className="card p-4">
          <div className="relative w-full h-[520px] rounded-md overflow-hidden bg-gray-100">
            {/* Main image - prioritize first image for LCP */}
            <Image 
              src={images[index]} 
              alt={`Product view ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover rounded-md"
              priority={index === 0} // First image loads with priority
              loading={index === 0 ? 'eager' : 'lazy'}
              quality={90}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
