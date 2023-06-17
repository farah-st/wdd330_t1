import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails, { showComments } from "./productDetails.mjs";

// search product
const productID = getParam("product");
showComments(productID);
productDetails(productID);

loadHeaderFooter();
