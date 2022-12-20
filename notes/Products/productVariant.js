// Product variants
// A variant can be added to a product resource to represent one version of the product with several options.

// Product variants
// 1. barcode
// The barcode, UPC, or ISBN number of the product.

// 2. compare_at_price
// The original price of a item before an adjustment or a sale.

// 3. created_at
// The date an time when the product variant was created

// 4. fulfillment services
// It is a third party warehouse that prepares and ships orders on behalf of the store owner. They charge a fee to package and ship items and update product inventory level. Some well known fulfillment  services includes Amazon, shipwire etc. These fulfillment services are associated with the product variant.

// 5. grams
// The weight of the product variant in grams.

// 6. id
// The unique integer identifier of the product variant

// 7. image_id
// The unique identifier of the product's image. The image must be associated to the same product as the variant

// 8. inventory_item_id
// The unique identifier of the inventory item.

// 9. inventory_management
// The fulfillment services that tracks the number of items in stock for the product variant. It's valid values are:
// 1. shopify: You are tracking the inventory yourself using admin.
// 2. null: You are not tracking the inventory on the variant.
// 3. fulfillment_services: The handle of a fulfillment service that has inventory management enabled.

// 10. inventory_policy
// Weather the customer are allowed to place an order when the variant is still out of stock. It's valid values are:
// 1. deny: Customer is not allowed to place an order if the variant is out of stock.
// 2. continue: Customer is allowed to place an order when the variant is out of stock.

// 11. inventory_quantity (read only)
// The total quantity of the inventory across all locations.

// 12. old_inventory_quantity (deprecated)

// 13. inventory_quantity_adjustment (deprecated)

// 14. options
// This is a custom property that a shop owner uses to define product variants. You can define three options for a product variant. Option1, Option2 and option3.

// 15. presentment_prices (read only)
// A list of variant's present prices and compare-at- prices in each of the shop enabled presentment currencies. It has two values:
// 1. currency_code: It is a 3 letter code for one of the shop's enabled presentment currencies.
// 2. amount: The variant's price in the countries currency.

// 16. position
// The order of the product variant in the list of product variants. The first position in the list is 1. The position of variants is indicated by the order in which they are listed.

// 17. price
// The price of the product variant.

// 18. product_id
// The unique number of the product.

// 19. requires_shipping (deprecated)

// 20. sku
// It is a unique identifier for the product variant in the shop. Required in order to connect to fulfillment service.

// 21. taxable
// Whether the tax is charged when the product is sold.

// 22. tax_code
// This is only applied to the stores that have tha Avalara AvaTax app installed. Specifies the avalara tax code

// 23. title
// The title of the product variant. The title field is concatenation of the option1, option2, option3 fields. You can only update title indirectly using the optional field.

// 34. updated_at
// The date and time when the product variant was last modified.

// 35. weight
// The weight of product variant in the unit system specified with weight_unit.

// 36. weight_unit
// The unit of measurement that applies to product variant's weight. If you don't specify the unit, Then the shops default unit of measurement is applied. Valid values are:
// 1. g
// 2. kg
// 3. oz
// 4. lb