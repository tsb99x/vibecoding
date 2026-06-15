# Agent Guidelines — Bond Profitability Calculator

## Project Overview
A simple single-page web application that calculates bond profitability. It takes bond parameters as input and computes Annual Coupon Income, Payment Check, Total Coupon Income, Capital Gain/Loss, Total Profit, ROI, and Current Coupon Yield. Each result displays its calculation formula beneath the value using actual input numbers.

## File Structure
```
bonds-profitability/
├── index.html   — HTML structure with form inputs and results container
├── style.css    — All styling (Catppuccin Mocha theme)
└── script.js    — All calculation logic
```

## Constraints

### Styling
- **Use Catppuccin Mocha palette** exclusively.
- **No light mode** — dark theme only, always.

### Code Organization
- **Separate CSS and JavaScript from HTML.** Keep styles in `style.css` and logic in `script.js`; never inline them in `index.html`.
- Each file has a single responsibility.

### Results Display
- Every numeric result must show a `+` prefix with green color (`--green`) for positive values, or `-` prefix with red color (`--red`) for negative values.

## Catppuccin Mocha Colors (Reference)
| Token      | Hex      | Usage                     |
|------------|----------|---------------------------|
| Base       | `#1e1e2e`| Main background           |
| Mantle     | `#181825`| Container/surface bg      |
| Crust      | `#11111b`| Darkest elements          |
| Surface 0  | `#313244`| Inputs, cards             |
| Surface 1  | `#45475a`| Borders, dividers         |
| Subtext 0  | `#a6adc8`| Labels, secondary text    |
| Text       | `#cdd6f4`| Primary text              |
| Lavender   | `#b4befe`| Headings                  |
| Blue       | `#89b4fa`| Buttons, focus borders    |
| Mauve      | `#cba6f7`| Section titles            |
| Green      | `#a6e3a1`| Positive values           |
| Red        | `#f38ba8`| Negative values, errors   |

## Calculator Inputs
- **Face Value** — nominal bond value
- **Purchase Price** — price paid for the bond
- **Annual Coupon Rate (%)** — annual interest rate
- **Coupon Frequency** — payments per year (1 / 2 / 4 / 12)
- **Years Held** — duration of investment
- **Sale / Redemption Price** — expected exit price

## Calculator Outputs
- **Annual Coupon Income** — annual coupon payment (Face Value × Annual Coupon Rate)
- **Payment Check** — individual coupon payment per period (Face Value × Annual Coupon Rate ÷ Coupon Frequency)
- **Total Coupon Income** — sum of all coupon payments
- **Capital Gain / Loss** — sale price minus purchase price
- **Total Profit** — coupon income + capital gain
- **ROI (%)** — return on investment percentage
- **Current Coupon Yield (%)** — annual coupon payment divided by purchase price

## Formula Reference
| Metric | Formula |
|---|---|
| Annual Coupon Income | `FaceValue × AnnualCouponRate%` |
| Payment Check | `FaceValue × AnnualCouponRate% ÷ Frequency` |
| Total Coupon Income | `FaceValue × AnnualCouponRate% × YearsHeld` |
| Capital Gain / Loss | `SalePrice − PurchasePrice` |
| Total Profit | `TotalCouponIncome + CapitalGain` |
| ROI | `(TotalProfit ÷ PurchasePrice) × 100` |
| Current Coupon Yield | `(AnnualCouponPayment ÷ PurchasePrice) × 100` |
