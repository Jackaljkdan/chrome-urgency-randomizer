# Overview

To use the extension:

* you first need to build it (instructions follow in the next sections)

* add the build as a chrome extension


# Build

You need node js to build the extension. I used version v20.9.0, I don't know if it works with any other version.

After downloading and installing node js, open a terminal in the root of the project.

Run this command to install dependencies:
```
npm i
```

The `i` in the command stands for install. You need only run this once.


To build, execute this command in the root folder of this project:
```
npm run build
```

You need to run this command every time you edit the code.

You can find the build output in the `/dist` folder under the root of the project.


# Add extension to chrome

Follow this video from 4:26 to 5:00
https://www.youtube.com/watch?v=0n809nd4Zu4&t=4m26s

Note that you need to select the `/dist` folder, not the project root!


## Apply code changes to the extension

Whenever you edit any code you need to:
* (optional) increase the version in `public/manifest.json`
* rebuild the extension
* reload the extension in the browser
* refresh the page

I recommend you always increase the version because this is logged in the browser console when the extension is loaded (look for "urgency-randomizer vX.Y") and lets you easily make sure that you succesfully updated the bot.
Otherwise you might risk running an older version without realizing it.
