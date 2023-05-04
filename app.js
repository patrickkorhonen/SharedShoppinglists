import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as shoppinglistController from "./controllers/shoppinglistController.js";
import * as itemController from "./controllers/itemController.js";
import * as requestUtils from "./utils/requestUtils.js";
import { renderFile } from "./deps.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/" && request.method === "GET") {
    const data = {
      lists: await shoppinglistController.countShoppinglist(request),
      items: await itemController.countItems(request),
    };
    return new Response(await renderFile("mainPage.eta", data), responseDetails);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await shoppinglistController.viewShoppinglists(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await shoppinglistController.addShoppinglist(request);
  } else if (url.pathname.match("lists/[0-9]+/deactivate") && request.method === "POST") {
    return await shoppinglistController.deactivateShoppinglist(request);
  } else if (url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await itemController.collectItem(request);
  } else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
    return await itemController.addItem(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await shoppinglistController.viewShoppinglist(request);
  }  else {
    return requestUtils.redirectTo("/");
  }
  
};

serve(handleRequest, { port: 7777 });
