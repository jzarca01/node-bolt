const Bolt = require("../dist/"); //require('node-bolt');
const bolt = new Bolt({
  licenseFilePath: "./license_files/license.lic",
  user: "+6281239097794", // user phone number
  deviceUUID: "fnuQLp-wFo4"
});
const prompt = require("prompt-async");

async function init() {
  try {
    await bolt.login();
    prompt.start();
    const { startAddress } = await prompt.get(["startAddress"]);

    const startLocation = await bolt.findCoordinatesByAddress(startAddress);
    console.log(startLocation);

    const methods = await bolt.getPaymentMethodsPerTemplate(startLocation);
    const { personal } = methods.data.templates;
    console.log(personal.list);

    if (!personal.list.length) {
      throw new Error("Need to add payment method first");
    }

    const preferredPayment = personal.list[0];

    const { endAddress } = await prompt.get(["endAddress"]);

    const address = await bolt.findAddress(startLocation, endAddress);

    if (!address.data.suggestions.length) {
      throw new Error("Destination not found");
    }

    const mySuggestedDestination = address.data.suggestions[0];
    console.log(mySuggestedDestination);

    const myDestination = await bolt.findAddressByPlaceId(
      mySuggestedDestination.place_id
    );
    console.log("destination", myDestination);

    const prices = await bolt.getPrices(startLocation, myDestination.data, null, preferredPayment);

    if (
      !prices.data.search_categories ||
      !prices.data.search_categories.length
    ) {
      throw new Error("Cannot get prices");
    }
    console.log(JSON.stringify(prices.data));

    const { search_token, search_categories } = prices.data;

    const cheapestRide = search_categories[0];
    const { price } = cheapestRide;

    console.log("price", price);
    const order = await bolt.createOrder(
      startLocation,
      myDestination.data,
      price.lock_hash,
      search_token,
      cheapestRide.id,
      preferredPayment
    );
    console.log("order", JSON.stringify(order));
    const orderData = order.data;

    if (!orderData.id) {
      throw new Error("Order not created");
    }


    const pollingInterval = setInterval(async () => {
      const poll = await bolt.pollingClient(orderData.id);
      console.log("poll", poll);
    }, 5000);

    await prompt.get(["finish"]);

    

    setTimeout(async () => {
      clearInterval(pollingInterval);

      const activeOrder = await bolt.getCurrentActiveOrder();
      console.log("activeOrder", activeOrder);

      const stop = await bolt.cancelOrder(orderData.id);
      console.log("stop", stop);
    }, 5000);
  } catch (err) {
    console.log("error", err);
  }
}

init();
