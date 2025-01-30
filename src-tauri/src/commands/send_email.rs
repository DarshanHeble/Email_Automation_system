use dotenvy::dotenv;
use std::env;

use lettre::message::{Message, SinglePart};
use lettre::transport::smtp::authentication::Credentials;
use lettre::{SmtpTransport, Transport};
// use std::error::Error;

#[tauri::command]
pub fn send_email(to: &str, subject: &str, body: &str) -> Result<(), String> {
    // Load environment variables from the .env file
    dotenv().ok();

    // Fetch variables
    let app_password = env::var("APP_PASSWORD").expect("APP_PASSWORD not found");
    let email_address = env::var("EMAIL_ADDRESS").expect("EMAIL_ADDRESS not found");

    // Construct the email message
    let email = match Message::builder()
        .from(email_address.parse().unwrap())
        .to(to.parse().unwrap())
        .subject(subject)
        .singlepart(SinglePart::plain(body.to_string()))
    {
        Ok(msg) => msg,
        Err(e) => return Err(format!("Failed to build email: {}", e)),
    };

    // Set up SMTP credentials
    let creds = Credentials::new(email_address.to_string(), app_password.to_string());

    // Configure the SMTP transport
    let mailer = SmtpTransport::relay("smtp.gmail.com")
        .unwrap()
        .credentials(creds)
        .build();

    // Send the email
    match mailer.send(&email) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to send email: {}", e)),
    }
}
