const fs = require('fs').promises;
const path = require('path');

// Resolve the absolute path for the folder
const folderPath = path.resolve('database');

// Ensure the folder exists
async function ensureFolderExists() {
    try {
        console.log(`Ensuring folder exists: ${folderPath}`);
        await fs.mkdir(folderPath, { recursive: true });
    } catch (error) {
        console.error('Error creating folder:', error);
        throw error; // Re-throw the error for debugging if necessary
    }
}

// Read a file, create it if it doesn't exist, and return the contents
async function readFileSync(filePath) {
    try {
        await ensureFolderExists(); // Make sure the folder exists
        const fullPath = path.join(folderPath, filePath);

        // Try reading the file
        const data = await fs.readFile(fullPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File does not exist, create it
            console.log(`File not found: ${filePath}. Creating it with an empty object.`);
            await writeFileSync(filePath, []); // Create the file with an empty object
            return []; // Return the empty object
        } else {
            console.error('Error reading file:', error);
            throw error; // Re-throw other errors
        }
    }
}

// Write data to a file
async function writeFileSync(filePath, data) {
    try {
        await ensureFolderExists(); // Make sure the folder exists
        const fullPath = path.join(folderPath, filePath);
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
