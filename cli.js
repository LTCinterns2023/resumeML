const { exec } = require("child_process");
const fs = require("fs");
const os = require("os");

// Create Venv
function createVenv(venvCmd) {
  return new Promise((resolve, reject) => {
    const pwd = fs.readdirSync(process.cwd());
    
    if (!(pwd.includes(".venv"))) {
      console.log("downloading all prerequites for backend server")
      exec(
        `python -m venv .venv && 
        ${venvCmd} &&
        pip install -r requirements.txt `,
        (error, stdout, stderr) => {
          if (error) {
            console.log(`Creating Virtual Env Failed: ${error}`);
            reject(error);
          } else {
            console.log(`${stdout}`)
            console.log(`Venv Created Successfully`);
            resolve();
          }
        }
      );
    } else {
      console.log(
        "Venv Already Created | Dependencies For Python Already Installed"
      );
      resolve();
    }
  });
}

// Function to start Flask server
async function startFlaskServer() {
  // Activate Venv
  let venvCmd;
  if (os.platform() === "win32") {
    venvCmd = `.venv\\Scripts\\activate`;
  } else {
    venvCmd = `source .venv/bin/activate`;
  }

  // Create Venv
  await createVenv(venvCmd);

  // Running Flask
  exec(
    `python app.py`, { cwd: "backend/" },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Flask server error: ${error}`);
      } else {
        console.log(`Flask server running ${stdout}`);
      }
    }
  );
}

// Function to start React server
function startReactServer() {
  const reactProcess = exec("npm i && npm start", { cwd: "frontend" });

  // Log the output and error streams
  reactProcess.stdout.on("data", (data) => {
    console.log(data);
  });

  reactProcess.stderr.on("data", (data) => {
    console.error(data);
  });

  reactProcess.on("exit", (code) => {
    console.log(`React server process exited with code ${code}`);
  });
}

// Function to start both servers
function startServers() {
  startFlaskServer();
  startReactServer();
}

startServers();
console.log('\x1b[35m%s\x1b[0m', "To Test If Backend API is running go to http://127.0.0.1:5000");
