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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="bg-[#111A2E] rounded-2xl p-6 border border-white/10 flex justify-between">
        <div>
          <h1 className="text-2xl text-white font-semibold">
            {form.first_name}{" "}
            {form.last_name}
          </h1>

          <p className="text-slate-400 mt-1">
            {data.email}
          </p>

          <div className="mt-5 w-72">
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>
                Profile Completion
              </span>
              <span>
                {
                  profileCompletion
                }
                %
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{
                  width: `${profileCompletion}%`,
                }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            setIsEditing(
              !isEditing
            )
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {isEditing
            ? "Cancel"
            : "Edit Profile"}
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        ].map((field) => (
          <div
            key={field.name}
            className="bg-[#111A2E] p-5 rounded-2xl border border-white/10"
          >
            <h2 className="text-white mb-2">
              {field.label}
            </h2>

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
                className="w-full p-2 bg-[#0C1225] text-white rounded-lg"
              />
            ) : (
              <p className="text-slate-400 text-sm">
                {(form as any)[
                  field.name
                ] ||
                  "Not specified"}
              </p>
            )}
          </div>
        ))}

        {/* EDUCATION */}
        <div className="bg-[#111A2E] p-5 rounded-2xl border border-white/10">
          <h2 className="text-white mb-2">
            Education
          </h2>

          {isEditing ? (
            <select
              name="education_level"
              value={
                form.education_level
              }
              onChange={
                handleChange
              }
              className="w-full p-2 bg-[#0C1225] text-white rounded-lg"
            >
              <option value="">
                Select
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
            <p className="text-slate-400 text-sm">
              {form.education_level ||
                "Not specified"}
            </p>
          )}
        </div>

        {/* RESUME */}
        {/* <div className="bg-[#111A2E] p-5 rounded-2xl border border-white/10">
          <h2 className="text-white mb-2">
            Resume
          </h2>

          {isEditing ? (
            <input
              type="file"
              name="resume"
              onChange={
                handleChange
              }
              className="text-white"
            />
          ) : (
            <p className="text-slate-400 text-sm">
              {data.profile
                .resume
                ? "Uploaded"
                : "No Resume"}
            </p>
          )}
        </div> */}

        {/* BIO */}
        <div className="md:col-span-2 bg-[#111A2E] p-5 rounded-2xl border border-white/10">
          <h2 className="text-white mb-2">
            Bio
          </h2>

          {isEditing ? (
            <textarea
              name="bio"
              value={form.bio}
              onChange={
                handleChange
              }
              rows={5}
              className="w-full p-3 bg-[#0C1225] text-white rounded-lg"
            />
          ) : (
            <p className="text-slate-400 text-sm">
              {form.bio ||
                "No bio added"}
            </p>
          )}
        </div>
      </div>

      {/* SAVE */}
      {isEditing && (
        <div className="flex justify-end">
          <button
            onClick={
              handleSave
            }
            disabled={
              loading
            }
            className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
}