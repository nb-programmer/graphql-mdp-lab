import { buildSchema } from "graphql";
import fs from 'fs';

//Load schema from external file
const schema_str = fs.readFileSync('schema.graphql', "utf8");
const schema = buildSchema(schema_str);

export default schema;
