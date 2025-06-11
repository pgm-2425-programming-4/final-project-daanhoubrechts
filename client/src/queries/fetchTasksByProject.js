import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchTasksByProject(project) {
  const result = await fetch(
    `${API_URL}/tasks?filters[project][name][$eq]=${project}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  const data = await result.json();
  return data;
}

//
