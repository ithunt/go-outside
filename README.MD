# Go Outside Today

***

Find things to do today based on the weather.

### Running Locally:
1. Get your Forecast.IO API Key [here](http://developers.forecast.io)
2. Edit routes/index.js
3. > npm start
4. [http://localhost:3000/](http://localhost:3000/)

### Adding new conditions:
routes/index.js contains most of the logic

    var conditionChecks = [
        function() {
            //You can always go outside
            return "Take a walk.";
        },
        function( conditions ) {
            if( isSnowing(conditions) ) {
                return "Build a Snowman.";
            }
            return undefined;
        },

### Tech
Node.js with Express for routing and Jade Templating Language

### Purpose
With the introduction of Node.js it is now possible to create full stack web applications in a single language, Javascript. Leaving aside the debates about Javascript itself, this confers enormous benefits for programmer productivity. Task Switching is a cognitively expensive task for us humans. After getting excited about a new feature I coded in my Java backend, I've found my excitement quickly dissipates as I drop one mental model and its associated muscle memory for another and attempt to hammer out a view.

Still looking for hard science related to programming but cognitive task switching is well studied in psychology.
[Mental Context Switches Are Evil](http://www.johndcook.com/blog/2011/06/09/mental-context-switches-are-evil/)






