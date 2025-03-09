import { User } from "../../Types";
import { getDatabase } from "./init";
import { format, isValid } from "date-fns";

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
        dob TEXT NOT NULL,
        createdAt TEXT NOT NULL
    );

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
    const createdAT = new Date().toISOString();

    await db.execute(
      `
        INSERT INTO users (id, name, email, dob, createdAt)
        VALUES (?, ?, ?, ?, ?)
      `,
      [user.id, user.name, user.email, user.dob, createdAT]
    );
    console.log("User added successfully.", user);
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
export async function updateUser(user: User) {
  const db = await getDatabase();
  try {
    const query = `
        UPDATE users
        SET name = ?, email = ?, dob = ?
        WHERE id = ?
      `;

    await db.execute(query, [user.name, user.email, user.dob, user.id]);
    console.log("User updated successfully.");
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

// Retrieve all users
export async function getAllUsers() {
  const db = await getDatabase();
  try {
    const result = await db.select<User[]>("SELECT * FROM users");
    console.log("Users retrieved successfully.");
    console.table(result);
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

// Fetch user data by IDs
export const getUsersByIds = async (userIds: string[]): Promise<User[]> => {
  const db = await getDatabase();

  const selectQuery = `
    SELECT * FROM users WHERE id IN (${userIds.map(() => "?").join(", ")});
  `;

  try {
    const result = await db.select<User[]>(selectQuery, userIds);
    console.log("Retrieved Users by IDs:", result);
    return result;
  } catch (error) {
    console.error("Error retrieving Users by IDs:", error);
    return [];
  }
};

/**
 * Delete the Users table
 */
export async function deleteUsersTable() {
  const db = await getDatabase();
  try {
    await db.execute(`DROP TABLE IF EXISTS users;`);
    console.log("Users table deleted successfully.");
  } catch (error) {
    console.error("Error deleting users table:", error);
    throw new Error("Failed to delete users table.");
  }
}
