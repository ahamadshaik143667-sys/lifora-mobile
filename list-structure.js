const fs = require("fs");
const path = require("path");

function list(dir, prefix = "") {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const isDir = fs.statSync(fullPath).isDirectory();
    console.log(prefix + (isDir ? "📁 " : "📄 ") + file);
    if (isDir) list(fullPath, prefix + "   ");
  }
}

list("./");
