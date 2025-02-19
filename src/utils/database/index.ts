import Database from "@tauri-apps/plugin-sql";
import { Template } from "../../Types/types";

let db: Database | null = null;

/**
 * Initialize the database and create necessary tables if not found.
 */
export async function initDatabase() {
  if (!db) {
    db = await Database.load("sqlite:templates.db");
    await db.execute(`
        CREATE TABLE IF NOT EXISTS templates (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
  }
}

/**
 * Add a new template to the database.
 * @param id - Unique identifier for the template.
 * @param name - Name of the template.
 * @param content - HTML content of the template.
 */
export async function addTemplate(id: string, name: string, content: string) {
  try {
    if (!db) throw new Error("Database not initialized");
    await db.execute(
      "INSERT INTO templates (id, name, content) VALUES (?, ?, ?)",
      [id, name, content]
    );
    console.log(`Template "${name}" added successfully.`);
  } catch (error) {
    console.error("Error adding template:", error);
    throw error;
  }
}

/**
 * Update an existing template in the database.
 * @param id - Unique identifier of the template to update.
 * @param name - New name of the template.
 * @param content - New HTML content of the template.
 */
export async function updateTemplate(
  id: string,
  name: string,
  content: string
) {
  try {
    if (!db) throw new Error("Database not initialized");
    const result = await db.execute(
      "UPDATE templates SET name = ?, content = ? WHERE id = ?",
      [name, content, id]
    );

    // Check if the update affected any rows
    if (result.rowsAffected === 0) {
      throw new Error(`No template found with ID: ${id}`);
    }

    console.log(`Template "${name}" updated successfully.`);
  } catch (error) {
    console.error("Error updating template:", error);
    throw error;
  }
}

/**
 * Update the name of an existing template in the database.
 * @param id - Unique identifier of the template to update.
 * @param name - New name of the template.
 */
export async function updateTemplateName(id: string, name: string) {
  try {
    if (!db) throw new Error("Database not initialized");
    const result = await db.execute(
      "UPDATE templates SET name = ? WHERE id = ?",
      [name, id]
    );

    // Check if the update affected any rows
    if (result.rowsAffected === 0) {
      throw new Error(`No template found with ID: ${id}`);
    }

    console.log(`Template name updated to "${name}" successfully.`);
  } catch (error) {
    console.error("Error updating template name:", error);
    throw error;
  }
}

/**
 * Update the content of an existing template in the database.
 * @param id - Unique identifier of the template to update.
 * @param content - New HTML content of the template.
 */
export async function updateTemplateContent(id: string, content: string) {
  try {
    if (!db) throw new Error("Database not initialized");
    const result = await db.execute(
      "UPDATE templates SET content = ? WHERE id = ?",
      [content, id]
    );

    // Check if the update affected any rows
    if (result.rowsAffected === 0) {
      throw new Error(`No template found with ID: ${id}`);
    }

    console.log(`Template content updated successfully.`);
  } catch (error) {
    console.error("Error updating template content:", error);
    throw error;
  }
}

/**
 * Fetch all templates from the database.
 * @returns A list of all templates
 */
export async function getTemplates() {
  if (!db) throw new Error("Database not initialized");
  try {
    const results = await db.select<Template[]>(
      "SELECT id, name, content FROM templates"
    );
    return results;
  } catch (error) {
    console.error("Error fetching templates", error);
    return [];
  }
}

/**
 * Fetch a single template by its ID.
 * @param id - Unique identifier of the template.
 * @returns The template object if found, otherwise null.
 */
export async function getTemplateById(id: string) {
  if (!db) throw new Error("Database not initialized");
  try {
    const results = await db.select<Template[]>(
      "SELECT * FROM templates WHERE id = ?",
      [id]
    );
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error("Error fetching template", error);
    throw error;
    // return null;
  }
}

/**
 * Delete a template by its ID.
 * @param id - Unique identifier of the template to delete.
 */
export async function deleteTemplate(id: string) {
  if (!db) throw new Error("Database not initialized");
  try {
    await db.execute("DELETE FROM templates WHERE id = ?", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting template", error);
    return false;
  }
}
