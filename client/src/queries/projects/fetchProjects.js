import { API_TOKEN, API_URL } from "../../constants/constants";

/**
 * Fetches all projects
 * @returns {Promise<Object>} The projects data
 */
export async function fetchProjects() {
  const result = await fetch(`${API_URL}/projects?populate=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();
  return data;
}
