import { API_URL, API_TOKEN } from "../../constants/constants";

/**
 * Fetches all available statuses from the API
 * @returns {Promise<Array>} Array of status objects
 */
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

/**
 * Helper function to safely get the name of a status from different possible structures
 * @param {Object} statusOption - The status object
 * @returns {string} The name of the status
 */
export function getStatusName(statusOption) {
  return (
    statusOption.attributes?.Name ||
    statusOption.Name ||
    statusOption.name ||
    "Unknown Status"
  );
}
