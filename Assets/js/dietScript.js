let apikey = '7d3bff7bd1mshf07209b4c87620fp1a8bf8jsne5b3b63b54ea';
let apikey2 = "e561b50d73msh4314686b2659048p15c1b7jsn62d6f7f29522";
const loseBFUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients?limitLicense=false&minProtein=30&maxFat=10';
const loseWtUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients?limitLicense=false&minProtein=30&maxFat=10';
const gainMusUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients?limitLicense=false&minProtein=30&maxFat=10';
const mainMusUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients?limitLicense=false&minProtein=30&maxFat=10';

// Creates the options for the diet dropdown list -N
function makeDDL () {
    const options = ["Lose Body Fat", "Lose Weight", "Gain Muscle", "Maintain Muscle"];
    for (const option of options) {
        let foodList = document.querySelector('#dropdown2')
        let foodOption = document.createElement("li");
        let aEl2 = document.createElement("a");
        aEl2.setAttribute("href",'#!');
        aEl2.textContent = option;
        foodOption.appendChild(aEl2);
        foodList.appendChild(foodOption)
    }
}

// Causes the dropdown list to display when diet button is hovered over -N
document.addEventListener('DOMContentLoaded', function() {
    var elems2 = document.querySelectorAll('.dropdown-trigger2');
    M.Dropdown.init(elems2, {
        hover: true,
        coverTrigger: false,        
    });
    makeDDL();
  }); 

// Adds event listener to the dropdown, calls for fetch request -N
document.addEventListener('DOMContentLoaded', () => {
    const dd2 = document.querySelector("#dropdown2");
    dd2.addEventListener('click', (event) => {
     let selectedDiet = event.target.textContent;
        fetchFoods(selectedDiet);
    });
});

//Calls for individual fetch request based on selection -N
function fetchFoods(selectedDiet) {
    if (selectedDiet === "Lose Body Fat") {
        loseBF(selectedDiet);
    } else if (selectedDiet === "Lose Weight") {
        loseWt(selectedDiet);
    } else if (selectedDiet === "Gain Muscle") {
        gainMus(selectedDiet);
    } else {
        mainMus(selectedDiet);
    }
}

// Makes fetch request for option "Lose Body Fat" -N
function loseBF(selectedDiet) {
    fetch(loseBFUrl, {
        method: 'GET',
        headers: {
        "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": apikey2,
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        getRecipe(data);        
    }) 
}

// Makes fetch request for option "Lose Weight" -N
function loseWt(selectedDiet) {
    console.log(selectedDiet);
    fetch(loseWtUrl, {
        method: 'GET',
        headers: {
        "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": apikey2,
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        getRecipe(data);        
    })
}

// Makes fetch request for option "Gain Muscle" -N
function gainMus(selectedDiet) {
    console.log(selectedDiet);
    fetch(gainMusUrl, {
        method: 'GET',
        headers: {
        "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": apikey2,
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        getRecipe(data);        
    })
}

// Makes fetch request for option "Maintain Muscle" -N
function mainMus(selectedDiet) {
    console.log(selectedDiet);
    fetch(mainMusUrl, {
        method: 'GET',
        headers: {
        "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": apikey2,
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        getRecipe(data);        
    })
}

// Takes name of recipe and makes new fetch for actual recipe
// Our original fetch returned the name, img, and nutrient values, but not the actual recipe -N
function getRecipe(data) {
    let foodRec = data[Math.floor(Math.random()*data.length)];
    let recipeID = foodRec.id;
    const getRecipeUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeID}/information`;

    fetch(getRecipeUrl, {
        method: 'GET',
        headers: {
        "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": apikey2,
        }        
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let instructions = data.instructions; 
        foodCard(foodRec, instructions)     
    })
}

//Fills the card with info from the API fetch and appends to the page -M
function foodCard(foodRec, instructions) {
    let dietCard = document.querySelector(".foodCard");
    let foodName = document.createElement("p");
    let foodCal = document.createElement("p");
    let foodFat = document.createElement("p");
    let foodProt = document.createElement("p");
    let foodInst = document.createElement("p")
    let foodPhoto = document.createElement("img");

    foodName.textContent = foodRec.title;
    foodCal.textContent = `Calories: ${foodRec.calories}`; 
    foodFat.textContent = `Fat: ${foodRec.fat}`; 
    foodProt.textContent = `Protein: ${foodRec.protein}`;
    foodInst.textContent = instructions;
    foodPhoto.src = foodRec.image;

    dietCard.appendChild(foodName);
    dietCard.appendChild(foodCal);
    dietCard.appendChild(foodFat);
    dietCard.appendChild(foodProt);
    dietCard.appendChild(foodInst);
    dietCard.appendChild(foodPhoto);
}