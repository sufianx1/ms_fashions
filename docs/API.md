# API Overview

Base URL: `/api`

## Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/profile`
- `PUT /auth/profile`

## Products
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

## Appointments
- `POST /appointments`
- `GET /appointments`
- `PATCH /appointments/:id/status`

## Orders
- `POST /orders`
- `GET /orders`
- `PATCH /orders/:id/status`
- `POST /orders/:id/refund`
- `POST /orders/payments/stripe/create-intent`
- `POST /orders/payments/jazzcash/initiate`

## Testimonials
- `GET /testimonials`
- `POST /testimonials`
