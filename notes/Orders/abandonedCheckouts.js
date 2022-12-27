// Abandoned Checkouts

// Note that orders access scope is required.

// Abandoned checkouts is when a shopper goes through their journey by adding an item/items to their cart, entering personal and credit card information in the checkout step, And then deciding not to complete their purchase.

// The resource is helpful to complete the following action:
// 1. Gather marketing information on the customer who have abandoned their cart.
// 2. Use information to remarket to abandoned checkout customers.
// 3. Understanding customers' behaviors.
// 4. Tract abandoned checkouts overtime.
// 5. View abandoned checkout items.


// The Abandoned Checkout Resource
// 1. abandoned_checkout_url
// The recovery URL that is sent to customer so they can recover their checkout.

// 2. billing_address
// It is the mailing address which is associated with the payment method. It has the following properties:
// 1. address1: The street address of the billing address.
// 2. address2: An option address field for the street address of the billing address.
// 3. city: The city of the billing address.
// 4. country: The country of the person associated with the billing address.
// 5. country_code: It is the two-letter for the country of the billing address.
// 6. default: Whether this is default address for the customer.
// 7. first_name: The first name of the person associated with the payment method.
// 8. last_name: The last name of the person associated with the payment method.
// 9. latitude: The latitude of the billing address.
// 10. longitude: The longitude of the billing address.
// 11. name: The full name of the person associated with the payment method.
// 12. province: The name of the province of the payment method.
// 13. province_code: The two-letter abbreviation of the state or province of the billing address.
// 14. zip: The zip or postal code of the shipping address.

// 3. buyer_accepts_marketing
// When the customer would like to receive email updates from the shop. This is set by the I WANT TO RECEIVE OCCASIONAL EMAILS ABOUT NEW PRODUCTS, PROMOTIONS AND OTHER NEWS checkbox during checkout.

// 4. buyer_accepts_sms_marketing
// Whether the customer would like to receive SMS updates from the shop.This is set by the TEXT ME WITH NEWS AND OFFERS checkbox during checkout.

// 5. cart_token
// The id of the cart thats attached to the checkout.

// 6. closed_at
// The date and time when the checkout was closed. If the checkout was not closed, then this value is set to be null.

// 7. completed_at
// The date and time when the checkout was completed. If the checkout was abandoned, this value is set to null until the customer completed the checkout using the recovery URL.

// 8. created_at
// The date and time when the checkout was created.

// 9. currency
// The three letter code of the shop's currency at the time of checkout. For the currency that the customer used at checkout, see "presentment_currency".

// 10. customer
// The customer details associated with the abandoned checkout.

// 11. customer_locale
// The two or three letter language code, optionally followed by a region modifier. Example value: "en", "en-CA".

// 12. device_id
// The ID of the Shopify POS device that created the checkout.

// 13. discount_codes
// These are the array of discount codes applied at the time of checkout.Returns an empty array if there are no coupon applied. Each discount code has the following fields:
// 1. amount: The amount of the discount in the presentment currency.
// 2. code: The discount code.
// 3. type: The type of the discount. It's valid values are:
// a. percentage
// b. code
// c. fixed_amount (Default value).

// 14. email
// The customer's email address.

// 15. gateway
// The payment gateway used by the checkout. For abandoned checkout, this value is always none.

// 16. id
// The id for the checkout

// 17. landing_site
// The URL of the page where customer enter the shop.

// 18. line_items
// A list of line items, each containing information about an item in the checkout. Each object has the following properties:
// 1. fulfillment_service: The fulfillment service provider of the item.
// 2. fulfillment_status: The status of the items fulfillment. Valid values:
// a. fulfilled
// b. null
// c. partial
// 3. grams: The weight of the items in grams.
// 4. price: The price of the item in presentment services.
// 5. product_id: The product ID of the item.
// 6. quantity: The number of products that were purchased.
// 7. requires_shipping: Whether the item requires shipping or not.
// 8. sku: A unique identifier for the item in the shop.
// 9. title: The title of the product.
// 10. variant_id: The product variant ID of the item.
// 11. variant_title: The title of the variant product.
// 12. vendor: The name of the item supplier.

// 19. location_id
// The id of the physical location where the checkout is processed.

// 20. note
// The text of an optional note that a shop owner can attach to her.

// 21. phone
// The customer's phone number for receiving SMS notification's.

// 22. presentment_currency
// The three-letter code of the currency that the customer used at the checkout.

// 23. referring_site
// The website that referred the customer to the shop.

// 24. shipping_address
// The mailing address where the order will shipped to. It has the following properties"
// // 1. address1: The street address of the billing address.
// 2. address2: An option address field for the street address of the billing address.
// 3. city: The city of the billing address.
// 4. country: The country of the person associated with the billing address.
// 5. country_code: It is the two-letter for the country of the billing address.
// 6. default: Whether this is default address for the customer.
// 7. first_name: The first name of the person associated with the payment method.
// 8. last_name: The last name of the person associated with the payment method.
// 9. latitude: The latitude of the billing address.
// 10. longitude: The longitude of the billing address.
// 11. name: The full name of the person associated with the payment method.
// 12. province: The name of the province of the payment method.
// 13. province_code: The two-letter abbreviation of the state or province of the billing address.
// 14. zip: The zip or postal code of the shipping address.

// 25. sms_marketing_phone
// The phone number used to opt in to SMS marketing during checkout.

// 26. shipping_lines
// Information about the chosen shipping method. It has the following properties:
// 1. code: A reference to shipping method
// 2. price: The price of the shipping method in the presentment currency.
// 3. source: The channel where the checkout originated