var model = {
	currentCartoon: null,
	cartoon: [
		{
			clickCount : 0,
			name : 'Dragon ball Z', 
			imgSrc : 'http://www.dbztcg.com/typo3conf/ext/dbztcg/Resources/Public/Images/header_DBZ_page.jpg'
		},
		{
			clickCount : 0,
			name : 'Pokemon', 
			imgSrc : 'http://www.clubit.tv/wp-content/uploads/2017/08/pokemon.jpg'
		},
		{
			clickCount : 0,
			name : 'Tom and Jerry', 
			imgSrc : 'https://upload.wikimedia.org/wikipedia/en/5/5f/TomandJerryTitleCardc.jpg'
		},
		{
			clickCount : 0,
			name : 'Dexters Laboratory', 
			imgSrc : 'https://vignette3.wikia.nocookie.net/soundeffects/images/e/ea/Dexter%27s_Laboratory_Poster.png/revision/latest?cb=20151114145023'
		},
		{
			clickCount : 0,
			name : 'Swat Kats', 
			imgSrc : 'https://upload.wikimedia.org/wikipedia/en/f/fb/SwatKatsseason2.jpg'
		}
	]
};

/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cartoon to the first one in the list
        model.currentCartoon = model.cartoon[0];

        // tell our views to initialize
        cartoonListView.init();
        cartoonView.init();
    },

    getcurrentCartoon: function() {
        return model.currentCartoon;
    },

    getcartoons: function() {
        return model.cartoon;
    },

    // set the currently-selected cartoon to the object passed in
    setcurrentCartoon: function(cartoon) {
        model.currentCartoon = cartoon;
    },

    // increments the counter for the currently-selected cartoon
    incrementCounter: function() {
        model.currentCartoon.clickCount++;
        cartoonView.render();
    }
};


/* ======= View ======= */

var cartoonView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.cartoonElem = document.getElementById('cartoon');
        this.cartoonNameElem = document.getElementById('cartoonTitle');
        this.cartoonImageElem = document.getElementById('cartoonimg');
        this.countElem = document.getElementById('clickIncr');

        // on click, increment the current cartoon's counter
        this.cartoonImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cartoon
        var currentCartoon = octopus.getcurrentCartoon();
        this.countElem.textContent = currentCartoon.clickCount;
        this.cartoonNameElem.textContent = currentCartoon.name;
        this.cartoonImageElem.src = currentCartoon.imgSrc;
    }
};

var cartoonListView = {

    init: function() {
        // store the DOM element for easy access later
        this.cartoonListElem = document.getElementById('favCartoons');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cartoon, elem, i;
        // get the cartoons we'll be rendering from the octopus
        var cartoons = octopus.getcartoons();

        // empty the cartoon list
        this.cartoonListElem.innerHTML = '';

        // loop over the cartoons
        for (i = 0; i < cartoons.length; i++) {
            // this is the cartoon we're currently looping over
            cartoon = cartoons[i];

            // make a new cartoon list item and set its text
            elem = document.createElement('li');
            elem.textContent = cartoon.name;

            // on click, setcurrentCartoon and render the cartoonView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cartoon variable to the click event function)
            elem.addEventListener('click', (function(cartoonCopy) {
                return function() {
                    octopus.setcurrentCartoon(cartoonCopy);
                    cartoonView.render();
                };
            })(cartoon));

            // finally, add the element to the list
            this.cartoonListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();
