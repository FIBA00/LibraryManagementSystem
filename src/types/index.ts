export type LibraryStatus = "pending" | "approved" | "rejected" | "suspended";
export type Library = {
	id: string;
	name: string;
	ownerId: string;
	status: LibraryStatus;
	address: string;
	proofDocumentUrl: string | null;
	reviewedBy: string | null;
	reviewedAt: string | null;
	createdAt: string;
};
