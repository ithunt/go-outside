# Go Outside Today

***

Find things to do today based on the weather.

### Running Locally:
1. Get your Forecast.IO API Key [here](http://developers.forecast.io)
2. Edit index.js
3. > npm start
4. [http://localhost:3000/](http://localhost:3000/)

### Adding new conditions:
index.js

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





