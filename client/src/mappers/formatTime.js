export function formatAMPM(dateOfTheMatch) {
	let hour = dateOfTheMatch.getHours();
	let minutes =
		(dateOfTheMatch.getMinutes() < 10 ? '0' : '') + dateOfTheMatch.getMinutes();
	let ampm = hour >= 12 ? 'PM' : 'AM';
	hour = hour % 12;
	hour = hour ? hour : 12;
	let strTime = hour + ':' + minutes + ' ' + ampm;
	return strTime;
}
