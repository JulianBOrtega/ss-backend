const fs = require('fs').promises;
const path = require('path');

const folderPath = path.resolve('database'); // Use absolute path

// Ensure the database folder exists
async function ensureFolderExists() {
  try {
    await fs.mkdir(folderPath, { recursive: true }); // Create folder recursively
  } catch (error) {
    console.error('Error creating folder:', error);
  }
}

// Read a file, create it as an empty array if it doesn’t exist
async function readFileSync(filePath) {
  try {
    await ensureFolderExists();
    const fullPath = path.join(folderPath, filePath);

    // Read the file
    const data = await fs.readFile(fullPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File does not exist, create it
      console.log(`File not found: ${filePath}. Creating it as an empty array.`);
      await writeFileSync(filePath, []); // Initialize as empty array
      return [];
    } else {
      console.error('Error reading file:', error);
      throw error;
    }
  }
}

// Write data to a file
async function writeFileSync(filePath, data) {
  try {
    await ensureFolderExists();
    const fullPath = path.join(folderPath, filePath);

    // Write the file
    await fs.writeFile(fullPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;
  }
}

// Generate a unique ID
function generateID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

module.exports = {
  readFileSync,
  writeFileSync,
  generateID,
};
