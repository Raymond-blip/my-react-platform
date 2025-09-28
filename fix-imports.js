const fs = require('fs');
const path = require('path');

const uiDir = path.join(__dirname, 'src', 'components', 'ui');

// Get all .tsx files in the ui directory
const files = fs.readdirSync(uiDir).filter(file => file.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(uiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove "use client" directive
  content = content.replace(/^"use client"\r?\n/, '');
  
  // Fix import paths
  content = content.replace(/@\/lib\/utils/g, '../../utils');
  content = content.replace(/@\/components\/ui\/([^"']+)/g, './$1');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${file}`);
});

console.log('All files fixed!');
