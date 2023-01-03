
let display = document.querySelector('#display1');
let API_KEY = '34c8beae57704fdeada45bcc12d0b38c';
let weight = document.querySelector('#weight');
let height = document.querySelector('#height');
let age1 = document.querySelector('#age');
let minCalories = 200;
let maxCalories = 1000;
let btn = document.querySelector('#submit-btn');
let gender = document.querySelector('#gender');
let activity = document.querySelector('#activity');
btn.addEventListener('click', btnClick);

function btnClick() {
  if (height.value == '' || weight.value == '' || age.value == ''  || activity.value == "null") {
    alert('All the fields are Mandatory');


  }
  else {
    getData();
  }

}
async function getData() {

  console.log("started");
console.log(gender.value);
  display1.innerHTML = `<button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>`;

  if (gender.value == "male" && activity.value === "light") {
    var BMR = 66.47 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
    maxCalories = BMR * 1.375;
    console.log('male light');
  }

  else if (gender.value === "male" && activity.value === "moderate") {
    var BMR = 66.47 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
    maxCalories = BMR * 1.55;
    console.log('male moderate')
  }

  else if (gender.value === "male" && activity.value === "active") {
    var BMR = 66.47 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
    maxCalories = BMR * 1.725;
    console.log('male active')
  }

  else if (gender.value === "female" && activity.value === "light") {
    var BMR = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
    maxCalories = BMR * 1.375;
    console.log('female light')
  }

  else if (gender.value === "female" && activity.value === "moderate") {
    var BMR = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
    maxCalories = BMR * 1.55;
    console.log('female moderate')
  }

  else if (gender.value === "female" && activity.value === "active") {
    var BMR = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
    maxCalories = BMR * 1.725;
    console.log('female active')
  }

  maxCalories = Math.round(maxCalories);



  console.log("max calories => " + maxCalories);

  try {


    let apiData = await fetch(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&maxCalories=${maxCalories}&number=4&apiKey=${API_KEY}&includeNutrition=true`);
    var data = await apiData.json();
    console.log("api data sucessful");
  }

  catch (e) {
    console.log("entered catch block");
    display.innerHTML = `<h1>${e}</h1>`;
  }


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
            <a href=${ele.sourceUrl}>Full Recipe</a>
            <p>Source : ${ele.sourceName}</p>
            <span>
            <bold>Ready in ${ele.readyInMinutes} min</bold>
            </span>
            
            </div>
        `
      )
    })

  display1.innerHTML = html;
  console.log(' reached end');


}
 //getData();


