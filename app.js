'use strict'
function earningCalc(){
  let totalTip = 0;
  STORE.meals.forEach(e => {
    totalTip += e.basePrice * (e.tipPercent/100);
  });
  return totalTip.toFixed(2);
}

function earningsSnip(){
  let tipTotal = earningCalc();
  let ammountOfMeals = STORE.numMeal;
  let avgTip = tipTotal / ammountOfMeals;
  return `
    <ul>
      <li>Tip Total: ${tipTotal}</li>
      <li>Number of Meals: ${ammountOfMeals}</li>
      <li>Avg Tip Per Meal: ${avgTip.toFixed(2)}</li>
    </ul>
  `;
}

function renderEarningsInfo(){
  $('.js-earn-info').html(earningsSnip());
}

function increaseMealsNum(){
  STORE.numMeal += 1;
}

function customerChangesSnip(basePrice, taxRate, tipPercent){
  let subtotal = basePrice * (1 + (taxRate/100));
  let tip = subtotal * (tipPercent/100);
  let total = subtotal + tip;
  return `
  <ul>
    <li>Sub-total: ${subtotal.toFixed(2)}</li>
    <li>Tip: ${tip.toFixed(2)}</li>
    <li>Total: ${total.toFixed(2)}</li>
  </ul>
  `;
}

function renderCustomerChanges(basePrice, taxRate, tipPercent){
  $('.js-cus-changes').html(customerChangesSnip(basePrice, taxRate, tipPercent));
}

function createObj(basePrice, taxRate, tipPercent){
  return {'basePrice': basePrice, 'taxRate': taxRate, 'tipPercent': tipPercent};
}

function checkValid(){
  let basePrice = parseFloat($('#base-meal-price').val());
  let tax = parseFloat($('#tax-rate').val());
  let tip = parseFloat($('#tip-percent').val());
  return !(isNaN(basePrice) && isNaN(tax) && isNaN(tip))
}

function resetForm(){
  $('#base-meal-price').val(null);
  $('#tax-rate').val(null);
  $('#tip-percent').val(null);
}

function mealDetailsToStore(){
  let basePrice = parseFloat($('#base-meal-price').val());
  let taxRate = parseFloat($('#tax-rate').val());
  let tipPercent = parseFloat($('#tip-percent').val());
  STORE.meals.unshift(createObj(basePrice, taxRate, tipPercent));
  increaseMealsNum();
  renderCustomerChanges(basePrice, taxRate, tipPercent);
}

function buttonSubmitListener(){
  $('.js-data-field').on('click', '#submit', event => {
    event.preventDefault();
    console.log(checkValid())
    if (checkValid()){
      mealDetailsToStore();
      renderEarningsInfo();
      resetForm();
    }
    else {
      resetForm();
      alert('must use numbers')
    }
    
  });
}

function resetButton(){
  $('.js-reset').on('click', function(){
    STORE.meals.length = 0;
    STORE.numMeal = 0;
    renderEarningsInfo();
    resetForm();
    $('.js-cus-changes').html(customerChangesSnip(0, 0, 0));
  });
}

function cancelButtonListener(){
  $('#js-cancel').on('click', event => {
    event.preventDefault();
    resetForm();
  });
}

function start(){
  buttonSubmitListener();
  cancelButtonListener();
  earningCalc();
  resetButton();
}

$(start);
