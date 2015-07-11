# Specter

### A Solo Wiki Platform
*Specter* is a simple, elegant wiki platform intended to empower a single user. Traditional wiki platforms have focused on providing functionality for crowds of users to collaborate and have lagged on design and usability. *Specter* takes inspiration from [Ghost](https://github.com/TryGhost/Ghost) and seeks to provide a mobile first, secure, powerful, modern wiki platform.

### A Single User
Need a note taking platform? Simple Note too simple? Evernote too difficult to organize? Media Wiki too hard to manage and cluttered with unneeded functionality? *Specter* was born out of the need for a single user wiki platform that is easy to install, manage, and use. *Specter* focuses on providing the best wiki experience possible for a single user.

---

## Features
* Deploy In Minutes
* Upgrade In Minutes
* Mobile First
* Markdown Support
* Bookmark Support
* Realtime Editor
* Customizable Menu
* Unlimited Pages

---

## Usage

*Specter* uses MongoDB, ExpressJS, AngularJS, and NodeJS.

### Deploy Locally
* [Install NodeJS](https://github.com/joyent/node/wiki/Installation)
* Clone *Specter* source code locally
  * `git clone https://github.com/benvacha/specter.git`
* Enter *Specter* directory
  * `cd specter`
* Install dependencies
  * `npm install`
* Start the NodeJS application
  * `npm start`
* Open *Specter* in web browser
  * Browse to `localhost:3000`
* Enjoy!

### Deploy Heroku
* [Install Heroku Toolbelt](https://toolbelt.heroku.com)
* Clone *Specter* source code locally
  * `git clone https://github.com/benvacha/specter.git`
* Enter *Specter* directory
  * `cd specter`
* Create new Heroku application
  * `heroku create`
* Add MongoDB database to Heroku application
  * `heroku addons:create mongolab`
* Push source code to Heroku application
  * `git push heroku master`
* Open *Specter* in web browser
  * `heroku open`
* Enjoy!

---

## License

### The MIT License (MIT)

Copyright (c) 2015 Benjamin Vacha

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
