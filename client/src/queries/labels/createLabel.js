import { API_URL, API_TOKEN } from "../../constants/constants";

export async function createLabel(labelData) {
  try {
    const response = await fetch(`${API_URL}/labels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data: labelData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to create label");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error creating label:", error);
    throw error;
  }
}
