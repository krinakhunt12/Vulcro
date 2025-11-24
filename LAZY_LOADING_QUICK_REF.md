# 🎯 Lazy Loading Quick Reference

## 🚀 At a Glance

### Files Created
```
src/
├── hooks/
│   └── useLazyLoad.js              # Intersection Observer hook
├── components/
│   ├── ui/
│   │   └── skeleton.jsx            # Base skeleton component
│   ├── skeletons/
│   │   └── index.jsx               # All skeleton variants
│   └── LazySection.jsx             # Reusable lazy wrapper
```

### Files Modified
```
src/
├── app/
│   ├── page.js                     # ✓ Home page optimized
│   ├── shop/page.js                # ✓ Shop page optimized
│   └── product/[id]/page.js        # ✓ Product page optimized
├── components/
│   ├── ProductCard.jsx             # ✓ Image optimization
│   ├── Gallery.jsx                 # ✓ Gallery optimization
│   ├── BestSellers.jsx             # ✓ Updated structure
│   └── NewArrivals.jsx             # ✓ Updated structure
```

---

## 📖 Cheat Sheet

### Dynamic Import
```jsx
import dynamic from 'next/dynamic';

const Component = dynamic(() => import('./Component'), {
  loading: () => <Skeleton />,
  ssr: true, // or false
});
```

### Image Lazy Loading
```jsx
import Image from 'next/image';

// Hero (LCP)
<Image src="/hero.jpg" priority loading="eager" />

// Below fold
<Image src="/product.jpg" loading="lazy" />
```

### Intersection Observer
```jsx
'use client';
import { useInView } from '@/hooks/useLazyLoad';

const { ref, isVisible } = useInView();

<div ref={ref}>
  {isVisible && <Content />}
</div>
```

### Lazy Section Wrapper
```jsx
import LazySection from '@/components/LazySection';

<LazySection fallback={<Skeleton />}>
  <HeavyComponent />
</LazySection>
```

---

## 🎨 Skeleton Components

```jsx
import {
  ProductCardSkeleton,
  ProductListSkeleton,
  SectionSkeleton,
} from '@/components/skeletons';

<ProductListSkeleton count={8} />
```

---

## ✅ Best Practices

| Scenario | Solution | SSR |
|----------|----------|-----|
| Hero image | `priority` | N/A |
| Product images | `loading="lazy"` | N/A |
| Heavy component | `dynamic()` | ✅ |
| Filters/Sidebar | `dynamic()` | ❌ |
| Below fold section | `useInView()` | N/A |

---

## 🔧 Configuration

### useLazyLoad Options
```jsx
useLazyLoad({
  rootMargin: '100px',   // Load 100px before viewport
  threshold: 0.1,        // Trigger at 10% visible
  triggerOnce: true,     // Load once, don't unload
})
```

### Image Sizes
```jsx
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
```

---

## 🐛 Common Issues

| Problem | Fix |
|---------|-----|
| Images load immediately | Add `loading="lazy"` |
| Content flashing | Add skeleton loader |
| SEO missing | Set `ssr: true` |
| Hook not triggering | Check element is below fold |

---

## 📊 Performance Targets

- Initial Bundle: < 200KB
- First Load JS: < 150KB
- LCP: < 2.5s
- Lighthouse: 90+

---

## 🔗 Full Documentation

- **Complete Guide:** `LAZY_LOADING_GUIDE.js`
- **Detailed README:** `LAZY_LOADING_README.md`
- **Hook Source:** `src/hooks/useLazyLoad.js`
- **Skeleton Components:** `src/components/skeletons/index.jsx`

---

**Quick Start:**
1. Import what you need
2. Add skeleton loader
3. Test on slow 3G
4. Run Lighthouse audit
5. Deploy! 🚀
