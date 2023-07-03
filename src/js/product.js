import { getParam, loadHeaderFooter, addBreadcrumbs } from "./utils.mjs";
import productDetails, {showComments} from "./productDetails.mjs";

// search product
const productID = getParam("product");
productDetails(productID);
loadHeaderFooter();
addBreadcrumbs();
showComments(productID);
