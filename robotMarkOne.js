class Robot {

    constructor() {
        this.roboElement = $('#righthand-panel'); //store a refernce to the robo DOM element 
        this.homeCity = "Shall we go on a holiday?";
        this.homeCitySet = false; //set to true when home city is set via the DOM
        this.favMovieSet = false; //set to true when favorite move is set via the DOM

        $('#setMK1City').click(() => this.showHomeCityForm());
        $('#setMK1Movie').click(() => this.showFavMovieForm());

        //setup the weather event listener
        this.weatherEventListener = [];

        //add a movie listener
        this.movieEventListener = [];
    }
    
    addWeatherListener(weatherWidgetCallbackFunction) {
        this.weatherEventListener.push(weatherWidgetCallbackFunction);
    }

    addMovieListener(movieWidgetCallbackFunction) {
        this.movieEventListener.push(movieWidgetCallbackFunction);
    }

    notifyWeatherListener(weather, icon) {
        for (let i = 0; i < this.weatherEventListener.length; i++) {
            this.weatherEventListener[i](weather, icon);
        }
    }
    notifyMovieListener(movie) {
        for (let i = 0; i < this.movieEventListener.length; i++) {
            this.movieEventListener[i](movie);
        }
    }

    updateMK1Status() {
        $('#MK1statusMovie').text(this.favoriteMovie);
        $('#MK1statusCity').text(this.homeCity);
        $('#MK1statusName').text(this.newName);
    }

    async getWeather(cityToSearch) {
        const weatherPromise = await $.ajax({ url: `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&APPID=88c9c78962c8f55c3cec2717c3aadf1b&units=metric` });

        //notify widgets and anything else wanting to know when the robot has new weather information
        this.notifyWeatherListener(weatherPromise, this.getWeatherIconFromResult(weatherPromise));

        return weatherPromise;
    }

    async getMovie(movieSearch) {
        const movieUrl = `https://www.omdbapi.com/?t=${movieSearch}&apikey=cd4586e5`
        const moviePromise = await $.ajax({ url: movieUrl });
        this.notifyMovieListener(moviePromise);

        return moviePromise
    }

    getWeatherIconFromResult(weatherResult) {
        const url = `https://openweathermap.org/img/wn/${weatherResult.weather[0].icon}@2x.png`;

        return `<img height="" src="${url}">`;
    }
    
    showFavMovieForm() {

        $("#mk1Settings").remove();

        this.roboElement.append(`
        <div id="mk1Settings">    
            <div class="jumbotron jumbotron-fluid">
                <h1 class="display-4">Pick a Movie We Can Watch</h1>
                <p class="lead">Is this a good movie?</p>
                <hr class="my-4">
                <form id="mk1SettingsForm">
                    <div class="form-group">
                        <label for="mk1MovieInput">MK1 Favourite Movie</label>
                        <input type="text" class="form-control" id="mk1MovieInput" placeholder="Enter Movie Name">                    
                    </div>                
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>`);


        //handle the form
        $("#mk1SettingsForm").submit((event) => {
            event.preventDefault(); //standard practice see here: https://api.jquery.com/submit/

            //set the robots favorite movie
            this.favoriteMovie = $('#mk1MovieInput').val();
            this.favMovieSet = true;

            $("#mk1Settings").remove(); //remove the settings from the dom

            this.roboSystemsCheck(); //see if all infomation has been collected
        });
    }

    showHomeCityForm() {

        $("#mk1Settings").remove(); //if the settings are already showing remove them and re-create

        //add the form to the DOM
        this.roboElement.append(`
        <div id="mk1Settings">    
            <div class="jumbotron jumbotron-fluid">
                <h1 class="display-4">Pick a city for us to visit.</h1>
                <p class="lead">This is where we're going!</p>
                <hr class="my-4">
                <form id="mk1SettingsForm">
                    <div class="form-group">
                        <label for="mk1CityInput">City to travel to.</label>
                        <input type="text" class="form-control" id="mk1CityInput" placeholder="Enter City!">                    
                    </div>                
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>`);

        //handle the form
        $("#mk1SettingsForm").submit((event) => {
            event.preventDefault(); //standard practice see here: https://api.jquery.com/submit/

            //set the home city
            this.homeCity = $('#mk1CityInput').val();
            this.homeCitySet = true;

            //remove the settings 
            $("#mk1Settings").remove();

            this.roboSystemsCheck(); //see if all infomation has been collected
        });
    }

    showMoviePoster() {
        //get the movie poster
        this.getMovie(this.favoriteMovie)
            .then((movie) => {
                // const poster = this.getMoviePosterResult(movie);


                $('.movie').remove(); //remove this if it exists
                //show the weather on the DOM        
                this.roboElement.append(`
                    <div class="movie">    
                        <div class="jumbotron jumobtron-fluid">
                             <h1 class="display-4">This is my favourite movie?</h1>
                             <p class="lead">Apparently, I like this movie.</p>
                             <hr class="my-4">
                             <p>
                                 We're going to watch ${movie.Title}. Have you seen this? <img src=${movie.Poster}/>
                            </p>
            
                        </div>
                     </div>`);

            })
            .catch((err) => console.log(err));
    }

    showHomeTownWeather() {
        //get the weather
        this.getWeather(this.homeCity)
            .then((weather) => {
                const icon = this.getWeatherIconFromResult(weather);


                $('#mk1StatusJumbo').remove(); //remove this if it exists

                //show the weather on the DOM        
                this.roboElement.append(`
                <div id="mk1StatusJumbo">    
                    <div class="jumbotron">
                        <h1 class="display-4">Is this a good town?</h1>
                        <p class="lead">This weather looks passable.</p>
                        <hr class="my-4">
                        <p>
                        We're off to ${weather.name} and the temperature is ${weather.main.temp}. They say it looks like this outside: ${icon}
                        </p>
                        
                    </div>
                </div>`);
            })
            .catch((err) => console.log(err));
    }

/**
 * Check if all settings have been added
 */
roboSystemsCheck() {
    if (this.homeCitySet) {
        this.homeCitySet = false;
        this.showHomeTownWeather();
    }

    if (this.favMovieSet) {
        this.favMovieSet = false;
        this.showMoviePoster();
    }

    if (this.newNameSet) {
        this.homeCitySet = false;
        this.showNewName();
    }

    this.updateMK1Status();
}
}