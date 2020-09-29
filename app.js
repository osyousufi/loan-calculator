//get submit event
document.getElementById('loan-form').addEventListener('submit', function(e){
  //hide results
  document.getElementById('results').style.display = 'none';

  //show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});


function calculateResults(e) {

  //UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  //check if value of calcuation is valid value
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';

    amount.value = '';
    interest.value = '';
    years.value = '';

    
  } else {
    showError('Please check your inputted numbers');
  }


}

function showError(error) {

  if (document.querySelectorAll('.alert').length == 0) {
    //create error div
    const errorDiv = document.createElement('div');

    //get background elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger';

    errorDiv.append(document.createTextNode(error));

    //insert error message above button element
    card.insertBefore(errorDiv, heading);
    document.getElementById('loading').style.display = 'none';
    setTimeout(clearError, 2000);

  } else {
    return null
  }

}

function clearError() {
  document.querySelector('.alert').remove();
}
