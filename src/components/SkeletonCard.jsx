import "./SkeletonCard.css";

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img skeleton-shimmer" />
      <div className="skeleton-info">
        <div className="skeleton-row">
          <div className="skeleton-text skeleton-shimmer" style={{ width: "60%" }} />
          <div className="skeleton-text skeleton-shimmer" style={{ width: "15%" }} />
        </div>
        <div className="skeleton-text skeleton-shimmer" style={{ width: "85%", marginTop: 8 }} />
        <div className="skeleton-text skeleton-shimmer" style={{ width: "45%", marginTop: 6 }} />
        <div className="skeleton-text skeleton-shimmer" style={{ width: "30%", marginTop: 10, height: 18 }} />
      </div>
    </div>
  );
}
