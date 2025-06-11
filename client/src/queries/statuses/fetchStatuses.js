import { API_URL, API_TOKEN } from "../../constants/constants";
export async function fetchStatuses() {
  try {
    const response = await fetch(`${API_URL}/statuses`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    const data = await response.json();
    console.log("Fetched statuses:", data);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching statuses:", error);
    return [];
  }
}

export function getStatusName(statusOption) {
  return (
    statusOption.attributes?.Name ||
    statusOption.Name ||
    statusOption.name ||
    "Unknown Status"
  );
}
