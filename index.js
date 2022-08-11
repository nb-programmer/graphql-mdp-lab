
import express from "express";
import { graphqlHTTP } from "express-graphql";

//App related
import resolvers from "./resolvers";
import schema from "./schema";

//Express application
const app = express();

//Homepage route
app.get("/", (req, res) => {
	res.send("Server running. Go to <a href=\"/graphql\">GraphQL</a> page.");
});


const root = resolvers;

//GraphQL middleware
app.use("/graphql", graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true
}));

//Begin the app
app.listen(8080, () => {
	console.log("Running at port 8080. Go to http://localhost:8080/");
});
