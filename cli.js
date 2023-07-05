const { exec } = require('child_process');
const path = require('path');

// Function to start Flask server
function startFlaskServer() {
  const pythonScriptPath = path.join(__dirname, 'backend', 'API', 'app.py');
  exec(`python -m ${pythonScriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Flask server error: ${error}`);
    } else {
      console.log(`Flask server running`);
    }
  });
}

// Function to start React server
function startReactServer() {
  exec('npm start', { cwd: 'frontend' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`React server error: ${error}`);
    } else {
      console.log(`React server running`);
    }
  });
}

// Function to start both servers
function startServers() {
  startFlaskServer();
  startReactServer();
}

startServers();