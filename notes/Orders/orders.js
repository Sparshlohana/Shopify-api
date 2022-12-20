// Order
// An order is a customers request to purchase one or more products from the shop.

// The order resource
// 1. app_id
// The id of the app that created the order.

// 2. billing_address
// It us the mailing address associated with the payment method. This is an optional field for the orders that does not require a payment method. It's properties are:
// 1. address1: The street address of the billing address
// 2. address2: An optional additional field for the street address of the billing address.
// 3. city: The city, town, or village of the billing address.
// 4. company: The company of the person associated with the billing address.
// 5. country: The name of the country of the billing address.
// 6. country_code: The two-letter country code of the billing address.
// 7. first_name: The first name of the person associated with the payment method
// 8. last_name: The last name of the person associated with the payment method
// 9. latitude: The latitude of the billing address.
// 10. longitude: The longitude of the billing address.
// 11. name: The full name of the person associated with the payment method.
// 12. phone: The phone number at the billing address.
// 13. province: The name of region of the billing address.
// 14. province_code: The two-letter code of the region of the billing address.
// 15. zip: The postal code of the billing address.

// 3. browser_ip
// The IP address of the browser used by the customer when they place an order. Both IPv4 and IPv6 are supported.

// 4. buyer_accepts_marketing
// Weather the customer wants to receive email updates from the shop.

// 5. cancel_reason
// The reason why the ordered was cancel. Its properties are:
// 1. customer: The customer cancelled the order.
// 2. fraud: The order was fraudulent.
// 3. inventory: Items in the order were not in inventory.
// 4. declined: The payment was declined
// 5. other: A reason not in this list.

// 6. cancelled_at:
// The date and time where the order was cancelled.

// 7. cart_token:
// A unique value when referencing the cart that's associated with the order.

// 8. checkout_token:
// A unique value when referencing the checkout that's associated with the order.

// 9. client_details:
// Information about browser that customer uses while placing the order. It's properties are:
// 1. accept_language: The languages and locales that the browser understands.
// 2. browser_height: The browser screen height in pixels, if available.
// 3. browser_ip: The IP address of the browser.
// 4. browser_width: The browser screen width in pixels, if available.
// 5. session_hash: A hash of session.
// 6. user_agent: Details of the browsing client, including software and operating system.

// 10. closed_at
// The date and time when the order was closed. It returns null if the order is not closed

// 11. created_at
// It is an auto generated data and time when the order was created by shopify. The value of this property cannot be changed

// 12. currency
// The three letter code for the shop currency.

// 13. current_total_discounts
// The current total discounts on the order in the shop currency. The value of this field reflects order edits, returns and refunds.

// 14. current_total_discounts_set
// The current total discount on the order of the shop and presentment currency. The amount values associated with this field reflects order edits, returns and refunds.

// 15. current_total_duties_set
// The current total duties charged on the order in the shop and presentment currency. The amount values associated with this field reflects order edits, returns and refunds.

// 16. current_total_price
// The current total price of the order in the shop currency. The order of this field reflects order edits, returns and refunds.

// 17. current_total_price_set
// The current total price of the order in the shop and presentment currency. The amount of this field reflects order edits, returns and refunds.

// 18. current_subtotal_price
// The current subtotal price of the order in the shop currency. The value of this field reflects edits, returns and refund.

// 19. current_subtotal_price_set
// The current total price of the order in the shop and presentment currency. The amount of this field reflects order edits, returns and refunds.

// 20. current_total_tax
// The current total taxes charged on the order in the shop currency. The value of this field reflects edits, returns and refunds.

// 21. current_total_tax_set
// The current total taxes charged on the order in the shop and presentment currency. The amount values associated with this field reflects order edits, returns and refunds.

// 22. customer
// Information about the customer. The order might not have a customer and apps should not depend on the existence of a customer object. This order might be null if the customer is created with shopify POS (point of sale).

// 23. customer_locale
// The two or three-letter language code, optionally followed by a region modifier.

// 24. discount_applicable
// The discount applicable property includes 3 types: discount_code, manual, and script. All three have a common structure and have some common specific attributes. These properties are:
// 1. allocation_method: The method by which the discount applicable value has been allocated to entitled lines. Valid values are:
// a. across: The value is spread across all entitled lines.
// b. each: The value is applied onto every entitled line.
// c. one: The value is applied onto a single line.
// 2. code: The discount code that was used to apply the discount. Available only for discount codes applicable.
// 3. description: The description of the discount applicable, as defined by the merchant or the shopify script. It is only applicable for manual and script discount application.
// 4.target_selection: The lines of the order, of the typed defined by target_type, that the discount is allocated over. Its valid values are:
// a. all: The discount is allocated onto all lines.
// b. entitled: The discount is allocated only onto lines it is entitled for
// c. explicit: The discount is allocated only onto explicitly selected lines.
// 5. target_type: The type of line on the order that the discount is applicable on. Its valid values are:
// a. line_item: The discount applies to the line items.
// b. shipping_line: The discount applies to shipping lines.
// 6. title: The title of discount application, as defined by the merchant. Available only for manual discount applications.
// 7. type: The type of discount application. Its valid values are:
// a. automatic: The discount was applied automatically such as, Buy x and Get y free automatic discount.
// b. discount_code: The discount was applied by a discount code.
// c. manual: The discount was manually applied by the merchant (By using an app or by creating a draft order).
// d. script: The discount was applied by a shopify script.
// 8. value: The value of discount applicable in decimal format. This represents the intention of discount application. For example: if the intention was to apply a 20% discount, then the value will be 20.0. If the intention was to apply a $15 discount then the value will be 15.0
// 9. value_type: The type of the value. Its valid values are:
// a. fixed_amount: A fixed amount discount value in the currency of the order.
// b. percentage: A percentage discount value.

// 25. discount_codes
// It is a list of discount applied to the order. Each discount object includes the following properties
// 1. amount: The amount that is deducted from the order total. When you create an order, This value is in percentage