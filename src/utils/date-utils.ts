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

function formatDateRangeLabel(startTime: Date, endTime: Date): string {
	const isSameDay =
		startTime.getFullYear() === endTime.getFullYear() &&
		startTime.getMonth() === endTime.getMonth() &&
		startTime.getDate() === endTime.getDate();

	const formatTime = (date: Date): string => {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const period = hours < 12 ? "am" : "pm";
		const displayHour = hours % 12 || 12;
		const displayMinutes =
			minutes > 0 ? `:${String(minutes).padStart(2, "0")}` : "";
		return `${displayHour}${displayMinutes}${period}`;
	};

	const formatDayMonth = (date: Date): string => {
		const day = date.getDate();
		const month = date.toLocaleString("en-GB", { month: "long" });
		const suffix = getOrdinalSuffix(day);
		return `${day}${suffix} ${month}`;
	};

	const getOrdinalSuffix = (day: number): string => {
		if (day >= 11 && day <= 13) return "th";
		switch (day % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	};

	const startLabel = `${formatDayMonth(startTime)} ${formatTime(startTime)}`;
	const endLabel = isSameDay
		? formatTime(endTime)
		: `${formatDayMonth(endTime)} ${formatTime(endTime)}`;

	return `${startLabel} - ${endLabel}`;
}

export { formatDisplay, formatDateRangeLabel };
