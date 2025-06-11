import { API_TOKEN, API_URL } from "../../constants/constants";

/**
 * Fetches tasks with pagination, optionally filtered by project
 * @param {number} page - The page number
 * @param {number} pageSize - The number of items per page
 * @param {string|number|null} projectId - The ID of the project (optional)
 * @returns {Promise<Object>} The paginated tasks data
 */
export async function fetchTasks(page, pageSize, projectId = null) {
  let url = `${API_URL}/tasks?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*&filters[current_status][Name][$eq]=Backlog`;

  // Add project filter if projectId is provided
  if (projectId) {
    url += `&filters[project][id][$eq]=${projectId}`;
  }

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();
  return data;
}
