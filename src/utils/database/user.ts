import { User } from "../../Types";
import { getDatabase } from "./init";

/**
 * Initialize the User table.
 */
export async function initUsersTable() {
  const db = await getDatabase();
  try {
    await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          DOB DATE NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    console.log("Users table initialized successfully.");
  } catch (error) {
    throw new Error("Error in initialiing user table.");
  }
}

/**
 * Add a new user
 * @param id User ID
 * @param name User Name
 * @param email User Email
 * @param dob User Date Of Birth
 */
export async function addUser(user: User) {
  const db = await getDatabase();
  try {
    await db.execute(
      `
        INSERT INTO users (id, name, email, DOB)
        VALUES (?, ?, ?, ?)
        `,
      [user.id, user.name, user.email, user.dob]
    );
    console.log("User added successfully.");
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

// Remove a user by ID
export async function removeUser(id: string) {
  const db = await getDatabase();
  try {
    await db.execute(
      `
        DELETE FROM users
        WHERE id = ?
        `,
      [id]
    );
    console.log("User removed successfully.");
  } catch (error) {
    console.error("Error removing user:", error);
  }
}

// Update user information
export async function updateUser(
  id: string,
  name?: string,
  email?: string,
  dob?: string
) {
  const db = await getDatabase();
  try {
    // Dynamically build the update query based on provided fields
    const updates: string[] = [];
    const values: any[] = [];

    if (name) {
      updates.push("name = ?");
      values.push(name);
    }
    if (email) {
      updates.push("email = ?");
      values.push(email);
    }
    if (dob) {
      updates.push("DOB = ?");
      values.push(dob);
    }

    if (updates.length === 0) {
      console.log("No fields to update.");
      return;
    }

    values.push(id); // Add `id` for the WHERE clause

    const query = `
        UPDATE users
        SET ${updates.join(", ")}
        WHERE id = ?
      `;

    await db.execute(query, values);
    console.log("User updated successfully.");
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

// Retrieve all users
export async function getAllUsers() {
  const db = await getDatabase();
  try {
    const result = await db.select("SELECT * FROM users");
    console.log("Users retrieved successfully.");
    return result;
  } catch (error) {
    console.error("Error retrieving users:", error);
    return [];
  }
}

// Retrieve a user by ID
export async function getUserById(id: string) {
  const db = await getDatabase();
  try {
    const result = await db.select<User[]>(
      `
        SELECT * FROM users
        WHERE id = ?
        `,
      [id]
    );
    console.log("User retrieved successfully.");
    return result[0] || null;
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    return null;
  }
}
