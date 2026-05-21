const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('\\${')) {
        content = content.replace(/\\\$\{/g, '${');
        fs.writeFileSync(filePath, content);
        console.log('Fixed', filePath);
      }
    }
  });
}

walk('/Users/harshsingh/.gemini/antigravity/scratch/flipkart-clone/client/src');
