import { EmailTask } from "../../Types";
import { getDatabase } from "./init";

// Initialize the email_tasks table
export async function initEmailTasksTable() {
  try {
    const db = await getDatabase();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS email_tasks (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          templateId TEXT,
          scheduledTime TEXT,
          status TEXT DEFAULT 'pending',
          createdAt TEXT
      )
    `);

    console.log("Email tasks table initialized Successfully.");
  } catch (error) {
    console.error("Error initializing email_tasks table:", error);
    throw new Error("Failed to initialize email_tasks table.");
  }
}

// Add a new email task
export async function addEmailTask(id: string, name: string) {
  try {
    const db = await getDatabase();
    const query = `
      INSERT INTO email_tasks (id, name)
      VALUES (?, ?)
    `;
    await db.execute(query, [id, name]);
    console.info("Email task added successfully.");
  } catch (error) {
    console.error("Error adding email task:", error);
    throw new Error("Failed to add email task.");
  }
}

// Update the template ID of an email task
export async function updateEmailTaskTemplateId(
  id: string,
  templateId: string
) {
  try {
    const db = await getDatabase();
    const query = `
      UPDATE email_tasks
      SET templateId = ?
      WHERE id = ?
    `;
    const result = await db.execute(query, [templateId, id]);
    if (result.rowsAffected === 0) {
      throw new Error(`No email task found with ID: ${id}`);
    }
  } catch (error) {
    console.error(
      `Error updating template ID for email task with ID ${id}:`,
      error
    );
    throw new Error("Failed to update template ID.");
  }
}

// Update the scheduled time of an email task
export async function updateEmailTaskScheduledTime(
  id: string,
  scheduledTime: string
) {
  try {
    const db = await getDatabase();
    const query = `
      UPDATE email_tasks
      SET scheduledTime = ?,
      WHERE id = ?
    `;
    const result = await db.execute(query, [scheduledTime, id]);
    if (result.rowsAffected === 0) {
      throw new Error(`No email task found with ID: ${id}`);
    }
  } catch (error) {
    console.error(
      `Error updating scheduled time for email task with ID ${id}:`,
      error
    );
    throw new Error("Failed to update scheduled time.");
  }
}

// Update the status of an email task
export async function updateEmailTaskStatus(
  id: string,
  status: "pending" | "completed" | "failed"
) {
  try {
    const db = await getDatabase();
    const query = `
      UPDATE email_tasks
      SET status = ?,
      WHERE id = ?
    `;
    const result = await db.execute(query, [status, id]);
    if (result.rowsAffected === 0) {
      throw new Error(`No email task found with ID: ${id}`);
    }
  } catch (error) {
    console.error(`Error updating email task with ID ${id}:`, error);
    throw new Error("Failed to update email task status.");
  }
}

// Delete an email task
export async function deleteEmailTask(id: string) {
  try {
    const db = await getDatabase();
    const query = `
      DELETE FROM email_tasks
      WHERE id = ?
    `;
    const result = await db.execute(query, [id]);
    if (result.rowsAffected === 0) {
      throw new Error(`No email task found with ID: ${id}`);
    }
  } catch (error) {
    console.error(`Error deleting email task with ID ${id}:`, error);
    throw new Error("Failed to delete email task.");
  }
}

// Retrieve all email tasks
export async function getAllEmailTasks() {
  try {
    const db = await getDatabase();
    const query = `
      SELECT * FROM email_tasks
      ORDER BY scheduledTime ASC
    `;
    const result = await db.select<EmailTask[]>(query);
    return result;
  } catch (error) {
    console.error("Error retrieving all email tasks:", error);
    throw new Error("Failed to retrieve email tasks.");
  }
}

// Retrieve a single email task by ID
export async function getEmailTaskById(id: string) {
  try {
    const db = await getDatabase();
    const query = `
      SELECT * FROM email_tasks
      WHERE id = ?
    `;
    const result = await db.select<EmailTask[]>(query, [id]);
    if (result.length === 0) {
      throw new Error(`No email task found with ID: ${id}`);
    }
    return result[0];
  } catch (error) {
    console.error(`Error retrieving email task with ID ${id}:`, error);
    throw new Error("Failed to retrieve email task.");
  }
}

// Add this new function after your existing functions
export async function deleteEmailTasksTable() {
  try {
    const db = await getDatabase();
    await db.execute(`
      DROP TABLE IF EXISTS email_tasks
    `);
    console.log("Email tasks table dropped successfully.");
  } catch (error) {
    console.error("Error dropping email_tasks table:", error);
    throw new Error("Failed to drop email_tasks table.");
  }
}
