import { API_TOKEN, API_URL } from "../../constants/constants";

export async function updateTaskStatus(taskId, statusId) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          current_status: statusId,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Server error:", errorData);
      throw new Error(
        `Failed to update task status: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in updateTaskStatus:", error);
    throw error;
  }
}
