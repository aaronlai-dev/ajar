function formatDisplay(isoString: string): string {
	if (!isoString) return "";
	const d = new Date(isoString);
	return d.toLocaleString("en-AU", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
}

export { formatDisplay };
