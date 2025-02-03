use serde::{Deserialize, Serialize};
use std::io::Cursor;

#[derive(Deserialize, Serialize, Debug)]
pub struct EmailRecord {
    name: String,
    email: String,
    subject: String,
    body: String,
    time: String, // Ensure time is in a sortable format (e.g., "YYYY-MM-DD HH:mm:ss")
}

#[tauri::command]
pub fn sort_csv(file_data: String) -> Result<Vec<EmailRecord>, String> {
    // Create a CSV reader from the file content
    let reader = Cursor::new(file_data);
    let mut csv_reader = csv::ReaderBuilder::new()
        .has_headers(true) // Enable CSV headers
        .from_reader(reader);

    // Collect records into a vector
    let mut records: Vec<EmailRecord> = csv_reader
        .deserialize()
        .filter_map(|result| result.ok()) // Skip invalid rows
        .collect();

    // Sort records by the "time" field
    records.sort_by_key(|record| record.time.clone());

    Ok(records)
}
