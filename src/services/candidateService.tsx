import api from "./api";

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