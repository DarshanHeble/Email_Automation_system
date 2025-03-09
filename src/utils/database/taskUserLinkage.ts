import { v4 } from "uuid";
import { TaskUserLinkage } from "../../Types";
import { getDatabase } from "./init";

// Initialize the Task-User Linkage Table
export const initTaskUserLinkageDatabase = async () => {
  const db = await getDatabase();

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS task_user_linkage (
        id TEXT PRIMARY KEY,
        email_task_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        FOREIGN KEY (email_task_id) REFERENCES email_tasks(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  try {
    await db.execute(createTableQuery);
    console.log("Task-User Linkage Table created successfully.");
  } catch (error) {
    console.error("Error creating Task-User Linkage Table:", error);
  }
};

// Insert a new record into the Task-User Linkage table
export const addTaskUserLinkage = async (
  emailTaskId: string,
  userId: string
) => {
  const db = await getDatabase();

  const id = v4();

  const insertQuery = `
    INSERT INTO task_user_linkage (id, email_task_id, user_id)
    VALUES (?, ?, ?);
  `;

  try {
    await db.execute(insertQuery, [id, emailTaskId, userId]);
    console.log("Task-User linkage added successfully.");
  } catch (error) {
    console.error("Error inserting into Task-User Linkage:", error);
  }
};

// Delete a record by emailTaskId and userId from the Task-User Linkage table
export const deleteTaskUserLinkage = async (
  emailTaskId: string,
  userId: string
) => {
  const db = await getDatabase();

  const deleteQuery = `
    DELETE FROM task_user_linkage WHERE email_task_id = ? AND user_id = ?;
  `;

  try {
    await db.execute(deleteQuery, [emailTaskId, userId]);
    console.log(
      `Task-User linkage with emailTaskId ${emailTaskId} and userId ${userId} deleted successfully.`
    );
  } catch (error) {
    console.error(
      "Error deleting Task-User Linkage by emailTaskId and userId:",
      error
    );
  }
};

// Retrieve all records from the Task-User Linkage table
export const getAllTaskUserLinkages = async () => {
  const db = await getDatabase();

  const selectQuery = `
    SELECT * FROM task_user_linkage;
  `;

  try {
    const result = await db.select(selectQuery);
    console.log("Retrieved Task-User Linkages:", result);
    return result;
  } catch (error) {
    console.error("Error retrieving Task-User Linkages:", error);
    return [];
  }
};

// Retrieve records for a specific task ID
export const getTaskUserLinkagesByTaskId = async (emailTaskId: string) => {
  const db = await getDatabase();

  const selectQuery = `
    SELECT * FROM task_user_linkage WHERE email_task_id = ?;
  `;

  try {
    const result = await db.select<TaskUserLinkage[]>(selectQuery, [
      emailTaskId,
    ]);
    return result;
  } catch (error) {
    console.error("Error retrieving Task-User Linkages by Task ID:", error);
    return [];
  }
};

// Retrieve records for a specific user ID
export const getTaskUserLinkagesByUserId = async (userId: string) => {
  const db = await getDatabase();

  const selectQuery = `
    SELECT * FROM task_user_linkage WHERE user_id = ?;
  `;

  try {
    const result = await db.select(selectQuery, [userId]);
    console.log(`Retrieved Task-User Linkages for User ID ${userId}:`, result);
    return result;
  } catch (error) {
    console.error("Error retrieving Task-User Linkages by User ID:", error);
    return [];
  }
};

// Function to delete the Task-User Linkage Table
export const deleteTaskUserLinkageTable = async () => {
  const db = await getDatabase();

  const dropTableQuery = `
      DROP TABLE IF EXISTS task_user_linkage;
    `;

  try {
    await db.execute(dropTableQuery);
    console.log("Task-User Linkage Table deleted successfully.");
  } catch (error) {
    console.error("Error deleting Task-User Linkage Table:", error);
  }
};
