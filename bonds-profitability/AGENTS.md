# Agent Guidelines — Bond Profitability Calculator

## Project Overview
A single-page app that calculates bond profitability. Each result displays its calculation formula beneath the value using actual input numbers.

## Calculator Inputs
- **Face Value** — nominal bond value
- **Purchase Price** — price paid for the bond
- **Annual Coupon Rate (%)** — annual interest rate
- **Coupon Frequency** — payments per year (1 / 2 / 4 / 12)
- **Years Held** — duration of investment
- **Sale / Redemption Price** — expected exit price

## Calculator Outputs & Formulas
| Metric | Formula |
|---|---|
| Annual Coupon Income | `FaceValue × AnnualCouponRate%` |
| Payment Check | `FaceValue × AnnualCouponRate% ÷ Frequency` |
| Total Coupon Income | `FaceValue × AnnualCouponRate% × YearsHeld` |
| Capital Gain / Loss | `SalePrice − PurchasePrice` |
| Total Profit | `TotalCouponIncome + CapitalGain` |
| ROI | `(TotalProfit ÷ PurchasePrice) × 100` |
| Current Coupon Yield | `(AnnualCouponPayment ÷ PurchasePrice) × 100` |

## Results Display
Every numeric result shows `+` prefix with green (`--ctp-green`) for positive values, or `-` prefix with red (`--ctp-red`) for negative values.
