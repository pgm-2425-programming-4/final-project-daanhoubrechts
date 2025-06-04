import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchProjectById(projectId) {
  try {
    const result = await fetch(`${API_URL}/projects/${projectId}?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!result.ok) {
      throw new Error(
        `Failed to fetch project: ${result.status} ${result.statusText}`
      );
    }

    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
}
