
//Import data models
import BaseModel, { Author } from './datamodel';

//Better FS module imo
import {promises as fsp} from "fs";

/* JSON connection */
export default class JSONConnection extends BaseModel {
	//Where to save the data
	DATAFILE = 'author_data.json';

	constructor() {
		super();
		//Empty data initially
		this.data_holder = {
			data: {}
		};
	}

	//Synchronise with JSON file.
	//Despite being called "sync" these are asynchronous
	syncRead() {
		return fsp.readFile(this.DATAFILE)
			.then(rawdata => JSON.parse(rawdata))
			.then(data => {this.data_holder = data;})
			.catch(err => {
				//File not found, create new
				if (err.code === 'ENOENT')
					return this.syncWrite();
				//Other error
				console.error(err);
			});
	}
	syncWrite() {
		return fsp.writeFile(this.DATAFILE, JSON.stringify(this.data_holder))
			.catch(err => console.error(err));
	}


	/* Database API */

	async getAuthor(id) {
		await this.syncRead();
		return new Author(id, this.data_holder.data[id]);
	}

	async getAuthors() {
		await this.syncRead();
		return Object.entries(this.data_holder.data).map(item => new Author(...item));
	}

	async createAuthor(id, input) {
		await this.syncRead();
		this.data_holder.data[id] = input;
		await this.syncWrite();
		return new Author(id, input);
	}
	
	async updateAuthor(id, input) {
		await this.syncRead();
		if (!this.data_holder.data[id]) throw new Error(`ID "${id}" doesn't exist!`);
		//Change properties requested to be changed
		Object.entries(input).forEach(k => {
			//Prevent changing id field
			if (k[0] == "id") return;
			//Update field
			this.data_holder.data[id][k[0]] = k[1];
		});
		await this.syncWrite();
		return new Author(id, this.data_holder.data[id]);
	}

	async deleteAuthor(id) {
		await this.syncRead();
		if (!this.data_holder.data[id]) throw new Error(`ID "${id}" doesn't exist!`);
		delete this.data_holder.data[id];
		await this.syncWrite();
		return id;
	}
}
