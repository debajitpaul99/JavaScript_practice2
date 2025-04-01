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
                    <img src="${element.strMealThumb}" alt="">
                    <h3>${element.strMeal}</h3>
                    <h5>Category: ${element.strCategory}</h5>
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

handleSearch();