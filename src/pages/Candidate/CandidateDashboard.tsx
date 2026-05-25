import DashboardLayout from "../../components/layouts/DashboardLayout";
import DashboardGreeting from "../../components/dashboard/DashboardGreeting";
import { useAuth } from "../../context/AuthContext";

export const CandidateDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout
      active="Dashboard"
      topContent={
        <DashboardGreeting
          userName={user?.first_name || "User"}
        />
      }
    >
      {/* MAIN CONTENT */}
      <div className="mt-6">
        <h2 className="text-white">Dashboard cards here</h2>
      </div>
    </DashboardLayout>
  );
};