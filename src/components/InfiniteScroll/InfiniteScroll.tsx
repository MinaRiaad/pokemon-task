import { useEffect, useRef } from "react";
import styles from "./InfiniteScroll.module.css";

export interface InfiniteScrollProps {
  children: React.ReactNode;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  loadingFallback?: React.ReactNode;
  endMessage?: React.ReactNode;
  className?: string;
  rootMargin?: string;
}

export function InfiniteScroll({
  children,
  hasMore,
  isLoading,
  onLoadMore,
  loadingFallback,
  endMessage,
  className,
  rootMargin = "320px 0px",
}: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const onLoadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          onLoadMoreRef.current();
        }
      },
      { root: null, rootMargin, threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, rootMargin]);

  const classNames = [styles.feed, className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classNames}>
      {children}
      {isLoading ? (
        <div className={styles.status}>{loadingFallback}</div>
      ) : null}
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      {!hasMore && endMessage ? (
        <div className={styles.status}>{endMessage}</div>
      ) : null}
    </div>
  );
}
