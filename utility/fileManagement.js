const fs = require('fs').promises; 

const folderPath = 'database/'

async function readFileSync(filePath) {
    try {
        const data = await fs.readFile(folderPath + filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log('Error fetching file:', error);
        return {};
    }
}

async function writeFileSync(filePath, data) {
    try {
        await fs.writeFile(folderPath + filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

function generateID() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

module.exports = {
    readFileSync,
    writeFileSync,
    generateID
};