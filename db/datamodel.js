
/**** Data Models ****/

/* Author class */
class Author {
	constructor(id, {author_name, author_phone, author_email}) {
		this.id = id;
		this.author_name = author_name;
		this.author_phone = author_phone;
		this.author_email = author_email;
	}
}

/* Database connection model */
class BaseModel {
	async getAuthor(id) {}
	async getAuthors() {}
	async createAuthor(id, input) {}
	async updateAuthor(id, input) {}
	async deleteAuthor(id) {}
}

export default BaseModel;
export { Author };
