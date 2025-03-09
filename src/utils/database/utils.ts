import { getDatabase } from "./init";
import { getTemplateById } from "./templates"; // Import the getTemplateById function
import { getUsersByIds } from "./user";

/**
 * Get the template data for a given email task ID.
 * @param taskId - The ID of the email task.
 * @returns The template data if found, otherwise null.
 */
export async function getTemplateDataByTaskId(taskId: string) {
  try {
    const db = await getDatabase();
    const query = `
      SELECT template_id
      FROM email_tasks
      WHERE id = ?
    `;
    const result = await db.select<{ template_id: string }[]>(query, [taskId]);

    if (result.length === 0) {
      throw new Error(`No email task found with ID: ${taskId}`);
    }

    const templateId = result[0].template_id;
    if (!templateId) {
      throw new Error(
        `No template ID associated with email task ID: ${taskId}`
      );
    }

    const template = await getTemplateById(templateId);
    return template;
  } catch (error) {
    console.error(
      `Error retrieving template data for email task ID ${taskId}:`,
      error
    );
    throw new Error("Failed to retrieve template data.");
  }
}

/**
 * Get all users associated with a given email task ID.
 * @param taskId - The ID of the email task.
 * @returns An array of users associated with the task.
 */
export async function getUsersByTaskId(taskId: string) {
  try {
    const db = await getDatabase();
    const query = `
      SELECT user_id
      FROM task_user_linkage
      WHERE email_task_id = ?
    `;
    const result = await db.select<{ user_id: string }[]>(query, [taskId]);

    if (result.length === 0) {
      throw new Error(`No users found for email task ID: ${taskId}`);
    }

    const userIds = result.map((row) => row.user_id);
    const users = await getUsersByIds(userIds);
    return users;
  } catch (error) {
    console.error(`Error retrieving users for email task ID ${taskId}:`, error);
    throw new Error("Failed to retrieve users.");
  }
}
