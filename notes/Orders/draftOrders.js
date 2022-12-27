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
// 13. tax_lines: "Read-only-fields"-The calculated rate and amount of the taxes in the line item. It has the following properties:
// a. price: The price of the tax to be charged.
// b. rate: The rate of tax to be applied.
// c. title: The name of the tax
// 14. title: The title of the product or product variant. Applicable only to custom line items. (required field)
// 15. price: The price of the item before discount applied. Applicable only to custom line items. (required field)
// 16. grams: The weight of the item in grams. Applicable only to custom line items. If not specified, defaults to 0.
// 17. required_shipping: Whether the fulfillment requires shipping. Applicable only to custom line items. Valid values are: "true" or "false".
// 18. sku: A unique identifier for the item to in the fulfillment. Applicable only to custom line items.
// 19. taxable: Whether the item is taxable. Applicable only to custom line items.

// 13. payment_terms
// The terms and conditions under which the payment has to be made. It's properties are:
// 1. amount: The amount that is owned according to the payment terms.
// 2. currency: The presentment currency for the payment.
// 3. payment_terms_name: The name of the selected payment terms template for the draft order.
// 4. payment_term_type: The type of the payment term template for the draft order.
// 5. due_in_days: The number of days between the invoice date and due date that is defined in the selected payment terms template.
// 6. payment_schedules: An array of schedules associated to the payment terms. It has the following properties:
// a. amount: The amount that is owned according to the payment terms.
// b. currency: The presentment currency for the payment.
// c. issued_at: The date and time when the payment terms were initiated.
// d. due_at: The date and time when the payment is due. Calculated based on issued_at and due_in_days or a customized fixed date if the type is fixed.
// f. completed_at: The date and time when the purchase was completed. Returns null initially and updates when the payment was captured.
// g. expected_payment_method: The name of payment method gateway.

// 14. shipping_line: It is the shipping method used. Each shipping line has the following properties:
// 1. custom: Whether this is a regular shipping line or a custom shipping line.
// 2. handle: The handle of the shipping rate which was selected and applied. Required for regular shipping lines.
// 3. title: The title of the shipping method. Required for custom line shipping lines. (maximum: 255 characters).
// 4. price: The price of the shipping method. Required for custom line shipping lines.

// 15. source_name: The source at the checkout. To use this felid for sales attribution, you need to register tha channel your app is managing. You can register the channels that your app is managing.

// 16. tags
// It is a comma separated list of additional shorts description, commonly used for filtering and searching. Each individual tags is limited to 40 characters in length. Eg. 'tags: "tag1", "tag2", "tag3"'.

// 17. tax_exempt
// Whether the tax are exempt for the draft order. If it is set to false, then shopify refers to the taxable field for each "line_item". If a customer is applied to the draft order, then shopify uses the customer's tax_exempt field instead.

// 18. tax_exemption
// Whether the customer is exempt from paying taxes on their order. Canadian Taxes Only. It's valid values are:
// 1. EXEMPT_ALL: This customer is exempt from all canadian taxes.
// 2. CA_STATUS_CARD_EXEMPTION: This customer is exempt from specific taxes for holding STATUS_CARD_EXEMPTION in Canada.
// 3. CA_DIPLOMAT_EXEMPTION: This customer is exempt from specific taxes for holding DIPLOMAT_EXEMPTION in Canada.
// 4. CA_BC_RESELLER_EXEMPTION: This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION card in British Columbia
// 5. CA_MB_RESELLER_EXEMPTION: This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Manitoba.
// 6. CA_SK_RESELLER_EXEMPTION: This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Saskatchewan.
// 7. CA_BC_COMMERCIAL_FISHERY_EXEMPTION: This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in British Columbia.
// 8. CA_MB_COMMERCIAL_FISHERY_EXEMPTION: This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in Manitoba.
// 9. CA_NS_COMMERCIAL_FISHERY_EXEMPTION: This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in Nova Scotia.
// 10. CA_PE_COMMERCIAL_FISHERY_EXEMPTION: This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in Prince Edward Island.
// 11. CA_SK_COMMERCIAL_FISHERY_EXEMPTION: This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in Saskatchewan.
// 12. CA_BC_PRODUCTION_AND_MACHINERY_EXEMPTION: This customer is exempt from specific taxes for holding a valid PRODUCTION_AND_MACHINERY_EXEMPTION in British Columbia.
// 13. CA_SK_PRODUCTION_AND_MACHINERY_EXEMPTION: This customer is exempt from specific taxes for holding a valid PRODUCTION_AND_MACHINERY_EXEMPTION in Saskatchewan.
// 14. CA_BC_SUB_CONTRACTOR_EXEMPTION: This customer is exempt from specific taxes for holding a valid SUB_CONTRACTOR_EXEMPTION in British Columbia.
// 15. CA_SK_SUB_CONTRACTOR_EXEMPTION: This customer is exempt from specific taxes for holding a valid SUB_CONTRACTOR_EXEMPTION in Saskatchewan.
// 16. CA_BC_CONTRACTOR_EXEMPTION: This customer is exempt from specific taxes for holding a valid CONTRACTOR_EXEMPTION in British Columbia.
// 17. CA_SK_CONTRACTOR_EXEMPTION: This customer is exempt from specific taxes for holding a valid CONTRACTOR_EXEMPTION in Saskatchewan.
// 18. CA_ON_PURCHASE_EXEMPTION: This customer is exempt from specific taxes for holding a valid PURCHASE_EXEMPTION in Ontario.
// 19. CA_MB_FARMER_EXEMPTION: This customer is exempt from specific taxes for holding a valid FARMER_EXEMPTION in Manitoba.
// 20. CA_NS_FARMER_EXEMPTION: This customer is exempt from specific taxes for holding a valid FARMER_EXEMPTION in Nova Scotia.
// 21. CA_SK_FARMER_EXEMPTION: This customer is exempt from specific taxes for holding a valid FARMER_EXEMPTION in Saskatchewan.

// 19. tax_lines
// An array of line resources, each of which details a tax applicable to the order. Each "tax_line" resource has the following properties:
// 1. price: The price of tax to be charged.
// 2. rate: The rate of the tax to be charged.
// 3. title: The name of tax.

// 20. applied_discount
// The discount applied to the line item the draft order resource. Each draft order resource can have one "applied_discount" resource and each draft order line item can have its own "applied_discount". The "applied_discount" resource has the following properties:
// 1. title: Title of the discount.
// 2. description: Reason of the discount.
// 3. value: The value of the discount. If the discount is "fixed_amount", then it corresponds to a fixed dollar amount. If the type is percentage, then it corresponds to a percentage.
// 4. value_type: The type of the discount. Valid values are "percentage" and "fixed_amount".
// 5. amount: The applied amount of the discount, based on the setting of "value_type".

// 21. taxes_included
// Whether taxes are included in the order subtotal. Valid values are "true" or "false".

// 22. total_tax
// The sum of all the total taxes applied to the order.

// 23. subtotal_price
// The price of the order before taxes and shipping.

// 24. total_price
// The sum of all the total prices applied to the order, including taxes and discounts.

// 25. completed_at
// The date and time when the order was created and the draft order was completed.

// 26. created_at
// The date and time when the order was created and the draft order was completed.

// 27. updated_at
// The date and time when the order was last modified.

// 28. status
// The status of a draft order as it transitions into an order. When a draft order is created it is to set "open" status. The invoice can be sent to the customer, and "status" changes to "invoice_sent". The draft order can then be paid, set to pending, or paid by credit card. In each case, draft order is set to "completed" and an order is created.
// After the draft order is set to "completed" the only modifications that can be made are adding tags or metafields. It's valid values are:
// 1. open: Draft order is open.
// 2. invoice_sent: invoice has been sent for the draft order.
// 3. completed: Draft order has been completed and turned into order.