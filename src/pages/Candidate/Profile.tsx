import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import CandidateProfile from "../../components/candidate/CandidateProfile";
import { fetchUser } from "../../services/candidateService";
import { useAuth } from "../../context/AuthContext";

export const Profile = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { accessToken, isLoading  , user} = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        // wait until auth is ready
        if (isLoading) return;
        if (!accessToken) {
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(false);

        const data = await fetchUser();
     console.log("Fetched profile data:", data);
        setProfileData(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(true);
      } finally {
        setLoading(false); // 👈 CRITICAL FIX
      }
    };

    load();
  }, [isLoading, accessToken]);

  return (
    <DashboardLayout active="Profile">

      {/* TOP CONTENT */}
      {loading ? (
        <div className="text-slate-400">Loading profile...</div>
      ) : error ? (
        <div className="text-red-400">
          Failed to load profile
        </div>
      ) : profileData ? (
        <CandidateProfile data={profileData} />
      ) : (
        <div className="text-red-400">
          No profile data found
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="mt-6 text-white">
        <h2></h2>
      </div>

    </DashboardLayout>
  );
};