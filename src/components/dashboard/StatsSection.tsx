import React from "react";
import StatCard from "./StatCard";

interface Summary {
  total_applications: number;
  saved_jobs_count: number;
  unread_notifications: number;
}

interface StatsSectionProps {
  summary: Summary;
}

const StatsSection: React.FC<StatsSectionProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Applications"
        value={summary.total_applications}
      />
      <StatCard
        title="Saved Jobs"
        value={summary.saved_jobs_count}
      />
      <StatCard
        title="Notifications"
        value={summary.unread_notifications}
      />
    </div>
  );
};

export default StatsSection;