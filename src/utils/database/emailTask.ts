import { getDatabase } from "./init";

export async function initEmailTasksTable() {
  const db = await getDatabase();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS email_tasks (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        scheduled_time DATETIME NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
