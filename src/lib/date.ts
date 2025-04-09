function addZero(number: number) {
	if (number<10) {
		return "0"+number;
	}
	return number;
}

export function ddmmYYYY(date: string) {
	const realDate = new Date(date);
	const day = realDate.getDate(), month = realDate.getMonth()+1, year = realDate.getFullYear();
	return `${addZero(day)}-${addZero(month)}-${year}`
}
