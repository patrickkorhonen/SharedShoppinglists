import { sql } from "../database/database.js";

const add = async (listId, name) => {
    await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${listId}, ${name})`;
  };

  const findAllItems = async (listId) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId} ORDER BY collected, name`;
  };

const collect = async (itemId) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${itemId}`;
};

const count = async() => {
  const rows = await sql`SELECT COUNT(*) AS count FROM shopping_list_items`;
  return rows[0].count;
};
  

export {add, findAllItems, collect, count}