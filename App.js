
let display = document.querySelector('#display1');
let API_KEY = '7d777b8582d949459baa52f870db9c3a';
let weight = document.querySelector('#weight');
let height = document.querySelector('#height');
let age1 = document.querySelector('#age');
let DATA = [];
let minCalories = 200;
let maxCalories = 0;
let btn = document.querySelector('#submit-btn');
let gender = document.querySelector('#gender');
let activity = document.querySelector('#activity');
btn.addEventListener('click', btnClick);

function btnClick() {
  if (height.value == '' || weight.value == '' || age.value == '' || gender.value == "" || activity.value == "null") {
    alert('All the fields are Mandatory');
    
  }
  else {
    getData();
  }
}
async function getData() {




  display1.innerHTML = `<button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>`;

  if (gender.value === "male" && activity.value === "light") {
    var BMR = 66.47 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
    maxCalories = BMR * 1.375;
    console.log('male light')
  }

  else if (gender.value === "male" && activity.value === "moderate") {
    var BMR = 66.47 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
    maxCalories = BMR * 1.55;
  }

  else if (gender.value === "male" && activity.value === "active") {
    var BMR = 66.47 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
    maxCalories = BMR * 1.725;
  }

  else if (gender.value === "female" && activity.value === "light") {
    var BMR = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
    maxCalories = BMR * 1.375;
  }

  else if (gender.value === "female" && activity.value === "moderate") {
    var BMR = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
    maxCalories = BMR * 1.55;
  }

  else if (gender.value === "female" && activity.value === "active") {
    var BMR = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
    maxCalories = BMR * 1.725;
  }

  
 
  
  
  console.log("max calories" + maxCalories);

  let apiData = await fetch(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&maxCalories=${maxCalories}&number=4&apiKey=${API_KEY}&includeNutrition=true`);
  let data = await apiData.json();

  code = data.code;

  data = data.results;
  console.log(data);
  let html = '';
  data == undefined ? html = `<h1>API limit reached please try again after 24Hrs</h1>` :

    html = await data.map((ele) => {
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
 //getData();


