//run our function when the window is ready
//add the "async" keyword to flag our function as asynchronous
$().ready(async() => {
    let robo = "";
    if (document.title === "Benderbot"){
        robo = new BendingUnit();
    }
    else {
        robo = new Robot();
    }

    const roboWeatherWidgetOne = new RoboWidget( $("#robo-weather-result"), "Robo Weather");
    robo.addWeatherListener(roboWeatherWidgetOne.weatherWidgetCallback.bind(roboWeatherWidgetOne)); //use bind to preserve scope of the widget THIS, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

    const roboMovieWidget = new RoboWidget( $("#robo-movie-result"), "Robo Movies");
    robo.addMovieListener(roboMovieWidget.movieWidgetCallback.bind(roboMovieWidget));

    const quoteWidget = new RoboWidget( $("#benderQuote"), "Bender Quotes");
    robo.addQuoteListener(quoteWidget.quoteWidgetCallback.bind(quoteWidget));

})
