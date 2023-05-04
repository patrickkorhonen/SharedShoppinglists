import { sql } from "../database/database.js";

const create = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
  };
  
  const findAllActiveShoppinglists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
  };

  const findList = async (id) => {
    return await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;
  };

  const deactivate = async (id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
  };

  const countLists = async() => {
    const rows = await sql`SELECT COUNT(*) AS count FROM shopping_lists`;
    return rows[0].count;
  };
  
  export { create, findAllActiveShoppinglists, deactivate, countLists, findList };