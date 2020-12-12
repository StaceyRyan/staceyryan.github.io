class BendingUnit extends Robot {

    constructor() {
        
        super();
        this.homeCity = "Let's checkout a new city, dude.";
        this.favoriteMovie = "Wanna watch a movie? Pick a good one.";
        this.newName = "I need a new name, stat!"

        $('#setNewName').click(() => this.showNewNameForm());
        $('#bender-quote-btn').click(() => this.getQuote());

        this.quoteEventListener = [];

        this.updateMK1Status();
    }
    addQuoteListener(quoteWidgetCallbackFunction) {
            this.quoteEventListener.push(quoteWidgetCallbackFunction);
            }
    notifyQuoteListener(quote) {
        for (let i = 0; i < this.quoteEventListener.length; i++) {
            this.quoteEventListener[i](quote);
        }
    }

    async getQuote() {
        const quotePromise = await $.ajax({ url: `http://futuramaapi.herokuapp.com/api/characters/bender/1` });
        this.notifyQuoteListener(quotePromise[0]);
        }

    showNewNameForm() {

        $("#newNameForm").remove();

        this.roboElement.append(`
        <div id="mk1Settings">    
            <div class="jumbotron">
                <h1 class="display-4">Protect Bender with a new name.</h1>
                <p class="lead">Quick, change his name already.</p>
                <hr class="my-4">
                <form id="mk1SettingsForm">
                    <div class="form-group">
                        <label for="customName">Bender's Alias</label>
                        <input type="text" class="form-control" id="customName" placeholder="Enter a New Name">                    
                    </div>                
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>`);

        $("#mk1SettingsForm").submit((event) => {
            event.preventDefault();
            this.newName = $('#customName').val();
            this.newNameSet = true;

            $("#mk1Settings").remove();

            this.roboSystemsCheck();
        });
    }
    showNewName(){
        $("#mk1Settings").remove();
        let name = document.getElementById('MK1statusName');
        }
}