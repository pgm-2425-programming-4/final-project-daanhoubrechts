import { API_URL, API_TOKEN } from "../../constants/constants";
export async function fetchLabels() {
  try {
    const response = await fetch(`${API_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    const data = await response.json();
    console.log("Fetched labels:", data);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching labels:", error);
    return [];
  }
}

export function getLabelName(label) {
  return label.attributes?.name || label.name || label.Name || "Unknown Label";
}
