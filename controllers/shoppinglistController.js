import { renderFile } from "../deps.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as shoppinglistService from "../services/shoppinglistService.js";
import * as itemService from "../services/itemService.js";


const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };


const addShoppinglist = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  

  await shoppinglistService.create(name);

  return requestUtils.redirectTo("/lists");
};

const deactivateShoppinglist = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await shoppinglistService.deactivate(urlParts[2]);
  return requestUtils.redirectTo("/lists");
}

const viewShoppinglists = async (request) => {
    const data = {
      shopping_lists: await shoppinglistService.findAllActiveShoppinglists(),
    };
  
    return new Response(await renderFile("shoppinglists.eta", data), responseDetails);
  };

  const viewShoppinglist = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const data = {
      shopping_list: await shoppinglistService.findList(urlParts[2]),
      items: await itemService.findAllItems(urlParts[2]),
    };
  
    return new Response(await renderFile("items.eta", data), responseDetails);
  };

const countShoppinglist = async (request) => {
  return await shoppinglistService.countLists();
};

export {addShoppinglist, viewShoppinglists, deactivateShoppinglist, countShoppinglist, viewShoppinglist}