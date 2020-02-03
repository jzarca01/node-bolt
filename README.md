# node-bolt

An API Wrapper for Bolt

_Do you need a **paid license** ?_ [https://jzarca01.github.io/contact](https://jzarca01.github.io/contact)

## Installation

```shell
yarn add node-bolt
```

## Usage

```javascript
const Bolt = require("node-bolt");
const bolt = new Bolt({
  licenseFilePath: "./license_files/file.lic", // relative path to the root of the project
  user: "", // user's phone number
  deviceUUID: "" // user's device UUID
});
```

## Methods

### Login

```javascript
bolt.login();
```

### Verify code

```javascript
bolt.verify(code);
```

### Find promos available

```javascript
bolt.findPromosAvailable({ lat, lng });
```

### Add promo code

```javascript
bolt.addPromoCode(promoCode);
```

### Find coordinates by address

```javascript
bolt.findCoordinatesByAddress(address);
```

### Find address by coordinates

```javascript
bolt.findAddressByCoordinates({ lat, lng });
```

### Find address

```javascript
bolt.findAddress({ lat, lng }, searchTerm);
```

### Find address by placeId

```javascript
bolt.findAddressByPlaceId(placeId);
```

### Get suggested dropoffs

```javascript
bolt.getSuggestedDropoffs({ lat, lng });
```

### Get payment methods by template

```javascript
bolt.getPaymentMethodsByTemplate({ lat, lng, country_code });
```

### Get prices

```javascript
bolt.getPrices(startLocation, endLocation, campaignCode = null);
```

### Get nearby vehicles

```javascript
bolt.getNearbyVehicles({ lat, lng });
```

### Update user profile

```javascript
const updatedProfile = {
  first_name: "Bob",
  email: "bob@bob.com",
  last_name: "Bob",
  language: "fr",
  birthday: "1986-01-01",
  allow_sendind_news: false
};
bolt.updateProfile(updatedProfile);
```

### Get order history

```javascript
bolt.getOrders();
```

### Get order details

```javascript
bolt.getOrderDetails(orderId);
```

### Get payment methods per template

```javascript
bolt.getPaymentMethodsPerTemplate({ lat, lng, country_code });
```

### Create order

```javascript
bolt.createOrder(
  startLocation,
  endLocation,
  priceLockId,
  searchToken,
  searchCategoryId,
  payment = { type: "default", id: "cash" }
);
```

### Get current active order

```javascript
bolt.getCurrentActiveOrder();
```

### Cancel order

```javascript
bolt.cancelOrder(orderId);
```

### Add cancellation reason

```javascript
bolt.addCancellationReason(orderId, reason = "Accidental request");
```

### Get order state

```javascript
bolt.pollingClient(orderId);
```

### Set default payment method

```javascript
bolt.setDefaultPaymentMethod({ id, type });
```

### Delete payment method

```javascript
bolt.deletePaymentMethod({ id, type });
```
