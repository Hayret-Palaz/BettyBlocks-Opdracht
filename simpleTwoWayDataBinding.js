/**
 * @author Hayret Palaz
 */

"use strict";

/*

	This library creates a two way data bind between an object and one or more elements
	To bind the element(s) set their dataset.bindProperty to the source object property you want to bind to.
	Then call simpleTwoWayDataBind with the object and the NodeList containing the elements to be bound.

*/

/**
 *
 * @param source {Object} The source object.
 * @param elements {NodeList} List of elements.
 */
function simpleTwoWayDataBind( source, elements ) {
	// Keep track of properties which already have a setter
	var propertiesWithSetter = [];

	// Copy initial values from the source object to the elements
	elements.forEach( function ( element ) {
		var property = element.dataset.bindProperty;
		setValue( element, source[property] );
	} );

	// Add an event listener to input elements so we copy the values to the object
	elements.forEach( function ( element ) {
		if ( isAValidInputElement( element ) ) {
			element.addEventListener( "input", function () {
				var property = element.dataset.bindProperty;
				source[property] = element.value;
			} )
		}
	} );

	// Add a setter to properties to change the associated elements if it is not already done
	elements.forEach( function ( element ) {
		var property = element.dataset.bindProperty;
		if ( propertiesWithSetter.indexOf( property ) === -1 )
			addSetter( property )
	} );

	/**
	 * Change the values of the elements whose dataset.bindProperty is equal to the changed property.
	 * @param property {String} Property name to add a setter to.
	 */
	function addSetter( property ) {
		var value = source[property];
		propertiesWithSetter.push( property );
		Object.defineProperty( source, property, {
			set: function ( newValue ) {
				value = newValue;
				elements.forEach( function ( element ) {
					if ( element.dataset.bindProperty === property ) {
						setValue( element, newValue );
					}
				} )
			},
			get: function () {
				return value;
			}
		} )
	}

	/**
	 * Change the value of an element.
	 * @param element {Object} Element to set the value of.
	 * @param value {String} Value to set the element value to.
	 */
	function setValue( element, value ) {
		if ( isAValidInputElement( element ) ) {
			element.value = value;
		} else {
			element.innerText = value;
		}
	}

	/**
	 * Check if the element is an text input element.
	 * @param element {Object} Element to be checked.
	 * @returns {boolean}
	 */
	function isAValidInputElement( element ) {
		return element.type && element.type === "text";
	}
}