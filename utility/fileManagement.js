const fs = require('fs').promises;
const path = require('path');

const folderPath = 'database/';

async function ensureFolderExists() {
    try {
        await fs.mkdir(folderPath, { recursive: true });
    } catch (error) {
        console.error('Error creating folder:', error);
    }
}

async function readFileSync(filePath) {
    try {
        await ensureFolderExists(); 
        const fullPath = path.join(folderPath, filePath);

        const data = await fs.readFile(fullPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            
            console.log(`File not found: ${filePath}. Creating it with an empty object.`);
            await writeFileSync(filePath, {}); 
            return {}; 
        } else {
            console.error('Error reading file:', error);
            throw error; 
        }
    }
}

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
