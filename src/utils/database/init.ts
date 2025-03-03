import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;

/**
 * Initialize the database connection.
 * @returns Database instance.
 */

export async function getDatabase(): Promise<Database> {
  if (!db) {
    db = await Database.load("sqlite:EmailAutomationSystem.db");
  }
  return db;
}
