/**
 * @author Hayret Palaz
 */

"use strict";

// A couple of objects to test
var exampleObject1 = {
	value1: 1,
	value2: 2
};

var exampleObject2 = {
	value3: 3,
	value4: 4
};

// Get the elements to be bound
var elementGroup1 = document.querySelectorAll( "[data-bind-group1]" );
var elementGroup2 = document.querySelectorAll( "[data-bind-group2]" );

// Bind the NodeLists ant the objects
simpleTwoWayDataBind( exampleObject1, elementGroup1 );
simpleTwoWayDataBind( exampleObject2, elementGroup2 );

console.log("try exampleObject1.value1 = 20");