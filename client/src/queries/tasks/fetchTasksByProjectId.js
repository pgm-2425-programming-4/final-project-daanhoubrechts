import { API_TOKEN, API_URL } from "../../constants/constants";

/**
 * Fetches all tasks for a specific project by ID
 * @param {string|number} projectId - The ID of the project
 * @returns {Promise<Object>} The tasks data
 */
export async function fetchTasksByProjectId(projectId) {
  const result = await fetch(
    `${API_URL}/tasks?filters[project][id][$eq]=${projectId}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  const data = await result.json();
  return data;
}
