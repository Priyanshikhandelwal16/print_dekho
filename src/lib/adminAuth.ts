import fs from "fs/promises";
import path from "path";

const CONFIG_FILE_PATH = path.join(process.cwd(), "src", "data", "admin-config.json");

export async function getAdminPassword(): Promise<string> {
  try {
    const data = await fs.readFile(CONFIG_FILE_PATH, "utf-8");
    const json = JSON.parse(data);
    return json.password || process.env.ADMIN_PASSWORD || "admin123";
  } catch (error) {
    // If file doesn't exist, use env variable/fallback
    return process.env.ADMIN_PASSWORD || "admin123";
  }
}

export async function setAdminPassword(newPassword: string): Promise<void> {
  // Ensure the directory exists
  await fs.mkdir(path.dirname(CONFIG_FILE_PATH), { recursive: true });
  await fs.writeFile(
    CONFIG_FILE_PATH,
    JSON.stringify({ password: newPassword }, null, 2),
    "utf-8"
  );
}
