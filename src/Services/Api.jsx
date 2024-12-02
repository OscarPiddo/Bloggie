const BASE_URL = "https://davidwaga.pythonanywhere.com/api/v1";

/**
 * Logs in the user with the provided credentials.
 * @param {Object} credentials - The user's login credentials (email, password).
 * @returns {Promise<Object>} - The response data.
 */
export const login = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

/**
 * Registers a new user with the provided details.
 * @param {Object} userDetails - The user's registration details (email, password, etc.).
 * @returns {Promise<Object>} - The response data.
 */
export const register = async (userDetails) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};
