const showAllData = (search_input = "") => {
    const card_container = document.getElementById("menu-container");
    if (search_input.length > 1) {
        document.getElementById("menu-container").innerHTML = "";
        const card = document.createElement("div");
        card.innerHTML = `<h2>No item found</h2>`
        card_container.appendChild(card)
    }
    else {
        const alpha = "abcdefghijklmnopqrstuvwxyz"
        document.getElementById("menu-container").innerHTML = "";
        alpha.split("").forEach(letter => {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
                .then(response => response.json())
                .then(data => {
                    display(data, search_input);
                });
        })
    }
}

const display = (all_data, target_menu) => {
    const card_container = document.getElementById("menu-container");
    all_data.meals.forEach(element => {
        if (element.strMeal.toLowerCase().includes(target_menu.toLowerCase())) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                    <div class="items" onclick="handleDetails('${element.idMeal}')">
                        <img class="item-img" src="${element.strMealThumb}" alt="">
                        <h3>${element.strMeal}</h3>
                        <h5>Category: ${element.strCategory}</h5>
                    </div>
                `
            card_container.appendChild(card);
        }
    });
}

const handleSearch = () => {
    document.getElementById("search-button").addEventListener("click", (event) => {
        event.preventDefault();
        const inputValue = document.getElementById("search-input").value.trim();
        showAllData(inputValue);
    })
}

const handleDetails = async (id) => {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let data = await response.json();
    const meal = data.meals[0];
    let ing_list = "<ul>";
    for(let i = 1;i <= 20;i++){
        let ingredient = meal[`strIngredient${i}`];
        if(!ingredient){
            break;
        }
        else{
            ing_list += `<li>${ingredient}</li>`;
        }
    }
    const dataDetails = document.getElementById("details");
    dataDetails.innerHTML = `
        <div class="detail-container">
            <img class="detail-img" src="${meal.strMealThumb}" class="detail-img" alt="...">
            <h4>${meal.strMeal}</h4>
            <strong>Ingredients:</strong>
            ${ing_list}
        </div>
        `
        dataDetails.scrollIntoView();
}

handleSearch();
