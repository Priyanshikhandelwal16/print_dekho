import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "site-data.json");

export async function getSiteData() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading site data file:", error);
    throw new Error("Failed to read site data");
  }
}

export async function updateSiteData(newContent: Record<string, any>) {
  try {
    const currentData = await getSiteData();
    const updatedData = { ...currentData, ...newContent };
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedData, null, 2), "utf-8");
    return updatedData;
  } catch (error) {
    console.error("Error writing site data file:", error);
    throw new Error("Failed to update site data");
  }
}

export async function addInquiry(inquiryData: Record<string, any>) {
  try {
    const currentData = await getSiteData();
    const newInquiry = {
      id: `inq-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
      ...inquiryData,
    };
    
    const updatedInquiries = [newInquiry, ...(currentData.inquiries || [])];
    const updatedData = { ...currentData, inquiries: updatedInquiries };
    
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedData, null, 2), "utf-8");
    return newInquiry;
  } catch (error) {
    console.error("Error saving inquiry:", error);
    throw new Error("Failed to save inquiry");
  }
}
