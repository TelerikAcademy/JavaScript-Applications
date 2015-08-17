'use strict';

// Global:
let me = 'go'; //globally scoped
var i = 'able'; //globally scoped

// Function:
function scoping() {
    let terOfRecommendation = 'awesome worker!'; //function block scoped
    var sityCheerleading = 'go!'; //function block scoped
};

// Block:
function letBlockScoping() {
    //tuce is *not* visible out here

    for( let tuce = 0; tuce < 5; tuce++ ) {
        //tuce is only visible in here (and in the for() parentheses)
    };

    //tuce is *not* visible out here
};

function varBlockScoping() {
    //nish *is* visible out here

    for( var nish = 0; nish < 5; nish++ ) {
        //nish is visible to the whole function
    };

    //nish *is* visible out here
};

// Additionally (Deprecated):
function conjunctionJunctionWhatsYour() {
    //sNotGetCrazy is *not* visible out here
/*
    let( sNotGetCrazy = 'now' ) {
        //sNotGetCrazy is only visible in here
    };
*/
    //sNotGetCrazy is *not* visible out here
};