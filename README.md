This is a repo of toolkits used to interact with Stellar core, horizon and other interesting features of ExpressJS.

Getting Started
---------------

Pre-requisite: install NodeJs, Express, Git, and MongoDB.

```bash
# Get the latest snapshot
git clone git@github.com:michaelran16/hackathon-lightyear.git

# Change directory
cd hackathon-lightyear

# Install NPM dependencies
npm install

# Then simply start your app
node app.js

# Use nodemon to run
sudo npm install -g nodemon
nodemon

# Run MongoDB
# For Windows:
"C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"

```

Now check the preview at: http://localhost:8080/

```bash
# install Heroku, then
heroku login
heroku local

# link remote heroku app to current local repo
heroku git:remote -a lightyear -r heroku
# Now deploy
git push heroku master
```

Now check the heroku instance at: http://localhost:5000/

Original Contributor
---------------

For more, read: https://github.com/sahat/hackathon-starter

License
-------

The MIT License (MIT)

Copyright (c) 2018-2019 Michael Ran
