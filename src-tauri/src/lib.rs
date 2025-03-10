// use tauri::Builder;
// use tauri_plugin_sql::Builder;

pub mod commands;
pub mod migration;

// commands::greet::greet();

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations(
                    "sqlite:EmailAutomationSystem.db",
                    migration::get_migrations(),
                )
                .build(),
        )
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::greet::greet,
            commands::send_email::send_email,
            commands::sort_csv::sort_csv
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
