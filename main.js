"use strict"

function renderCoffee(coffee) {
    let html = '<div class="coffee col-6">';
    html += '<h1 class="d-inline-block mx-2">' + coffee.name.toUpperCase() + '</h1>';
    html += '<p id="roast-selection" class="d-inline-block">' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for (let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}


function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    if (selectedRoast === "all") {
        coffeeOutput.innerHTML = renderCoffees(coffees);
        return;
    }
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    coffeeOutput.innerHTML = renderCoffees(filteredCoffees);
}

function filterByNameAndRoast(value) {
    let filterCoffees = [];
    let selectedRoast = roastSelection.value;
    for (let i = 0; i < coffees.length; i++) {
        let coffee = coffees[i];
        let hasMatchingLetters = coffee.name.toLowerCase().search(value.toLowerCase()); //new code to lowercase
        if (hasMatchingLetters > -1 && coffee.roast === selectedRoast) {
            filterCoffees.push(coffee);
        } else if (hasMatchingLetters > -1 && selectedRoast === 'all') {
            filterCoffees.push(coffee); //new code for selectedRoast = all
        }
    }
    return filterCoffees
}

function searchBlendsByName(e) {
    let searchString = e.target.value;
    coffeeOutput.innerHTML = renderCoffees(filterByNameAndRoast(searchString));
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

coffees = coffees.reverse();

function storeCoffees(coffees) {
    coffees.forEach((coffee) => {
        storeCoffee(coffee);
    })
}

function storeCoffee(coffee) {
    const storedCoffee = localStorage.getItem(coffee.id);
    if (storedCoffee === null) {
        let newCoffee = {name: coffee.name, roast: coffee.roast};
        localStorage.setItem(coffee.id, JSON.stringify(newCoffee));
    } else {
        console.log(coffee.id + " Already exist")
    }
}

storeCoffees(coffees);

var coffeeOutput = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeName = document.querySelector("#coffee-name");
var coffeeSubmitButton = document.querySelector('#submit-new-coffee');


coffeeOutput.innerHTML = renderCoffees(coffees);


submitButton.addEventListener('click', searchBlendsByName);
roastSelection.addEventListener('input', updateCoffees);
coffeeName.addEventListener("keyup", searchBlendsByName);
coffeeSubmitButton.addEventListener("click", addNewCoffee);

// localStorage.coffees = coffees;
// localStorage.coffees += 'new coffee'
document.getElementById('coffees').innerHTML = renderCoffees(coffees);


console.log(localStorage);

function addNewCoffee() {
    let newCoffeeForm = document.forms["new-coffee-form"];
    let newCoffeeInput = newCoffeeForm.newCoffee;
    let newRoastInput = newCoffeeForm.newRoast;
    console.log(newCoffeeInput);
    console.log(newRoastInput);
    let id = localStorage.length + 1;
    // location.reload();
    storeCoffee({id: id, name: newCoffeeInput.value, roast: newRoastInput.value})

    // coffeeOutput.innerHTML += `${newCoffeeInput}: ${newRoastInput}`;
}

