// Order Risk
// => The order risk represents the results of fraud checks that have been completed for an order.
// => When determining an order's risk level, Shopify takes an account only those order risks that have the display property set to "true". Orders with display property set to "false" will not be returned through the Order risk resource. It's not advice to create a order with display set to "false".
// => Risk assessments will favour the most severe risk recommendation for an order.

// THE ORDER RISK RESOURCE
// 1. cause_cancel
// Whether this order is severe enough to force the cancellation of the order. If "true", then this order risk is included in the order cancelled message that's shown on the details page of the cancelled ordered.
// NOTE: Setting this property to "true" does not cancel the order. Use this property only if your app automatically cancels the order using the "order" resource. If your app does not automatically cancel the order, then set this property to "false".

// 2. checkout_id
// The id of the order that the order risk belongs to.

// 3. display
// Whether the order risk is displayed on the order details pages in the Shopify Admin. If "false", then the order risk is ignored when shopify determines your app's overall risk level of order.
// It's not advised to create an order risk with the display set to false.
// NOTE: This property can'rt be changed after an order risk is created.

// 4. id
// A unique numeric identifier for the order risk.

// 5. merchant_message (deprecated)
// The message that displayed to the merchant to indicate the result of the fraud check. The message is displayed only if the "display" is set to be "true".

// 6. message
// The message that displayed to the merchant to indicate the result of the fraud check. The message is displayed only if the "display" is set to be "true".

// 7. order_id
// The id of the order of the order that the order risk belongs to.

// 8. recommendation
// The recommended action given to the merchant. Valid values:
// 1. cancel: There is an high level of risk that this order is fraudulent. The merchant could cancel the order.
// 2. investigate: There is a medium level of risk that this order is fraudulent. The merchant should investigate the order.
// 3. accept: There is a low level of risk that this order is fraudulent. The order risk found no indication of fraud.

// 9. score (For internal use only)
// The number between 0 and 1 which is assigned to the order. The closer the order to 1, Most likely the order is fraudulent.
// NOTE: There is no guarantee of stability in risk scores. Scores are not probability. The relationship between scores and the probability of fraud can vary over the time and between risk providers.

// 10. source
// The source of the order risk.