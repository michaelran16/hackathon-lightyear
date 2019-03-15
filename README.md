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

Copyright (c) 2014-2018 Sahat Yalkabov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
