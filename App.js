
let display = document.querySelector('#display1');
let API_KEY = '7d777b8582d949459baa52f870db9c3a';
let weight1 = document.querySelector('#weight')
let height1 = document.querySelector('#height')
let age1 = document.querySelector('#age')
let DATA = [];
let minCalories = 200;
let maxCalories = 1000;
console.log(display);


async function getData() {

    if (height1.value == '' || weight1.value == '' || age1.value == '') {
        alert("Height Weight and Age Can't be left Blank");

    }
    else {


        console.log('working');
        display1.innerHTML =`<button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>`
        if (height1.value > 175 && weight1.value > 75) {
            minCalories = 1000;
            maxCalories = 3000;
        }
        if (age < 10) {
            maxCalories = 200;
            minCalories = 10;
        }

        let apiData = await fetch(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&minCalories=${minCalories}&maxCalories=${maxCalories}&number=4&apiKey=${API_KEY}&includeNutrition=true`);
        let data = await apiData.json();
        
        data = data.results;
        console.log(data);
        let html = await data.map((ele) => {
            return (
                `
            <div class='displayCard'>
            <h3>${ele.title}</h3>
            <img src= ${ele.image} alt = "image"/>
          
          <br>
          <br>
            <p>
            ${ele.summary
                }
            </p>
            <a href=${ele.sourceUrl}>Full Recipie</a>
            <p>Source : ${ele.sourceName}</p>
            <span>
            <bold>Ready in ${ele.readyInMinutes} min</bold>
            </span>
            
            </div>
        `
            )
        })

        display1.innerHTML = html;

    }
}
 //getData();


