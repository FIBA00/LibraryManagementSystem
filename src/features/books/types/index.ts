export type Library = {
	id: string;
	name: string;
	location: string;
	description: string;
	status: "pending" | "approved" | "suspended" | "rejected";
	books: number;
	members: number;
};
export type Book = {
	id: string;
	title: string;
	author: string;
	category: string;
	available: number;
	total: number;
	cover: string;
};
