import DashboardLayout from "../../components/layouts/DashboardLayout"
import DashboardGreeting from "../../components/dashboard/DashboardGreeting"
import { useAuth } from "../../context/AuthContext";
import { Job } from "../../components/Employer/Job";
export const EmployerDashbaord = () => {
     const { user } = useAuth();
    return (
        <>
         <DashboardLayout
              active="Dashboard"
              topContent={
                <DashboardGreeting userName={user?.first_name || user?.email || "User"} />
              }
            
            >

                  <Job/>
            </DashboardLayout>
        </>
    )
}