const filePath1 = "/Users/John/Documents/example.txt";
const filePath2 = "C:\\Windows\\System32\\notepad.exe";
const invalidFilePath = "/invalid/path<>.txt";
function isValidFilePath(path) {
    // Regular expression to match the file path format
    const filePathRegex = /^\/?(([a-zA-Z]:\\|\/)?([^\0<>:"/\\|?*\n\r]+(\\|\/)?)*)$/;
  
    // Test the input string against the regular expression
    return filePathRegex.test(path);
  }
console.log(isValidFilePath(filePath1)); // Output: true
console.log(isValidFilePath(filePath2)); // Output: true
console.log(isValidFilePath(invalidFilePath)); // Output: false