// Draft Order

// => It requires the draft order access scope.

// Merchant can create draft orders to create order on the behalf of their customers. They are useful for merchants that need to do the following task:
// => Create new orders for sales made by phone, in person, by chat, or elsewhere. When a merchant accepts payment for a draft order, an order is created.
// => Send invoice to the customers to pay with a secure checkout link.
// => Use custom items to represent additional costs or products that aren't displayed in the shops inventory.
// => Recreate order manually from active sales channels.
// => Sell products at discount or at wholesale rates.
// => Save an order as draft and resume working on it later.

// NOTE: The Draft Order resource doesn't expose reserve inventory information.


// The Draft Order Resource
// 1. id
// The id of the draft order.

// 2. order_id
// The ID of the order that's created and associated with the draft order after the draft order is complete.

// 3. customer
// It is the customer resource which is associated with the customer and contains in-=formation about the customer.

// 4. shipping_address
// It is the address to where the order has to be shipped. It is an optional field for those products which does not have to be shipped. It has the following properties:
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

// 5. billing_address
// It is the mailing address which is associated with the payment method. This is an optional field for the orders which does not require payment method. It has the following properties:
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

// 6. note
// The text of an optional note that a merchant can attach to the draft order.

// 7. note_attributes
// The extra information that's added to the order. The information appears in the "Additional Details" section of the order details page. Each array must contain a hash with "name" and "value" keys.

// 8. email
// The customer's email address.

// 9. currency
// The three-letter code for the currency used for the payments.

// 10. invoice_sent_at
// The date and time when the invoiced was emailed to the customer.

// 11. invoice_url
// The URL of the invoice.

// 12. line_items
// The product variants line item associated to the draft order. Each draft order must include at least one line item. Each line item have the following properties:
// 1. custom: "Read only field"- whether this is a custom line item or a product variant line item. If it's set to true, It indicates a custom line item. And if it's set to false, It indicates a product variant line item.
// 2. id: The ID of the line item.
// 3. variant_id: The ID of the product variant corresponding to the line item. Required for a product variant line item. Set to null for a custom line item.
// 4. product_id: The ID of the product variant corresponding to the line item's product variant.
// 5. name: The name of the product.
// 6. variant_title: The name of the product variant. Defaults to "custom" for custom line items created via API.
// 7. vendor: The Vendor.
// 8. quantity: The quantity of the product that were purchased.
// 9. gift_card: Indicates if the product is a gift card. Valid values are "true" and "false".
// 10. fulfillment_services: The service provider responsible for the fulfillment. Valid values are either "manual" or name of the provider, Ex: Amazon, shipwire. Defaults to "manual" for custom line items.
// 11. properties: An array of custom information for an item that has been added in the draft order, used to provide "product customizable options". Copied to create when draft order is completed.
// 12. applied_discount: The discount applied to the line item.
// 13. tax_lines: "Read-only-fields"-The calculated rate and amount of the taxes in the line item.