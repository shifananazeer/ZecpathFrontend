const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

/* Get */
export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN);

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN);

/* Set */
export const setAccessToken = (
  token: string
): void => {
  localStorage.setItem(
    ACCESS_TOKEN,
    token
  );
};

export const setRefreshToken = (
  token: string
): void => {
  localStorage.setItem(
    REFRESH_TOKEN,
    token
  );
};

/* Clear */
export const clearSession = (): void => {
  localStorage.removeItem(
    ACCESS_TOKEN
  );
  localStorage.removeItem(
    REFRESH_TOKEN
  );
};