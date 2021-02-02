"use strict"

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];


function renderCoffee(coffee) {
    let html = '<div class="coffee col-6">';
    html += '<h1 class="d-inline-block mx-2">' + coffee.name.toUpperCase() + '</h1>'; // This function display the coffee on the html, and changed everything to uppercase
    html += '<p id="roast-selection" class="d-inline-block">' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) { // This function loops through the coffees and display all of them in the html.
    let html = '';
    for (let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) { // This function u
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let coffees = pullCoffeeFromStorage();
    let filteredCoffees = [];
    if (selectedRoast === "all") { // return all the coffees and return breaks out of the function.
        coffeeOutput.innerHTML = renderCoffees(sortCoffee(coffees));
        return;
    }
    coffees.forEach(function (coffee) { // changes the displayed list when you make changes to the selection
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    coffeeOutput.innerHTML = renderCoffees(sortCoffee(filteredCoffees));
}

function filterByNameAndRoast(value) { // This function returns combines the roast searching, and filter by name.
    let filterCoffees = [];
    let selectedRoast = roastSelection.value;
    let coffees = pullCoffeeFromStorage();
    for (let i = 0; i < coffees.length; i++) {
        let coffee = coffees[i];
        let hasMatchingLetters = coffee.name.toLowerCase().search(value.toLowerCase());
        if (hasMatchingLetters > -1 && coffee.roast === selectedRoast) {
            filterCoffees.push(coffee);
        } else if (hasMatchingLetters > -1 && selectedRoast === 'all') {
            filterCoffees.push(coffee);
        }
    }
    return filterCoffees
}

function searchBlendsByName(e) { // This function changes the list when typed correct input.
    let searchString = e.target.value;
    coffeeOutput.innerHTML = renderCoffees(
        sortCoffee(
            filterByNameAndRoast(searchString)));
}

function sortCoffee(coffees) { // This function sorts coffees by id.
    return coffees.sort((a, b) => {
        return b.id - a.id;
    });
}

function pullCoffeeFromStorage() { // This function returns values from the local storage, and turn it in to an array of objects and store it in the function.
    let keys = Object.keys(localStorage);
    let coffees = [];
    keys.forEach((key) => {
        let value = JSON.parse(localStorage.getItem(key));
        coffees.push({id: key, name: value.name, roast: value.roast});
    });
    return coffees;
}

function addNewCoffee() { // This function pushes a new object array to the list using the check function storeCoffee.
    let newCoffeeForm = document.forms["new-coffee-form"];
    let newCoffeeInput = newCoffeeForm.newCoffee;
    let newRoastInput = newCoffeeForm.newRoast;
    let id = localStorage.length + 1;
    storeCoffee({id: id, name: newCoffeeInput.value, roast: newRoastInput.value})
}

function storeCoffee(coffee) { // This function checks if the id, name, and roast is null or undefined, if the variable doesn't match the output it
    // will breakout of the function. Else add a new value that have been converted to a string to the local storage, because setItem have to be a string to set item.
    if (coffee === null || coffee === undefined) {
        console.log("didn't get coffee");
        return;
    }
    if (coffee.id === null || coffee.id === undefined) {
        console.log("you don't get id of the coffees");
        return;
    }
    if (coffee.name === null || coffee.name === undefined || coffee.name === '') {
        console.log("You don't get the name");
        return;
    }
    if (coffee.roast === null || coffee.roast === undefined || coffee.roast === '') {
        console.log("You don't get the roast");
        return;
    }

    const storedCoffee = localStorage.getItem(coffee.id);
    if (storedCoffee === null) {
        let newCoffee = {name: coffee.name, roast: coffee.roast};
        localStorage.setItem(coffee.id, JSON.stringify(newCoffee));
    }
}

function storeCoffees(coffees) { // This function loops through the js coffees array and store it to the local storage, and it's invoked by line 134
    coffees.forEach((coffee) => {
        storeCoffee(coffee);
    })
}
storeCoffees(coffees);



var coffeeOutput = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeName = document.querySelector("#coffee-name");
var coffeeSubmitButton = document.querySelector('#submit-new-coffee');
coffeeOutput.innerHTML = renderCoffees(sortCoffee(pullCoffeeFromStorage()));


submitButton.addEventListener('click', searchBlendsByName);
roastSelection.addEventListener('input', updateCoffees);
coffeeName.addEventListener("keyup", searchBlendsByName);
coffeeSubmitButton.addEventListener("click", addNewCoffee);
document.getElementById('coffees').innerHTML = renderCoffees(sortCoffee(pullCoffeeFromStorage()));

