// Bond Profitability Calculator

function calculateProfitability() {
  const resultsDiv = document.getElementById('results');
  const errorMessage = document.getElementById('error-message');

  // Hide previous results and errors
  resultsDiv.style.display = 'none';
  errorMessage.style.display = 'none';

  // Get input values
  const faceValue = parseFloat(document.getElementById('face-value').value);
  const purchasePrice = parseFloat(document.getElementById('purchase-price').value);
  const annualCouponRate = parseFloat(document.getElementById('annual-coupon-rate').value);
  const frequency = parseInt(document.getElementById('frequency').value);
  const yearsHeld = parseFloat(document.getElementById('years-held').value);
  const salePrice = parseFloat(document.getElementById('sale-price').value);

  // Validate inputs
  if (isNaN(faceValue) || isNaN(purchasePrice) || isNaN(annualCouponRate) ||
      isNaN(frequency) || isNaN(yearsHeld) || isNaN(salePrice)) {
    errorMessage.textContent = 'Please fill in all fields with valid numbers.';
    errorMessage.style.display = 'block';
    return;
  }

  if (faceValue <= 0 || purchasePrice <= 0 || annualCouponRate < 0 ||
      yearsHeld <= 0 || salePrice < 0) {
    errorMessage.textContent = 'All values must be positive (coupon rate can be 0).';
    errorMessage.style.display = 'block';
    return;
  }

  // Calculations
  const totalCouponIncome = faceValue * annualCouponRate / 100 * yearsHeld;
  const capitalGain = salePrice - purchasePrice;
  const totalProfit = totalCouponIncome + capitalGain;
  const roi = (totalProfit / purchasePrice) * 100;

  // Payment check: individual coupon payment per period
  const paymentCheck = faceValue * annualCouponRate / 100 / frequency;

  // Current coupon yield: annual coupon payment / purchase price
  const annualCouponPayment = faceValue * annualCouponRate / 100;
  const currentYield = (annualCouponPayment / purchasePrice) * 100;

  // Format number as currency-like string
  const fmt = (num) => num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const sign = (num) => num >= 0 ? '+ ' : '- ';

  // Build formula strings
  const f = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Build results HTML
  resultsDiv.innerHTML = `
    <h2>Results</h2>
    <div class="result-item">
      <span class="result-label">Annual Coupon Income</span>
      <span class="result-values">
        <span class="result-value ${annualCouponPayment >= 0 ? 'positive' : 'negative'}">${sign(annualCouponPayment)}${fmt(Math.abs(annualCouponPayment))}</span>
        <span class="result-formula">${f(faceValue)} × ${annualCouponRate}%</span>
      </span>
    </div>
    <div class="result-item">
      <span class="result-label">Payment Check</span>
      <span class="result-values">
        <span class="result-value ${paymentCheck >= 0 ? 'positive' : 'negative'}">${sign(paymentCheck)}${fmt(Math.abs(paymentCheck))}</span>
        <span class="result-formula">${f(faceValue)} × ${annualCouponRate}% ÷ ${frequency}</span>
      </span>
    </div>
    <div class="result-item">
      <span class="result-label">Total Coupon Income</span>
      <span class="result-values">
        <span class="result-value ${totalCouponIncome >= 0 ? 'positive' : 'negative'}">${sign(totalCouponIncome)}${fmt(Math.abs(totalCouponIncome))}</span>
        <span class="result-formula">${f(faceValue)} × ${annualCouponRate}% × ${yearsHeld}</span>
      </span>
    </div>
    <div class="result-item">
      <span class="result-label">Capital Gain / Loss</span>
      <span class="result-values">
        <span class="result-value ${capitalGain >= 0 ? 'positive' : 'negative'}">${sign(capitalGain)}${fmt(Math.abs(capitalGain))}</span>
        <span class="result-formula">${f(salePrice)} − ${f(purchasePrice)}</span>
      </span>
    </div>
    <div class="result-item">
      <span class="result-label">Total Profit</span>
      <span class="result-values">
        <span class="result-value ${totalProfit >= 0 ? 'positive' : 'negative'}">${sign(totalProfit)}${fmt(Math.abs(totalProfit))}</span>
        <span class="result-formula">${f(totalCouponIncome)} + (${sign(capitalGain).trim()}${f(Math.abs(capitalGain))})</span>
      </span>
    </div>
    <div class="result-item">
      <span class="result-label">ROI</span>
      <span class="result-values">
        <span class="result-value ${roi >= 0 ? 'positive' : 'negative'}">${sign(roi)}${fmt(Math.abs(roi))}%</span>
        <span class="result-formula">(${f(totalProfit)} ÷ ${f(purchasePrice)}) × 100</span>
      </span>
    </div>
    <div class="result-item">
      <span class="result-label">Current Coupon Yield</span>
      <span class="result-values">
        <span class="result-value ${currentYield >= 0 ? 'positive' : 'negative'}">${sign(currentYield)}${fmt(Math.abs(currentYield))}%</span>
        <span class="result-formula">(${f(annualCouponPayment)} ÷ ${f(purchasePrice)}) × 100</span>
      </span>
    </div>
  `;

  resultsDiv.style.display = 'block';
}

// Attach event listener to the calculate button
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('calculate-btn').addEventListener('click', calculateProfitability);

  // Also allow pressing Enter in any input field
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach((input) => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        calculateProfitability();
      }
    });
  });
});