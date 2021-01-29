"use strict"

function renderCoffee(coffee) {
    let html = '<div class="coffee">';
    // html += '<td>' + coffee.id + '</td>';
    html += '<h1>' + coffee.name + '</h1>';
    html += '<p id="roast-selection">' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function coffeeSearch(e) {
    e.preventDefault();
    let selectedRoast = coffeeName.value;
    let filteredCoffees = [];
    coffees.forEach(function (coffee){
        if (coffee.name === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    div.innerHTML = renderCoffees(filteredCoffees);
}


function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    if(selectedRoast === "all") {
        div.innerHTML = renderCoffees(coffees);
        return;
    }
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });

    div.innerHTML = renderCoffees(filteredCoffees);
}

function filterByName(value) {
    let filterCoffees = [];
    for (let i = 0; i < coffees.length; i++) {
        let coffee = coffees[i];
        let hasMatchingLetters = coffee.name.toLowerCase().search(value)
        if (hasMatchingLetters > -1) {
            filterCoffees.push(coffee);
        }
    }
    return filterCoffees
}

function searchBlendsByName(e) {
    let searchString = e.target.value
    div.innerHTML = renderCoffees(filterByName(searchString));
}

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




var div = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeName = document.querySelector("#coffee-name");


div.innerHTML = renderCoffees(coffees);


// submitButton.addEventListener('click', coffeeSearch);
roastSelection.addEventListener('input', updateCoffees);
coffeeName.addEventListener("keyup", searchBlendsByName);
