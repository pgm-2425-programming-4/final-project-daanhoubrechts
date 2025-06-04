import { API_TOKEN, API_URL } from "../constants/constants";

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
