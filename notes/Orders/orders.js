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
// 1. amount: The amount that is deducted from the order total. When you create an order, This value is in percentage or the monitory amount to deduct. After the order is created, this property returns the calculated amount.
// 2. code: When the associated discount applicable is of type code, this property returns the discount code that was entered at the time of checkout. Otherwise, this property returns the title of the discount that was applied.
// 3. type: It is the type of the discount. Its default value is "fixed_amount". Its valid values are:
// a. fixed_amount: Applies amount as a unit of store's currency. For example: If amount is 30 and the store's currency is "USD", then the discount will be 30 USD. 30 USD will be deducted at the time of checkout as the discount.
// b. percentage: applies the discount as a percentage of the total order.
// c. shipping: Applies the free shipping discount that have shipping rate less then or equal to discount. For example: If amount is 30, then the discount will give the customer free shipping for any shipping rates then a less then or equal to $30.

// 26. Email
// The customer's email address.

// 27. estimated_taxes
// Whether taxes on the order are estimated. Many factors can be changed between the time a customer places an order and the time order is shipped, which could affect the calculation of taxes. This property returns false and when taxes on the order are finalized and are not being changed in the future.

// 28. financial_status
// The status of order associated with the order. Can only be set when the order was created. Its valid values are:
// 1. pending: The payment is still pending. Payment might fail in this state. Check again to confirm whether the payments have been paid successfully.
// 2. authorized: The payment have been authorized.
// 3. partially_paid: The order has been partially paid.
// 4. paid: The payment has been paid.
// 5. partially_refunded: The payment has been partially refunded.
// 6. refunded: The payment has been refunded.
// 7. voided: The payment has been voided.

// 29. fulfillment
// The array of fulfillments associated with the order.

// 30. fulfillment_status
// The ordered statues in term of fulfilled line terms. Its valid values are:
// 1. fulfilled: Every line item in an order is fulfilled.
// 2. null: None of the line items in an order is fulfilled.
// 3. partial: At least one line item in an order is fulfilled.
// 4. restocked: Every line item in an order is restocked and the order is canceled.

// 31. gateway
// The payment gateway used.

// 32. id
// The ID of the order which is used for API purposes. This is different from the "order_number" property, which is used by the shop owner and customer

// 33. landing_site
// The URL of the page where the buyer landed when they entered the shop.

// 34. line_items
// The list of line items objects, each containing information about an item in the order. Each object have the following properties:
// 1. fulfillable_quantity: The amount available to fulfill, calculated as follows:
// quantity - max(refunded_quantity, fulfilled_quantity)
// pending_fulfilled_quantity - open_fulfilled_quantity
// 2. fulfillment_service: The service provider thats fulfilling the item.
// 3. fulfillment_status: How far along an order is in terms line items fulfilled. It's valid values are:
// a. null
// b. fulfilled
// c. partial
// d. not_eligible
// 4. grams: The weight of items in grams
// 5. id: The id of line items.
// 6. price: The price of the item before discounts have been applied in the shop currency
// 7. price_set: The price of the line item in shop and presentment currencies
// 8. product_id: The id of the product where the line item belongs to. Can be null if the original product associated with the order is deleted at the later date.
// 9. quantity: The number of items that were purchased.
// 10. requires_shipping: Whether an item requires shipping.
// 11. sku: The item's SKU (shop keeping unit).
// 12. title: The title of the product.
// 13. variant_id: The ID of the product variant.
// 14. variant_title: The title of the product variant.
// 15. vendor: The name of item's supplier.
// 16. name: The name of the product variant.
// 17. gift_card: Whether the item is a gift card. If true then the item is not taxed or considered for shipping charges.
// 18. properties: An array of custom information for the item that has been added to the cart.
// 19. taxable: Whether the item is taxable.
// 20. tax_lines: A list of tax line objects, each  of which details a tax applied to the item.
// a. title: The name of the tax.
// b. price: The amount added to the order for this tax in the shop currencies.
// c. price_set: The amount added to the order for this tax in shop and presentment currencies.
// d. rate: The tax rate applied to the order to calculate the tax price.
// e. channel_liable: Whether the channel that submitted the tax line is liable for remitting. A value of null indicates unknown liability for the tax line.
// 21. tip_payment_gateway: The payment gateway used to tender the tip, such as shopify_payments. Present only on the tip
// 22. tip_payment_method: The payment method used to tender the tip, such as Visa. Present only tips.
// 23. total_discount: The total amount of the discount allocated to the line item in the shop currency. This field must be explicitly set using draft orders, Shopify scripts, or the API. Instead of using this field, Shopify recommends using "discount_allocation", which provides the same information.
// 24. total_discount_set: The total amount allocated in the line its in the presentment currency. Instead of using this field, Shopify recommends using "discount_allocation", which provides the same information.
// 25. discount_allocation: An ordered list of amounts allocated by discount applications. Each discount application. Each discount application is associated with a particular discount application.
// a. amount: The discount amount allocated to the line in the shop currency.
// b. discount_application_index: The index of the associated discount application in the order's discount_application list.
// 26. amount_set: The discount amount allocated to the line item in the shop and presentment currencies.
// 27. original_location
// The original location of the line item's fulfillment origin. This field is due to be deprecated. Consider using: "FulfillmentOrder#assigned_location_id" instead. Its values are:
// a. id: The location ID of the line item's fulfillment origin. Used by the shopify to calculate applicable taxes. This is not the ID of the location where the order was placed.
// b. country_code: The two-letter code for the country of the item supplier.
// c. province_code: The two-letter abbreviation for the region of the supplier
// d. name: The name of the item's supplier
// e. address1: The street address of the item's supplier.
// f. address2: The suite number of the item's supplier.
// g. city: The city of the item supplier.
// h. zip: The zip of the items supplier.
// 28. duties: A list of duty objects, each containing information about a duty on the line item.

// 35. location_id
// The ID of the physical location where the ordered was processed. To determine the locations where the line items are assigned for fulfillment please use the fulfillmentOrder resource.

// 36. merchant_of_record_app_id
// The application acting as Merchant of record for the order.

// 37. name
// The order name generated by combining the order_number property with the order prefix and suffix that are set in merchant's general settings. This is different from id property, which is the ID used by the API. This field can also be set by the API to be any string value.

// 38. note
// An optional note that a shop owner can attach to the order.

// 40. note_attribute
// Extra information that is added to the order. Appears in the ADDITIONAL DETAILS section of an order details page. Each array must contain a hash with name and value keys.

// 41 .number:
// The order's position in the shop's count of orders. Numbers are sequential and starts from 1.

// 42. order_number
// The order's position in the shop's count of orders starting from 1001. Order numbers are sequential and starts from 1001.

// 43. original_total_duties_set
// The original total duties charged on the order in shop and presentment currencies.

// 44. payment_details
// An object containing information about the payment. It has the following properties:
// 1. avs_result_code: The response code from the address verification system. The code is a single letter code.
// 2. credit_card_bin: The issuer identification number (IIN), formerly known as the bank identification number (BIN), of the customer's credit card. This is made up of the first few digits of the credit card number.
// 3. credit_card_company: The name of the company who issue the customer credit card.
// 4. credit_card_number: The customer's credit card number with most of the digits redacted.
// 5. cvv_result_code: The response code from the credit card company whether the customer entered the card security code (card verification value) correctly. The code is a single letter or empty strings.

// 45. payment_terms
// The terms and conditions under which the payment is being processed. Its valid properties are:
// 1. amount: The amount that is owed according to the payment terms.
// 2. currency: The presentment currency for the payment.
// 3. payment_terms_name: The name of the selected payment terms template for the order.
// 4. payment_terms_type: The type of selected payment terms template for the order.
// 5. due_in_days: The number of days between the invoice date and due date that is defined in the selected payment terms template.
// 6. payment_schedules: An array of schedules associated to the payment terms. Its valid values are:
// a. amount: The amount that is owed according to the payment terms.
// b. currency: The presentment currency for the payment.
// c. issued_at: The date and time where the payment term was initiated.
// d. due_at: The date and time when the payment is due. Calculated based on issued_at and due_in_days or a customized fixed date if the type is fixed.
// e. completed_at: The date and time when the purchase is completed. Returns null initially and updates when the payment is captured.
// f. excepted_payment_method: The name of the payment method gateway.

// 46. payment_gateway_names
// The list of payment gateway used for the orders.

// 47. phone
// The customer's phone number for receiving SMS notifications.

// 48. presentment_currency
// The presentment currency that was use to display price to the customer.

// 49. processed_at
// The date and time when the order was processed. This value is the date that appears on your orders and that's used in analytics reports. If you are importing orders from an app or another platform, then you can set processed_at to a date and time in the past to match when the order was originally created.

// 50. processing_method
// How the payment was processed. It has the following properties
// 1. checkout: The order was processed using the Shopify's checkout.
// 2. direct: The order was processed using the direct payment provider.
// 3. manual: The order was processed using the manual payment method.
// 4. offsite: The order was processed by an external payment provider to the Shopify's checkout.
// 5. express: Th e order was processed using the PayPal express checkout method.
// 6. free: The order was processed as a free order using discount code.

// 51. referring_site
// The website where the customer clicked a link to the shop.

// 52. refunds
// A list of refunds applied to the order

// 53. shipping_address
// The mailing address where the order will be shipped. The address is optional and will not be available on the orders that does not include shipping. It has the following properties:
// 1. address1: The street address of the shipping address.
// 2. address2: An optional street address for the ship address of the shipping address.
// 3. city: The city, town, or village of the shipping address.
// 4. country: The name of the country of the shipping address.
// 5. country_code: The two letter country code of the shipping address.
// 6. first_name: The first name of the person associated with the shipping address.
// 7. last_name: The last name of the person associated with the shipping address.
// 8. latitude: The latitude of the shipping address.
// 9. longitude: The longitude of the shipping address.
// 10. name: The full name of the person associated with the payment method
// 11. phone: The phone number at the shipping address.
// 12. province: The name of the region (for example: province, state, or prefecture) of the shipping address.
// 13. province_code: The two letter abbreviation of the region of the shipping address.
// 14. zip: The postal/zip code of the shipping address.

// 54. shipping_lines
// It is an array of objects, each of which details a shipping method used. Each object have the following properties:
// 1. 