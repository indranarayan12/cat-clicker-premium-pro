

var model = {

    currentCat: cat[0],
    adminMode: false,
    cat: [
        {
            catId: 1,
            imgUrl: 'img/cat1.jpg',
            counter: 0,
            catName: 'cuty'
        },
        {
            catId: 2,
            imgUrl: 'img/cat2.jpg',
            counter: 0,
            catName: 'puty'
        },
        {
            catId: 3,
            imgUrl: 'img/cat3.jpg',
            counter: 0,
            catName: 'suty'
        },
        {
            catId: 4,
            imgUrl: 'img/cat4.jpg',
            counter: 0,
            catName: 'nuty'
        },
        {
            catId: 5,
            imgUrl: 'img/cat5.jpg',
            counter: 0,
            catName: 'duty'
        },
        {
            catId: 6,
            imgUrl: 'img/cat6.jpg',
            counter: 0,
            catName: 'zuty'
        },
        {
            catId: 7,
            imgUrl: 'img/cat7.jpg',
            counter: 0,
            catName: 'wuty'
        }
    ]
};

var octupus = {
    init: function () {
        model.currentCat = model.cat[0];
        catList.init();
        catView.init();
    },

    getCats: function () {
        return model.cat;
    },

    setCurrentCat: function (clickedCat) {
        model.currentCat = clickedCat;
    },

    returnCurrentCat: function(){
        return model.currentCat;
    },

    incrementCount: function() {
        model.currentCat.counter++;
        catView.render();
    },

    trueAdminMode: function() {
        model.adminMode = true;
        adminView.init();
    },

    falseAdminMode: function() {
        model.adminMode = false;
    },

    getAdminMode: function() {
        return model.adminMode;
    },

    changeCat: function(name, imageUrl, clicks) {
        var cat = model.currentCat;
        cat.imgUrl =  imageUrl;
        cat.catName = name;
        cat.counter = clicks;
        //console.log(cat.imageUrl);
        catList.render();
        catView.render();
    }



};



var catList = {
    init: function () {
        this.catListElem = document.getElementById('cat-list');
        this.render();
    },

    render: function () {
        var i;
        this.catListElem.innerHTML='';
        var cats = octupus.getCats();
        for (i = 0; i < cats.length; i++) {
            cat = cats[i];
            var newButton = document.createElement('button');
            newButton.innerHTML = cat.catName;
            newButton.addEventListener('click', (function (catCopy) {
                return function () {
                    octupus.setCurrentCat(catCopy);
                    catView.render();
                }
            })(cat));

            this.catListElem.appendChild(newButton);
        }
    }
};

var catView = {
    init: function () {
        this.clickedElem = document.getElementById('cat');
        this.countTag = document.getElementById('counter');
        this.displayImage = document.getElementById('clicker');
        this.displayImage.addEventListener('click', function(){
            octupus.incrementCount();
        });
        this.render();
        this.adminElem = document.getElementById('admin');
        this.adminElem.addEventListener('click', function(){
            octupus.trueAdminMode();
        });
        if(octupus.getAdminMode()){
            adminView.init();
        };
    },

    render: function(){
        //this.clickedElem.innerHTML = '';
        var displayCat = octupus.returnCurrentCat();
        this.countTag.innerHTML = displayCat.catName + ': ' + displayCat.counter + ' clicks';
        this.displayImage.setAttribute('src',displayCat.imgUrl);
        //console.log(displayCat.imgUrl);
    }

};

var adminView = {
    init: function(){//console.log("!");
        document.getElementById('form').style.visibility = "visible";
        this.cancelElem = document.getElementById('cancel');
        this.cancelElem.addEventListener('click',function(event){
            event.preventDefault();
            document.getElementById('form').style.visibility = "hidden";
            octupus.falseAdminMode();
        });
        this.saveElem = document.getElementById('save');
        this.saveElem.addEventListener('click',function(event){
            event.preventDefault();
            document.getElementById('form').style.visibility = "hidden";
            var name = document.getElementById('name').value;
            var imageUrl = document.getElementById('image-url').value;
            var clicks = document.getElementById('clicks').value;
            octupus.changeCat(name, imageUrl, clicks);
        });
    }
};



octupus.init();
