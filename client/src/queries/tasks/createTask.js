import { API_TOKEN, API_URL } from "../../constants/constants";

export async function createTask(taskData) {
  console.log("Creating task with data:", taskData);
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(taskData),
  });
  console.log("response:", response);

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
