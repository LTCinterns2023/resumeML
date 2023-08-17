## ResumeML

Welcome to the ResumeML repository, please take a look at [/frontend](https://github.com/LTCinterns2023/resumeML/tree/main/frontend) and [/backend](https://github.com/LTCinterns2023/resumeML/tree/main/backend)

 

[![Netlify Status](https://api.netlify.com/api/v1/badges/4dfb082e-71cc-4434-9d7f-ae618c7f1b3c/deploy-status)](https://app.netlify.com/sites/resumeml/deploys) [ResumeML](https://resumeml.netlify.app/) 


## Using cli.js

To run both the front and back end servers, please run: 
`node cli.js`
This will run both the React frontend server and the Flask backend server. It will also install all dependencies for you (for both JS and Python).

You may need to run this file twice. Running it the first time may result in a long delay since packages are installing in the background. Expect roughly ~5 mins. After running it for the first time, please activate the virtual env (you should see a popup in the bottom right corner in VS Code asking you to configure a virtual environment).

After this install, you should see:
```console
(.venv) PS C:\User\path\to\GitHub\resumeML\
```
in your terminal. This means you have configured the virtual environment correctly and can now run `node cli.js` again to start up the servers.

## Troubleshooting With cli.js

### Node JS Issues

If you encounter any issue involving node or node.js not being present, please install node through the following link:

[https://nodejs.org/en](https://nodejs.org/en)

Once installed correctly, running `node --version` in your terminal should return a version number.

### Missing Venv Pop-Up Or Virtual Environment Issues

If you don't get the option to configure a venv, try using VS code. If that doesn't work, try googling ways to configure your interpreter to point to your virtual env.

Once you reach the section in your IDE which asks you to configure your interpreter, point it to:

- On MacOS: `.venv/bin/python`
- On Windows: `.venv/Scripts/python.exe`

If this doesn't work, manually activate your virtual environment by running:

- On MacOS: `source .venv/bin/activate`
- On Windows: `cd .venv/Scripts/activate.ps1`

in your ResumeML working directory.

### Packages Missing

If you have missing packages, first activate your virtual environment (either automatically in VS Code or manually as described above), then run:
`pip install -r requirements.txt` in your ResumeML working directory. (Try `pip3` if this doesn't work)



