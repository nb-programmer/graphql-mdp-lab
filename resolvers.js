/**
 *
 * Database query resolver
 *
 */


//Import uuid module
import { v4 as uuidv4 } from "uuid";

//Connection class (choose from jsondb, mongodb, etc.)
import Connection from './db/jsondb';

//Static connection
const conn = new Connection();

/* Resolver functions */
const resolvers = {
	getAuthor: async ({id}) => await conn.getAuthor(id),
	getAuthors: async () => await conn.getAuthors(),
	//New author with random ID
	createAuthor: async ({input}) => await conn.createAuthor(uuidv4(), input),
	updateAuthor: async ({id, input}) => await conn.updateAuthor(id, input),
	deleteAuthor: async ({id}) => await conn.deleteAuthor(id)
};

export default resolvers;
