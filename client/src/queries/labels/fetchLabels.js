import { API_URL, API_TOKEN } from "../../constants/constants";

/**
 * Fetches all available labels from the API
 * @returns {Promise<Array>} Array of label objects
 */
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

/**
 * Helper function to safely get the name of a label from different possible structures
 * @param {Object} label - The label object
 * @returns {string} The name of the label
 */
export function getLabelName(label) {
  return label.attributes?.name || label.name || label.Name || "Unknown Label";
}
