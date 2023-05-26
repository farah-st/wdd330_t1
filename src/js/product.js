import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// search product
const productID = getParam("product");
productDetails(productID);
loadHeaderFooter();
