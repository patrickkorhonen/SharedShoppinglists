import { renderFile } from "../deps.js";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

  const addItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const formData = await request.formData();
    const name = formData.get("name");
    
  
    await itemService.add(urlParts[2], name);
  
    return requestUtils.redirectTo("/lists/" + urlParts[2]);
  };

  const collectItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
     
    await itemService.collect(urlParts[4]);
  
    return requestUtils.redirectTo("/lists/" + urlParts[2]);
  };

  const countItems = async (request) => {
    return await itemService.count();
  };

export {addItem, collectItem, countItems}