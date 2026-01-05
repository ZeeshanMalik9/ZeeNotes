
const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'dsaData.js');
const outputPath = 'missing_links.txt';

console.log("Starting analysis...");

try {
    if (!fs.existsSync(filePath)) {
        console.error("File not found: " + filePath);
        process.exit(1);
    }
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    let output = "";

    let inQuestionsArray = false;
    let currentQuestion = null;
    let braceCount = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.includes('questions: [')) {
            inQuestionsArray = true;
            // potential nested questions arrays? dsaData usually has subTopics -> questions
            // We'll just assume any 'questions: [' starts a block.
            continue;
        }

        if (inQuestionsArray) {
            // Check for start of object
            // A line might be just '{' or '{ id: ...'
            const openBraces = (line.match(/{/g) || []).length;
            const closeBraces = (line.match(/}/g) || []).length;

            if (openBraces > 0) {
                if (currentQuestion === null) {
                    // Start of a question object (assuming direct child of questions array)
                    currentQuestion = { startLine: i + 1, hasLink: false, id: 'unknown', title: 'unknown' };
                    braceCount = 1; // We start at 1
                    // Logic correction: if line is "{ id: ... },", braces balance out same line.
                    // But usually questions span multiple lines.
                    // If multiple braces on line, we add them up.
                } else {
                    braceCount += openBraces;
                }
            }

            if (currentQuestion) {
                // Check properties
                if (line.includes('id:') && !currentQuestion.foundId) {
                    const match = line.match(/id:\s*['"]([^'"]+)['"]/);
                    if (match) { currentQuestion.id = match[1]; currentQuestion.foundId = true; }
                }
                if (line.includes('title:') && !currentQuestion.foundTitle) {
                    const match = line.match(/title:\s*['"]([^'"]+)['"]/);
                    if (match) { currentQuestion.title = match[1]; currentQuestion.foundTitle = true; }
                }
                if (line.includes('problemLink:')) {
                    currentQuestion.hasLink = true;
                }

                if (closeBraces > 0) {
                    braceCount -= closeBraces;
                    if (braceCount <= 0) {
                        // End of question object
                        if (!currentQuestion.hasLink) {
                            output += `Line ${currentQuestion.startLine}: ${currentQuestion.id} | ${currentQuestion.title}\n`;
                        }
                        currentQuestion = null;
                        braceCount = 0;
                    }
                }
            }

            // Check for end of questions array
            if (line.includes(']') && braceCount === 0) {
                // We might exit questions array, but there could be multiple topics.
                // We'll just stay in "scan mode" but reset specific question tracking
                inQuestionsArray = false;
            }
        }
    }

    fs.writeFileSync(outputPath, output);
    console.log("Analysis complete. Results written to " + outputPath);

} catch (err) {
    console.error("Error:", err);
    fs.writeFileSync(outputPath, "Error: " + err.message);
}
