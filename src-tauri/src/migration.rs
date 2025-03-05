use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "Create email_tasks table".into(),
            sql: "
                CREATE TABLE IF NOT EXISTS email_tasks (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    template_id TEXT,
                    scheduled_time DATETIME,
                    date DATE,
                    status TEXT DEFAULT 'pending',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            "
            .into(),
            kind: MigrationKind::Up,
        },
        // Add more migrations as needed
    ]
}
