import styles from "./InfiniteScroll.module.css";

export interface InfiniteScrollProps {
  children: React.ReactNode;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  loadMoreLabel?: string;
  loadingFallback?: React.ReactNode;
  endMessage?: React.ReactNode;
  className?: string;
}

export function InfiniteScroll({
  children,
  hasMore,
  isLoading,
  onLoadMore,
  loadMoreLabel = "Load more",
  loadingFallback,
  endMessage,
  className,
}: InfiniteScrollProps) {
  const classNames = [styles.feed, className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classNames}>
      {children}
      {isLoading ? (
        <div className={styles.status}>{loadingFallback}</div>
      ) : null}
      {hasMore && !isLoading ? (
        <div className={styles.status}>
          <button
            className={styles.loadButton}
            type="button"
            onClick={onLoadMore}
          >
            {loadMoreLabel}
          </button>
        </div>
      ) : null}
      {!hasMore && endMessage ? (
        <div className={styles.status}>{endMessage}</div>
      ) : null}
    </div>
  );
}
