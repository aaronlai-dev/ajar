import { differenceInMinutes } from "date-fns";

function formatDuration(startDate: Date, endDate: Date): string {
	const totalMinutes = differenceInMinutes(endDate, startDate);
	if (totalMinutes <= 0) return "—";

	const totalHours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	const days = Math.floor(totalHours / 24);
	const hours = totalHours % 24;

	const fmtDays = (d: number) => `${d} ${d === 1 ? "day" : "days"}`;
	const fmtHrs = (h: number) => `${h} ${h === 1 ? "hr" : "hrs"}`;
	const fmtMins = (m: number) => `${m} ${m === 1 ? "min" : "mins"}`;

	if (days > 0) {
		const parts = [fmtDays(days)];
		if (hours > 0) parts.push(fmtHrs(hours));
		if (minutes > 0) parts.push(fmtMins(minutes));
		return parts.join(" ");
	}

	if (hours === 0) return fmtMins(minutes);
	if (minutes === 0) return fmtHrs(hours);
	return `${fmtHrs(hours)} ${fmtMins(minutes)}`;
}

export { formatDuration };
