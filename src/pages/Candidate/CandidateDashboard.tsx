import DashboardLayout from "../../components/layouts/DashboardLayout";
import DashboardGreeting from "../../components/dashboard/DashboardGreeting";

export const CandidateDashboard = () => {
  return (
    <DashboardLayout
      active="Dashboard"
      topContent={
        <DashboardGreeting userName="Alex Johnson" />
      }
    >
      {/* MAIN CONTENT */}
      <div className="mt-6">
        <h2 className="text-white">Dashboard cards here</h2>
      </div>
    </DashboardLayout>
  );
};