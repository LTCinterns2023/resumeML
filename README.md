## ResumeML

Welcome to ResumeML repository, please take a look at [/backend](https://github.com/LTCinterns2023/resumeML/tree/main/frontend) and [/frontend](https://github.com/LTCinterns2023/resumeML/tree/main/backend)

## Using cli.js
To run both the front and back end servers, please run
    - node cli.js
which will run both the React frontend server and the Flask backend server.
It will also install all dependencies for you (for both JS and Python).

You may need to run this file twice. Running it the first time may result in a long delay since packages are installing in the background. Expect
roughly ~5 mins. After running for the first time please activate the virtual env (you should see a popup in the bottom right corner in VS code 
asking you to configure a virtual environment)

After this install, you should see 
    (.venv) PS C:\User\GitHub\resumeML> 
in your terminal. This means you configured the virtual environment correctly and can now run
    - node cli.js
again to start up the servers.

## Troubleshooting With cli.js
### Node JS Issues
If you get any issue involving node or node.js not being present, pleaese install node through the following linkhttps://nodejs.org/en
    - Once installed correctly, running node --version in your terminal should return a version number

### Missing Venv Pop-Up Or Virtual Environment Issues
If you don't get the option to configure a venv, try using VS code. If not, try googling ways to configure your interperator to point to your virtual env.
Once you get to that section of your IDE which asks you configure your interpreter, point it to 
    - On MacOS: .venv/bin/python
    - On Windows: .venv/Scripts/python.exe

If this doesn't work, manually activate your virtual environment by running
    - On MacOS: source .venv/bin/activate
    - On Windows: cd .venv/bin/activate.ps1
in your resumeML working directory.

### Packages Missing
If you have packages missing, first activate your virtual environment (either automatically in VS Code) or manually (see above in the previous troubleshooting), then run
    - pip install -r "requirements.txt"
in your resumeML working directory. (try pip3 if this doesn't work)

# To-do List
- [ ] Add: Instructions for backend 
- [ ] Connect frontend and backend

...