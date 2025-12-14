/**
 * Copy data script - copies waste-report.json into dashboard src folder
 * Run with: npm run ingest
 */
const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', '..', 'mock_data', 'waste-report.json');
const destDir = path.join(__dirname, '..', 'src', 'data');
const dest = path.join(destDir, 'waste-report.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('📁 Created src/data directory');
}

// Copy the file
try {
  fs.copyFileSync(source, dest);
  console.log('✅ Copied waste-report.json to src/data/');
} catch (error) {
  console.error('❌ Error copying file:', error.message);
  process.exit(1);
}
