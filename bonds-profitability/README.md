# Bond Profitability Calculator

A single-page web application that calculates bond profitability, computing 7 key financial metrics with formula transparency.

## Features

- **7 Financial Metrics** — Annual Coupon Income, Payment Check, Total Coupon Income, Capital Gain/Loss, Total Profit, ROI, and Current Coupon Yield
- **Formula Transparency** — Each result displays its calculation formula beneath the value using actual input numbers
- **Signed Results** — Positive values shown in green with `+` prefix, negative values in red with `-` prefix
- **Flexible Inputs** — Supports configurable coupon frequency (annual/semi-annual/quarterly/monthly)
- **Responsive Design** — Clean Catppuccin Mocha dark theme interface

## Usage

1. Enter bond parameters (Face Value, Purchase Price, Annual Coupon Rate, Frequency, Years Held, Sale Price)
2. Click "Calculate" or press Enter in any field
3. Review the 7 computed metrics with their formulas

## Inputs

| Parameter | Description |
|---|---|
| Face Value | Nominal bond value |
| Purchase Price | Price paid for the bond |
| Annual Coupon Rate (%) | Annual interest rate |
| Coupon Frequency | Payments per year (1 / 2 / 4 / 12) |
| Years Held | Duration of investment |
| Sale / Redemption Price | Expected exit price |

## Documentation

- [AGENTS.md](AGENTS.md) — Agent guide with project structure, constraints, and coding conventions.

## Technology

Built with vanilla HTML, CSS, and JavaScript. Styled with the Catppuccin Mocha color palette.