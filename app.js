function earningCalc(){
  let totalTip = 0
  STORE.meals.forEach(e => {
    totalTip += e.basePrice * (e.tipPercent/100)
  })
  return totalTip.toFixed(2)
}
function earningsSnip(){
  let tipTotal = earningCalc()
  let ammountOfMeals = STORE.numMeal
  let avgTip = tipTotal / ammountOfMeals
  return `
    <ul>
      <li>Tip Total: ${tipTotal}</li>
      <li>Number of Meals: ${ammountOfMeals}</li>
      <li>Avg Tip Per Meal: ${avgTip.toFixed(2)}</li>
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

function resetForm(){
  $('#base-meal-price').val('')
  $('#tax-rate').val('')
  $('#tip-percent').val('')
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
  $('.js-data-field').on('click', '#submit', event => {
    event.preventDefault()
      mealDetailsToStore()
      renderEarningsInfo()
      resetForm()
  })
}

function resetButton(){
  $('.js-reset').on('click', function(){
    STORE.meals.length = 0
    STORE.numMeal = 0
    renderEarningsInfo()
    resetForm()
    $('.js-cus-changes').html(customerChangesSnip(0, 0, 0))
  })
}

function cancelButton(){
  $('#js-cancel').on('click', event => {
    event.preventDefault()
    resetForm()
  })
}

function start(){
  buttonSubmitWatch()
  earningCalc()
  resetButton()
  cancelButton()
}

$(start)
