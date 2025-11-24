/**
 * Skeleton Component - ShadCN UI inspired
 * Used for loading states with shimmer animation
 */

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      {...props}
    />
  );
}

export { Skeleton };
