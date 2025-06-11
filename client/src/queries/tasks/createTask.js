import { API_TOKEN, API_URL } from "../../constants/constants";

/**
 * Creates a new task in the API
 * @param {Object} taskData - The task data to create
 * @param {string} taskData.title - The title of the task (required)
 * @param {string|null} taskData.description - The description of the task
 * @param {number|string} taskData.current_status - The ID of the status
 * @param {number|string} taskData.project - The ID of the project
 * @param {Array} taskData.labels - Array of label IDs
 * @returns {Promise<Object>} The created task data
 * @throws {Error} If the request fails
 */
export async function createTask(taskData) {
  console.log("Creating task with data:", taskData);

  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        title: taskData.title,
        description: taskData.description || null,
        current_status: taskData.current_status,
        project: taskData.project,
        labels: taskData.labels || [],
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Server error:", errorData);
    throw new Error(
      `Failed to create task: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  console.log("Task created successfully:", data);
  return data;
}
