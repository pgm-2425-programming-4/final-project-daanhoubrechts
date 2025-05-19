import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchBacklogs(page, pageSize) {
  const result = await fetch(
    `${API_URL}/backlogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  const data = await result.json();
  return data;
}
