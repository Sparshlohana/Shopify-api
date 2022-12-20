// Authentication Vs Authorization

// Authentication
// => It is a process of verifying user's identity.
// => All apps which are connecting with Shopify API must be authenticated while making API requests to keep Safe and secure transactions on shopify.

// Authorization
// => Authorization is the process of giving permissions to apps.
// => Merchant can authorize Shopify apps to access data in the store.
// => Eg. An app might be allowed to be authorized to access read and write data in the store.


// Types of Authentication and Authorization methods
// => These methods depends on the tools which you used to create your app and the components of your app.

// => The methods are:
// 1. All apps that are created using shopify CLI or through the Partner Dashboard uses OAuth.
// 2. If the app is embedded in shopify using App Bridge, then your app also uses session tokens.
// 3. Apps that are created in the Shopify Admin use access tokens that are generated in the Shopify Admin.


// The OAuth flow
// => The OAuth flow is used so that merchant can authorize Shopify apps to access data in a store.
// => Eg. An app might be authorized to access orders and products data in a store.

// Steps to the OAuth flow
// 1. The merchant makes an request to install the app.
// 2. The app redirects to Shopify to load the Oauth screen and request merchant to authorize the required scopes.
// 3. The merchant authorizes the app by accepting the requested scopes.
// 4. The app receives an authorization grant. (This is a temporary credential representing authorization)
// 5. The app requests an access token by authenticating with the shopify and showing (presenting) the authorization grant.
// 6. Shopify authenticates the app, Validates the authorization grant, then issues and returns the access token. The app can now request the access token.
// 7. The app uses the access token and makes requests to the shopify API.
// 8. Shopify validates the access token and returns the requested data.

// Shopify Authentication Process
// 1. Merchant creates an App
// 2. We require three things: API Key also know as client Id, Secret key, and callback URL. We get these things while the merchant creates the app.
// 3. When we login, We sent shop's name in query. If shop name is present, Then only we can hit on shopify URL.
// 4. Once The shopify url is hit, It authenticates if the request is from a valid store. If the request is valid, Then it will hit the callback URL.
// 5. After hitting the callback URL, We get the CODE, HMAC, SHOP (shopName), STATE (optional) is provided by the shopify in query.
// 6. Once we get these things, We remove HMAC from the query and now we need to create new HMAC using CODE, SHOP, and the API key (which we get when the app is created).
// 7. After creating the new HMAC, Now we need to check whether the new HMAC is same as the existing HMAC provided by the shopify.
// 8. If it matches, we will request for the access token to Shopify
// 9. With the access token, now it is possible for the user to access permissions which were present in the scope.
// 10. If we need any data from shopify, we can send the access token to the shopify and shopify will validate it and send the require data. This process is called Authentication.