import { API_TOKEN, API_URL } from "../../constants/constants";

export async function fetchTasks(page, pageSize, projectId = null) {
  let url = `${API_URL}/tasks?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*&filters[current_status][Name][$eq]=Backlog`;

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
