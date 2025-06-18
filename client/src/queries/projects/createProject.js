import { API_TOKEN, API_URL } from "../../constants/constants";

export async function createProject(projectData) {
  console.log("Creating project with data:", projectData);
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(projectData),
  });
  console.log("response:", response);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Server error:", errorData);
    throw new Error(
      `Failed to create project: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  console.log("Project created successfully:", data);
  return data;
}
