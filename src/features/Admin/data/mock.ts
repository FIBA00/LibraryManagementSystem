export type RegistrationStatus =
	| "Pending"
	| "Approved"
	| "Rejected"
	| "Suspended";
export type Library = {
	id: number;
	name: string;
	location: string;
	owner: string;
	email: string;
	books: number;
	members: number;
	status: RegistrationStatus;
	submitted: string;
};

export const registrations: Library[] = [
	{
		id: 1,
		name: "Horizon Community Library",
		location: "Addis Ababa",
		owner: "Mekdes Tesfaye",
		email: "mekdes@horizon.et",
		books: 4200,
		members: 860,
		status: "Pending",
		submitted: "2h ago",
	},
	{
		id: 2,
		name: "Blue Nile Learning Center",
		location: "Bahir Dar",
		owner: "Samuel Bekele",
		email: "samuel@bluenile.et",
		books: 1850,
		members: 420,
		status: "Pending",
		submitted: "5h ago",
	},
	{
		id: 3,
		name: "Unity Public Library",
		location: "Adama",
		owner: "Rahel Alemu",
		email: "rahel@unity.et",
		books: 7300,
		members: 1520,
		status: "Approved",
		submitted: "Yesterday",
	},
	{
		id: 4,
		name: "Starlight Library",
		location: "Hawassa",
		owner: "Dawit Girma",
		email: "dawit@starlight.et",
		books: 2300,
		members: 610,
		status: "Rejected",
		submitted: "2 days ago",
	},
	{
		id: 5,
		name: "Kora Research Library",
		location: "Dire Dawa",
		owner: "Liya Abebe",
		email: "liya@kora.et",
		books: 9100,
		members: 1880,
		status: "Suspended",
		submitted: "4 days ago",
	},
];

export const monthly = [
	{ month: "Mar", libraries: 18, users: 420, borrowed: 820 },
	{ month: "Apr", libraries: 24, users: 510, borrowed: 940 },
	{ month: "May", libraries: 29, users: 630, borrowed: 1120 },
	{ month: "Jun", libraries: 35, users: 760, borrowed: 1390 },
	{ month: "Jul", libraries: 42, users: 920, borrowed: 1680 },
	{ month: "Aug", libraries: 48, users: 1080, borrowed: 1910 },
];

export const recentActivity = [
	["Horizon Community Library", "Registration submitted", "2 hours ago"],
	["Unity Public Library", "Added 124 books", "4 hours ago"],
	["Admin · You", "Approved Bluebird Library", "Yesterday"],
	["Kora Research Library", "Account suspended", "Yesterday"],
	["Amanuel Worku", "Joined as member", "2 days ago"],
];
