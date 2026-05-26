import api from "./api";
import type { EmployerResponse  }  from "../types/candidates";


export const fetchUser = async ()  => {
    try {
      const response = await api.get('profiles/me/')

        return response.data;
    } catch (error: any) {
  console.log("STATUS:", error?.response?.status);
  console.log("DATA:", error?.response?.data);
}
};

export const updateCandidateProfile = async (
  profileId: number,
  payload: any
) => {
  const response = await api.put(
    `/profiles/candidate/${profileId}/`,
    payload,
  );

  return response.data;
};



export const getEmployers = async (
  search = "",
  sector = "",
  verified = "",
  cursor = ""
) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (sector) params.append("sector", sector);
  if (verified)
    params.append(
      "is_verified_company",
      verified
    );
  if (cursor) params.append("cursor", cursor);

  const res = await api.get<EmployerResponse>(
    `/profiles/employers/?${params.toString()}`
  );

  return res.data;
};

export const getNotifications = async () => {
  const res = await api.get("profiles/notifications/");
  return res.data;
};