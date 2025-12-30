import { content } from './src/data/content.js';
import fs from 'fs';

try {
    const backup = JSON.parse(fs.readFileSync('./backup.json', 'utf8'));

    // Extract data keys (include settings now!)
    const dataKeys = [
        "home", "about", "researchInterests", "papers", "projects", "blogs", "timeline", "certifications", "contact", "tryHackMe", "settings"
    ];

    const newContent = {};
    dataKeys.forEach(key => {
        if (backup[key] !== undefined) {
            newContent[key] = backup[key];
        } else if (content[key] !== undefined) {
            newContent[key] = content[key];
        }
    });

    const contentFileHeader = "export const content = ";
    fs.writeFileSync('./src/data/content.js', contentFileHeader + JSON.stringify(newContent, null, 4) + ";\n");
    console.log("src/data/content.js updated successfully with settings!");
} catch (e) {
    console.error("Sync failed:", e.message);
}
