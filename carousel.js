var Cards = function Cards(id) {
    var carouselId = id;
    var currentIdx = 0;

    var cards = [{
      "card": { "image":"images/canyon-cliff.jpg",
                 "title":"Remote Locations",
                 "info":"Visit luxurious locations far from the beaten path."}
      },{
      "card": {"image":"images/green-plant.jpg",
               "title":"House Plants",
               "info":"Come see our wide array of house plants."}
      },{
      "card": {"image":"images/camper-campervan.jpg",
               "title":"Camper Friendly Roads",
               "info":"Family destinations easily accessible with your camper or RV."}
      },{
      "card": {"image":"images/architecture-buildings.jpg",
               "title":"City Scapes",
               "info":"Best places to visit for the city dweller."}
      }
    ];


  return {
    getCards: function getCards() {
        return cards;
    },

    plusCard: function plusCard(n) {
        this.displayCard(currentIdx + n);
    },

    jumpToCard: function jumpToCard(id) {
        var n = /\d+/.exec(id);
        this.displayCard(n);

        // stop the timer.
        clearTimeout(toInt);
    },

    nextCard: function nextCard() {
        this.displayCard(currentIdx + 1);
        this.deckTimer();
    },

    deckTimer: function deckTimer() {
        toInt = setTimeout(function(){ deck.nextCard() }, 3000);
    },

    indCurrentCard: function indCurrentCard() {
        // Un-display all indicators.
        var div = document.getElementById(carouselId);
        for (i = 0; i < cards.length; i++) {
             $("#cardInd" + i).css('background-color', 'black');
        }

        // Highlight the appropriate indicator.
        $("#cardInd" + currentIdx).css('background-color', 'white');
    },

    // put all the cards on the display, but display as none. Then all we have to do later is display the one we want.
    displayDeck: function displayDeck() {
        var div = document.getElementById(carouselId);
        var outstr = "";
        for (i = 0; i < cards.length; i++) {
            outstr += "<div id=\"card" + i +"\" class=\"displayNone\">" +
                        "<img src=\"" + cards[i].card.image + "\" class=\"cardCenter\">" +
                        "<div class=\"cardTitle\">" + cards[i].card.title + "</div>" +
                        "<div class=\"cardInfo\">" + cards[i].card.info +"</div>" +
                      "</div>";

        }

        // Add the page controls.
        outstr += '<div class="arrowLeft">&#10094;</div>' +
                  '<div class="arrowRight">&#10095;</div>';

        // Put up the current card indicator.
        outstr += '<div class="indicators">';
        for (i = 0; i < cards.length; i++) {
            outstr += "<span id=\"cardInd" + i + "\" class=\"cardInd cardInd-inactive\"></span>"
        }
        outstr += '</div>';

        div.innerHTML = outstr;

        // Create the onclick methods.
        $('div').click(function(e) {
            var btn = $(e.target);
            if (btn.hasClass('arrowLeft')) {
                deck.plusCard(-1);
            }
            else if (btn.hasClass('arrowRight')) {
                deck.plusCard(1);
            }
            else if (btn.hasClass('cardInd')) {
                deck.jumpToCard(btn.attr('id'));
            }
        });

        currentIdx = 0;
        this.displayCard(currentIdx);
    },

    displayCard: function displayCard(idx) {
        if (idx > cards.length - 1){
            // If we have moved too far to the right, display the far left card.
            idx = 0;
        }
        else if (idx < 0) {
            // If we have moved too far to the left, display the far right card.
            idx = cards.length - 1;
        }

        // Un-display all images.
        var div = document.getElementById(carouselId);
        for (i = 0; i < cards.length; i++) {
             $("#card" + i).hide();
        }

        // Display the appropriate card.
        $("#card" + idx).show();
        currentIdx = idx;
        this.indCurrentCard();
    }
  }
}
