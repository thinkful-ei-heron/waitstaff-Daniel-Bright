//left panel should have Meal Details
//Inputs
//  base meal price
//  tax rate
//  tip percent
//
//Submit or Cancel
//
//Top Right - Customer Charges
//Displays Subtotal and Tip with Total of last equation
//
//Bottom Right - My Earning Info
//displays a running total of 
//  meals made(STORE) 
//  Tip total(STORE) 
//  avg tip perMeal (total tip / # of meals)
// 
// render right panels in js
// render left panel in html
//
// right-top panel takes newest item in DB
//p
//      basePrice,
//            taxRate,
//                  tipPercent,
//

function earningCalc(){
  let totalTip = 0
  STORE.meals.forEach(e => {
    totalTip += e.basePrice * (e.tipPercent/100)
  })
  return totalTip
}
function earningsSnip(){
  let tipTotal = earningCalc()
  let ammountOfMeals = STORE.numMeal
  let avgTip = tipTotal / ammountOfMeals
  return `
    <ul>
      <li>Tip Total: ${tipTotal}</li>
      <li>Number of Meals: ${ammountOfMeals}</li>
      <li>Avg Tip Per Meal: ${avgTip}</li>
    </ul>
  `
}

function increaseMealsNum(){
  STORE.numMeal += 1;
}

function renderEarningsInfo(){
  $('.js-earn-info').html(earningsSnip());
}

function customerChangesSnip(basePrice, taxRate, tipPercent){
  let subtotal = basePrice * (1 + (taxRate/100))
  let tip = subtotal * (tipPercent/100)
  let total = subtotal + tip
  return `
  <ul>
    <li>Sub-total: ${subtotal.toFixed(2)}</li>
    <li>Tip: ${tip.toFixed(2)}</li>
    <li>Total: ${total.toFixed(2)}</li>
  </ul>
  `
}

function renderCustomerChanges(basePrice, taxRate, tipPercent){
  $('.js-cus-changes').html(customerChangesSnip(basePrice, taxRate, tipPercent))
}

function createObj(basePrice, taxRate, tipPercent){
  return {'basePrice': basePrice, 'taxRate': taxRate, 'tipPercent': tipPercent}
}

function mealDetailsToStore(){
  let basePrice = $('#base-meal-price').val()
  let taxRate = $('#tax-rate').val()
  let tipPercent = $('#tip-percent').val()
  STORE.meals.unshift(createObj(basePrice, taxRate, tipPercent))
  increaseMealsNum()
  renderCustomerChanges(basePrice, taxRate, tipPercent)
}

//function checkInput(){
//  $('input').each(function() {
//    if(typeof this.value !== /[0-9]/gm) {
//      return false
//    }else{
//      return true
//    }
//  })
//}

function buttonSubmitWatch(){
  $('.js-data-field').on('click', 'button', event => {
    event.preventDefault()
      mealDetailsToStore()
      renderEarningsInfo()
  })
}

function start(){
  buttonSubmitWatch()
  earningCalc()
}

$(start)
