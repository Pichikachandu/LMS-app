const fs = require('fs');
const path = require('path');

// Path to package.json
const packageJsonPath = path.join(__dirname, 'package.json');

// Read the current package.json
fs.readFile(packageJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading package.json:', err);
    process.exit(1);
  }

  try {
    const packageJson = JSON.parse(data);
    
    // Add start script if it doesn't exist
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
    
    if (!packageJson.scripts.start) {
      packageJson.scripts.start = 'node index.js';
      console.log('Added start script to package.json');
    }

    // Write the updated package.json
    fs.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      'utf8',
      (writeErr) => {
        if (writeErr) {
          console.error('Error writing package.json:', writeErr);
          process.exit(1);
        }
        console.log('Successfully updated package.json');
      }
    );
  } catch (parseError) {
    console.error('Error parsing package.json:', parseError);
    process.exit(1);
  }
});
