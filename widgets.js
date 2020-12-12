class RoboWidget
{

    /**
     * 
     * Takes a UL element for adding widget information to
     * 
     * @param {*} widgetElement 
     */
    constructor(widgetElement, widgetType){
        this.widgetElement = widgetElement;
        this.widgetElement.append(`<li class="list-group-item">List of ${widgetType}.</li>`)
    }

    weatherWidgetCallback(weather, icon)
    {        
        this.widgetElement.append(`<li class="list-group-item">${weather.name} ${weather.main.temp} ${icon}</li>`)
    }

    movieWidgetCallback(movie){
        this.widgetElement.append(`<li class="list-group-item">${movie.Title} <img src=${movie.Poster}/></li>`)
    }

    quoteWidgetCallback(quote){
        this.widgetElement.append(`<li class="list-group-item">${quote.quote} </li>`)
    }

}