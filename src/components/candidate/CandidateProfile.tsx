"use client";

import { useState } from "react";
import { updateCandidateProfile } from "../../services/candidateService";

interface ProfileData {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  profile_id: number;

  profile: {
    id: number;
    user: number;
    user_email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    location: string;
    bio?: string;
    resume?: string | null;
    is_parsing: boolean;
    portfolio_url?: string;
    skills?: string;
    education_level?: string;
    experience_years?: number;
    expected_salary?: number | null;
    is_active: boolean;
  };
}

interface Props {
  data: ProfileData;
  onUpdate?: (updatedData: any) => void;
}

export default function CandidateProfile({
  data,
  onUpdate,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: data.profile.first_name || "",
    last_name: data.profile.last_name || "",
    phone_number: data.profile.phone_number || "",
    location: data.profile.location || "",
    bio: data.profile.bio || "",
    resume: null as File | null,
    portfolio_url: data.profile.portfolio_url || "",
    skills: data.profile.skills || "",
    education_level: data.profile.education_level || "",
    experience_years: data.profile.experience_years || 0,
    expected_salary: data.profile.expected_salary || "",
  });

  // -------------------------
  // PROFILE COMPLETION
  // -------------------------
  const calculateProfileCompletion = () => {
    const fields = [
      form.first_name,
      form.last_name,
      form.phone_number,
      form.location,
      form.bio,
      form.resume,
      form.portfolio_url,
      form.skills,
      form.education_level,
      form.experience_years,
      form.expected_salary,
    ];

    const completed = fields.filter(
      (f) => f !== "" && f !== null && f !== 0
    ).length;

    return Math.round(
      (completed / fields.length) * 100
    );
  };

  const profileCompletion =
    calculateProfileCompletion();

  // -------------------------
  // INPUT CHANGE
  // -------------------------
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement |
    HTMLTextAreaElement |
    HTMLSelectElement
  >
) => {
  const target = e.target;
  const { name, value } = target;

  // FILE INPUT
  if (
    target instanceof HTMLInputElement &&
    target.type === "file"
  ) {
    setForm((prev) => ({
      ...prev,
      [name]: target.files?.[0] || null,
    }));
    return;
  }

  setForm((prev) => ({
    ...prev,
    [name]:
      target instanceof HTMLInputElement &&
      target.type === "number"
        ? Number(value)
        : value,
  }));
};

//SAVE PROFILE
  // -------------------------
  const handleSave = async () => {
    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "first_name",
        form.first_name
      );
      formData.append(
        "last_name",
        form.last_name
      );
      formData.append(
        "phone_number",
        form.phone_number
      );
      formData.append(
        "location",
        form.location
      );
      formData.append(
        "bio",
        form.bio
      );
      formData.append(
        "skills",
        form.skills
      );

      // valid backend choices only
      if (
        [
          "high_school",
          "bachelor",
          "master",
          "phd",
        ].includes(
          form.education_level
        )
      ) {
        formData.append(
          "education_level",
          form.education_level
        );
      }

      // valid URL
      if (
        form.portfolio_url &&
        form.portfolio_url.startsWith(
          "http"
        )
      ) {
        formData.append(
          "portfolio_url",
          form.portfolio_url
        );
      }

      formData.append(
        "experience_years",
        String(
          Number(
            form.experience_years
          ) || 0
        )
      );

      if (
        form.expected_salary !== ""
      ) {
        formData.append(
          "expected_salary",
          String(
            Number(
              form.expected_salary
            )
          )
        );
      }

      // resume file
      if (form.resume) {
        formData.append(
          "resume",
          form.resume
        );
      }

      console.log(
        "PROFILE ID:",
        data.profile.id
      );

      // IMPORTANT → use profile.id
      const res =
        await updateCandidateProfile(
          data.profile.id,
          formData
        );

      onUpdate?.(res);
      setIsEditing(false);
    } catch (error: any) {
      console.log(
        "FULL ERROR:",
        error
      );
      console.log(
        "STATUS:",
        error.response?.status
      );
      console.log(
        "BACKEND RESPONSE:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes progressFill {
          0% {
            width: 0%;
          }
          100% {
            width: var(--progress-width, 100%);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slide-up-delay-1 {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          opacity: 0;
        }

        .animate-slide-up-delay-2 {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }

        .progress-bar {
          --progress-width: ${profileCompletion}%;
          animation: progressFill 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .field-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .field-card:hover {
          transform: translateY(-2px);
          border-color: rgba(148, 163, 184, 0.5);
          background-color: rgba(15, 23, 42, 0.8);
        }

        .field-card input,
        .field-card textarea,
        .field-card select {
          transition: all 0.2s ease;
        }

        .field-card input:focus,
        .field-card textarea:focus,
        .field-card select:focus {
          background-color: rgba(2, 6, 23, 0.9);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* HEADER */}
        <div className="animate-slide-up">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700/50 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-slate-600/70">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-tight">
                  {form.first_name || "First"}{" "}
                  {form.last_name || "Last"}
                </h1>

                <p className="text-slate-400 mt-2 text-sm">
                  {data.email}
                </p>

                {/* PROGRESS BAR */}
                <div className="mt-8 max-w-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-slate-300 tracking-wider">
                      PROFILE COMPLETION
                    </span>
                    <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                      {profileCompletion}%
                    </span>
                  </div>

                  <div className="relative h-3 rounded-full bg-slate-800 border border-slate-700 overflow-hidden shadow-inner">
                    <div
                      className="progress-bar h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/20"
                      style={{
                        "--progress-width": `${profileCompletion}%`,
                      } as React.CSSProperties}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white via-white to-transparent opacity-20" />
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    {profileCompletion === 100
                      ? "✨ Profile complete!"
                      : `${100 - profileCompletion}% remaining`}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setIsEditing(
                    !isEditing
                  )
                }
                className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 whitespace-nowrap shadow-lg ${
                  isEditing
                    ? "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
                    : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white border border-blue-400/30 hover:shadow-blue-500/30"
                }`}
              >
                {isEditing
                  ? "Cancel"
                  : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Text fields */}
          {[
            {
              label: "First Name",
              name: "first_name",
            },
            {
              label: "Last Name",
              name: "last_name",
            },
            {
              label: "Phone Number",
              name: "phone_number",
            },
            {
              label: "Location",
              name: "location",
            },
            {
              label: "Skills",
              name: "skills",
            },
            {
              label: "Portfolio",
              name: "portfolio_url",
            },
            {
              label: "Experience Years",
              name: "experience_years",
              type: "number",
            },
            {
              label: "Expected Salary",
              name: "expected_salary",
              type: "number",
            },
          ].map((field, idx) => (
            <div
              key={field.name}
              className="animate-slide-up field-card bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-xl border border-slate-700/50 shadow-lg"
              style={{
                animationDelay: `${(idx + 1) * 0.05}s`,
                opacity: 0,
              }}
            >
              <label className="text-slate-300 text-sm font-semibold mb-3 block uppercase tracking-wide">
                {field.label}
              </label>

              {isEditing ? (
                <input
                  type={
                    field.type ||
                    "text"
                  }
                  name={
                    field.name
                  }
                  value={
                    (form as any)[
                      field.name
                    ]
                  }
                  onChange={
                    handleChange
                  }
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full px-4 py-3 bg-slate-950/80 text-white rounded-lg border border-slate-600/30 focus:outline-none focus:border-blue-500 placeholder-slate-500 text-sm"
                />
              ) : (
                <p className="text-slate-300 text-sm font-medium">
                  {(form as any)[
                    field.name
                  ] ||
                    <span className="text-slate-500 italic">
                      Not specified
                    </span>}
                </p>
              )}
            </div>
          ))}

          {/* EDUCATION */}
          <div
            className="animate-slide-up field-card bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-xl border border-slate-700/50 shadow-lg"
            style={{
              animationDelay: `0.45s`,
              opacity: 0,
            }}
          >
            <label className="text-slate-300 text-sm font-semibold mb-3 block uppercase tracking-wide">
              Education
            </label>

            {isEditing ? (
              <select
                name="education_level"
                value={
                  form.education_level
                }
                onChange={
                  handleChange
                }
                className="w-full px-4 py-3 bg-slate-950/80 text-white rounded-lg border border-slate-600/30 focus:outline-none focus:border-blue-500 text-sm"
              >
                <option value="">
                  Select education level
                </option>
                <option value="high_school">
                  High School
                </option>
                <option value="bachelor">
                  Bachelor
                </option>
                <option value="master">
                  Master
                </option>
                <option value="phd">
                  PhD
                </option>
              </select>
            ) : (
              <p className="text-slate-300 text-sm font-medium">
                {form.education_level ? 
                  form.education_level.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                  : <span className="text-slate-500 italic">Not specified</span>}
              </p>
            )}
          </div>

          {/* BIO */}
          <div
            className="animate-slide-up field-card md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-xl border border-slate-700/50 shadow-lg"
            style={{
              animationDelay: `0.5s`,
              opacity: 0,
            }}
          >
            <label className="text-slate-300 text-sm font-semibold mb-3 block uppercase tracking-wide">
              Bio
            </label>

            {isEditing ? (
              <textarea
                name="bio"
                value={form.bio}
                onChange={
                  handleChange
                }
                rows={5}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 bg-slate-950/80 text-white rounded-lg border border-slate-600/30 focus:outline-none focus:border-blue-500 placeholder-slate-500 text-sm resize-none"
              />
            ) : (
              <p className="text-slate-300 text-sm leading-relaxed">
                {form.bio ||
                  <span className="text-slate-500 italic">
                    No bio added
                  </span>}
              </p>
            )}
          </div>
        </div>

        {/* SAVE */}
        {isEditing && (
          <div
            className="animate-slide-up flex justify-end"
            style={{
              animationDelay: `0.55s`,
              opacity: 0,
            }}
          >
            <button
              onClick={
                handleSave
              }
              disabled={
                loading
              }
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-slate-700 disabled:to-slate-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
