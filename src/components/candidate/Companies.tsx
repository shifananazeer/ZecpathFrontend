import { useEffect, useState } from "react";
import { getEmployers } from "../../services/candidateService";
import {
  Search,
  MapPin,
  BadgeCheck,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Employer } from "../../types/candidates";

export default function CompaniesPage() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Employer[]>([]);
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [verified, setVerified] = useState("");
  const [nextCursor, setNextCursor] = useState("");
  const [loading, setLoading] = useState(false);

  // =============================
  // FETCH COMPANIES
  // =============================
  const fetchCompanies = async (
    cursor = "",
    reset = true
  ) => {
    try {
      setLoading(true);

      const res = await getEmployers(
        search,
        sector,
        verified,
        cursor
      );
      if (reset) {
        setCompanies(res.results);
      } else {
        setCompanies((prev) => [
          ...prev,
          ...res.results,
        ]);
      }

      // next cursor
      if (res.links?.next) {
        const url = new URL(res.links.next);
        setNextCursor(
          url.searchParams.get("cursor") || ""
        );
      } else {
        setNextCursor("");
      }
    } catch (error) {
      console.error(
        "Error fetching companies:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* HEADER */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-3">
            Companies
          </h1>
          <p className="text-lg text-slate-400">
            Browse verified employers and discover your next opportunity
          </p>
        </div>

        {/* FILTERS */}
        <div className="mb-12 flex gap-3 flex-wrap animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search companies..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:border-slate-600/50"
            />
          </div>

          {/* Sector */}
          <input
            value={sector}
            onChange={(e) =>
              setSector(e.target.value)
            }
            placeholder="Sector"
            className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:border-slate-600/50"
          />

          {/* Verified */}
          <select
            value={verified}
            onChange={(e) =>
              setVerified(e.target.value)
            }
            className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:border-slate-600/50"
          >
            <option value="">All Companies</option>
            <option value="true">Verified Only</option>
          </select>

          {/* Filter button */}
          <button
            onClick={() =>
              fetchCompanies("", true)
            }
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Filter
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {companies.map((company, idx) => (
            <div
              key={company.id}
              onClick={() =>
                navigate(
                  `/candidate/companies/${company.id}`
                )
              }
              className="group relative animate-fade-in"
              style={{ animationDelay: `${0.05 + idx * 0.05}s` }}
            >
              {/* Card background with gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300 -z-10" />
              
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 h-full hover:border-slate-600 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center mb-4 group-hover:from-blue-500/50 group-hover:to-purple-500/50 transition-all duration-300">
                  <Building2
                    className="text-blue-400"
                    size={24}
                  />
                </div>

                {/* Company name */}
                <h2 className="text-white font-semibold text-lg mb-1 group-hover:text-blue-200 transition-colors">
                  {company.company_name ||
                    `Employer #${company.id}`}
                </h2>

                {/* Sector */}
                <p className="text-blue-400 text-sm mb-3 font-medium">
                  {company.sector || "General"}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <MapPin size={16} />
                  {company.location ||
                    "Unknown Location"}
                </div>

                {/* Size */}
                <p className="text-slate-400 text-sm mb-3">
                  {company.size} employees
                </p>

                {/* Verified badge */}
                {company.is_verified_company && (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm mb-4">
                    <BadgeCheck size={16} />
                    Verified Company
                  </div>
                )}

                {/* Services description */}
                <p className="text-slate-300 text-sm mb-5 line-clamp-2 min-h-10">
                  {company.services ||
                    "No company description available."}
                </p>

                {/* Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/candidate/companies/${company.id}`
                    );
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-lg font-medium transition-all duration-300 transform group-hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {!loading &&
          companies.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <Building2
                className="mx-auto mb-4 text-slate-600"
                size={48}
              />
              <p className="text-slate-400 text-lg">
                No companies found
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Try adjusting your search filters
              </p>
            </div>
          )}

        {/* PAGINATION */}
        {nextCursor && (
          <div className="flex justify-center animate-fade-in">
            <button
              onClick={() =>
                fetchCompanies(
                  nextCursor,
                  false
                )
              }
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
            >
              {loading
                ? "Loading..."
                : "Load More Companies"}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
