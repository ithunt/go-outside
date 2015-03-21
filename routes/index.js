var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');

var FORECAST_IO_API_KEY = '';

var Forecast = {
    URL : "https://api.forecast.io/forecast/" + FORECAST_IO_API_KEY + "/" ,
    get : function( lat, lng, result ) {

        https.get(Forecast.URL + lat + "," + lng, function(response) {
            var body = '';

            response.on('data', function(chunk) {
                body += chunk;
            });

            response.on('end', function() {
                var weather = parseForecastIOtoWeather(JSON.parse(body));
                result.render('index', //todo weather
                    {
                        title: 'Weather',
                        conditions: weather,
                        activities: getActivities(weather)
                    }
                );
            });

        }).on('error', function(error) {
                console.log(error);
            });

    }
};

getActivities = function( conditions ) {
    var activities = [];
    conditionChecks.forEach ( function( conditionCheck ) {
        var result = conditionCheck( conditions );
        if( result !== undefined ) {
            activities.push( result ) ;
        }
    } );
    return activities
};

//this is the whole point of the app
// you can use something from the forecastIO app to group the conditions together

var isSnowing = function( conditions ) {
    switch( conditions.icon ) {
        case "snow":
        case "light-snow":
        case "heavy-snow":
            return true;
            break;
    }
    return false;
}
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
    function( conditions ) {
        if ( conditions.temperature < 32 ) {
            //how do we actually check for snow?
            return "Go Skiing";
        }
        return undefined;
    },

    function( conditions ) {
        if ( conditions.temperature < 32 ) {
            return "Wear lots of layers."
        }
        return undefined;
    },
    function( conditions ) {
        if ( conditions.temperature > 50 ) //&& it's not raining!
            return "Go Hiking";
        return undefined;
    }
];

var parseForecastIOtoWeather = function( conditions ) {
    return {
        summary 	: conditions.currently.summary,
        icon        : conditions.currently.icon,
        temperature	: Math.round( conditions.currently.temperature ),
        feelsLike	: Math.round( conditions.currently.apparentTemperature ),
        windSpeed	: Math.round( conditions.currently.windSpeed ),
        windBearing : conditions.currently.windBearing ,
        windDirection:bearingToCompass( conditions.currently.windBearing),
        hourSummary : conditions.minutely.summary,
        hourIcon    : conditions.minutely.icon
    };
}

var bearingToCompass = function( bearing ) {
    console.log(bearing);
    //todo: Minor angles NE SE SW NW , 45 degree slices all around
    var compass;

    if( bearing >= 315 || bearing < 45 )
        compass = 'N';
    else if( bearing >= 45 && bearing < 135)
        compass = 'E';
    else if( bearing  >= 135 && bearing < 225 )
        compass = 'S';
    else if( bearing >= 225 && bearing < 315 )
        compass = 'W';

    return compass;
};


/* GET home page. */
router.get('/', function(req, res) {
   Forecast.get(42.1946, -71.0622, res);
});

module.exports = router;
