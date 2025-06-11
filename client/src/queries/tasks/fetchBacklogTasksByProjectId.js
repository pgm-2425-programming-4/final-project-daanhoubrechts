import { API_TOKEN, API_URL } from "../../constants/constants";

/**
 * Fetches backlog tasks for a specific project by ID with pagination
 * @param {number} page - The page number
 * @param {number} pageSize - The number of items per page
 * @param {string|number} projectId - The ID of the project
 * @returns {Promise<Object>} The paginated tasks data
 */
export async function fetchBacklogTasksByProjectId(page, pageSize, projectId) {
  let url = `${API_URL}/tasks?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*&filters[current_status][Name][$eq]=Backlog&filters[project][id][$eq]=${projectId}`;

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();
  return data;
}
