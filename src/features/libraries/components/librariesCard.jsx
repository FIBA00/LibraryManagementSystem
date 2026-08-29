import {
	BadgeAlert,
	BadgeCheckIcon,
	BadgeQuestionMark,
	BookOpen,
	HelpCircleIcon,
	MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LibraryCard({ library }) {
	const statusColors = {
		pending: "text-accent",
		approved: "text-success",
		rejected: "text-danger",
	};
	const statusIcons = {
		pending: <BadgeQuestionMark size={25} className="text-accent" />,
		approved: <BadgeCheckIcon size={25} className="text-success" />,
		rejected: <BadgeAlert size={25} className="text-danger" />,
	};
	const textColorClass = statusColors[library.status] || "text-text-muted";
	const currentIcon = statusIcons[library.status] || (
		<HelpCircleIcon size={25} />
	);
	return (
		<Link to={`/library/${library.id} `}>
			<article className="shadow-card rounded-2xl  h-30 border border-accent-alt  p-2   hover:shadow-lg bg-surface hover:bg-surface-raised  ">
				<div className="flex items-start justify-between">
					<div className="inline-flex gap-2 p-2 rounded-xl text-text">
						<BookOpen />
						<h3 className="font-bold text-text">{library.name}</h3>
					</div>
					{/* icon section */}

					<span
						className={`inline-flex justify-center items-center gap-2 p-1 rounded-full bg-surface-hover py-1.5 px-1 w-35 font-bold ${textColorClass} `}>
						<p>{library.status}</p>
						{currentIcon}
					</span>
				</div>
				<div className="inline-flex gap-x-4 p-2 space-x-2 ">
					<p className=" items-center gap-1 text-sm text-text-muted hover:text-accent">
						<MapPin size={25} /> {library.location}
					</p>
					<p className="leading-6 text-text-muted">
						{library.address}
					</p>
				</div>
			</article>
		</Link>
	);
}
