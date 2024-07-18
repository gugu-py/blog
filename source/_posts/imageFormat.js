const fs = require('fs');
const path = require('path');

// String to replace the root directory of the images
const newRootDir = 'https:///blog.gu33gu.asia/_resources/';

// Get the directory where the script is located
const directoryPath = path.dirname(__filename);

// Function to replace image paths in a single Markdown file
function replaceImagePaths(filePath, newRootDir) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            return;
        }

        // Regular expression to match image paths in the format ![[path]]
        const imgRegex = /!\[\[[^\]]*_resources\/([^\]]+)\]\]/g;
        const newData = data.replace(imgRegex, (match, imgPath) => {
            const fileName = path.basename(imgPath); // Extract the file name
            const newPath = path.join(newRootDir, fileName); // Construct the new path
            return `![](<${newPath}> "a")`;
        });

        fs.writeFile(filePath, newData, 'utf8', err => {
            if (err) {
                console.error(`Error writing file ${filePath}:`, err);
                return;
            }
            console.log(`Successfully updated image paths in ${filePath}`);
        });
    });
}

// Function to process all Markdown files in a directory
function processDirectory(directoryPath, newRootDir) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${directoryPath}:`, err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directoryPath, file);
            if (path.extname(file) === '.md') {
                replaceImagePaths(filePath, newRootDir);
            }
        });
    });
}

// Start processing
processDirectory(directoryPath, newRootDir);
