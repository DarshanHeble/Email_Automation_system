import { Template } from "../../Types";
import { getDatabase } from "./init";

/**
 * Initialize the templates table.
 */
export async function initTemplatesTable() {
  const db = await getDatabase();
  try {
    await db.execute(`
        CREATE TABLE IF NOT EXISTS templates (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            subject Text NOT NULL,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    console.log("Template table initialised successfully");
  } catch (error) {
    throw new Error("Error initializing templates table in Database");
  }
}

/**
 * Add a new template to the database.
 * @param id - Unique identifier for the template.
 * @param name - Name of the template.
 * @param subject - Subject of the template.
 * @param content - HTML content of the template.
 */
export async function addTemplate(
  id: string,
  name: string,
  subject: string,
  content: string
) {
  try {
    const db = await getDatabase();
    await db.execute(
      "INSERT INTO templates (id, name, subject, content) VALUES (?, ?, ?, ?)",
      [id, name, subject, content]
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
 * @param subject - New subject of the template.
 * @param content - New HTML content of the template.
 */
export async function updateTemplate(
  id: string,
  name: string,
  subject: string,
  content: string
) {
  try {
    const db = await getDatabase();
    const result = await db.execute(
      "UPDATE templates SET name = ?, subject = ?, content = ? WHERE id = ?",
      [name, subject, content, id]
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
    const db = await getDatabase();
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
    const db = await getDatabase();
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
 * Update the subject of an existing template in the database.
 * @param id - Unique identifier of the template to update.
 * @param subject - New subject of the template.
 */
export async function updateTemplateSubject(id: string, subject: string) {
  try {
    const db = await getDatabase();
    const result = await db.execute(
      "UPDATE templates SET subject = ? WHERE id = ?",
      [subject, id]
    );

    // Check if the update affected any rows
    if (result.rowsAffected === 0) {
      throw new Error(`No template found with ID: ${id}`);
    }

    console.log(`Template subject updated to "${subject}" successfully.`);
  } catch (error) {
    console.error("Error updating template subject:", error);
    throw error;
  }
}

/**
 * Fetch all templates from the database.
 * @returns A list of all templates
 */
export async function getTemplates() {
  const db = await getDatabase();
  try {
    const results = await db.select<Template[]>(
      "SELECT id, name, subject, content FROM templates"
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
  const db = await getDatabase();
  try {
    const results = await db.select<Template[]>(
      "SELECT * FROM templates WHERE id = ?",
      [id]
    );
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error("Error fetching template", error);
    throw error;
  }
}

/**
 * Delete a template by its ID.
 * @param id - Unique identifier of the template to delete.
 */
export async function deleteTemplate(id: string) {
  const db = await getDatabase();
  try {
    await db.execute("DELETE FROM templates WHERE id = ?", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting template", error);
    return false;
  }
}
