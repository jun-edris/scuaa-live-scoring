import React from 'react';
import { Document, Page, StyleSheet, View, Text } from '@react-pdf/renderer';
import { monthNames } from './../constants/month';
import { formatAMPM } from './../mappers/formatTime';
import PDFTable from './PDFTable';

const styles = StyleSheet.create({
	page: {
		backgroundColor: '#ffffff',
		marginTop: 30,
	},
	headingText: {
		fontSize: 14,
	},
	headerText: {
		marginTop: 5,
		fontSize: 12,
	},
	textBody: {
		marginTop: 50,
		marginLeft: 30,
		fontSize: 12,
	},
	header: {
		marginTop: 5,
		marginRight: 20,
		marginLeft: 30,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	spaces: {
		marginTop: 60,
	},
	teamName: {
		marginLeft: 30,
	},
	tableContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 5,
		borderWidth: 1,
		borderColor: '#000',
		marginRight: 20,
		marginLeft: 30,
	},
	tableHeader: {
		flexDirection: 'row',
		borderBottomColor: '#bff0fd',
		backgroundColor: '#bff0fd',
		borderBottomWidth: 1,
		alignItems: 'center',
		height: 24,
		textAlign: 'center',
		fontStyle: 'bold',
		flexGrow: 1,
	},
	tableBody: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		borderBottomColor: '#bff0fd',
		borderBottomWidth: 1,
		alignItems: 'center',
		height: 24,
		textAlign: 'center',
		fontStyle: 'bold',
		flexGrow: 1,
	},
	jerseyNumber: {
		width: '20%',
		borderRightColor: '#000',
		borderRightWidth: 1,
		fontSize: 11,
	},
	name: {
		width: '40%',
		borderRightColor: '#000',
		borderRightWidth: 1,
		fontSize: 11,
	},
	score: {
		width: '20%',
		fontSize: 11,
		borderRightColor: '#000',
		borderRightWidth: 1,
	},
	fouls: {
		width: '20%',
		fontSize: 11,
	},
});

const PDFResult = ({ data }) => {
	let dateOfTheMatch = new Date(data.date);
	let month = monthNames[dateOfTheMatch.getMonth()];
	let day = dateOfTheMatch.getDate();
	let year = dateOfTheMatch.getFullYear();

	return (
		<Document>
			<Page style={styles.page} size="LETTER">
				<View style={styles.header}>
					<Text style={styles.headerText}>Facilitator: {data.userName}</Text>
					<Text style={styles.headerText}>
						Date: {`${month} ${day}, ${year}`}
					</Text>
				</View>
				<View style={styles.header}>
					<Text style={styles.headerText}>Event: {data.gameEvent}</Text>
					<Text style={styles.headerText}>
						Time: {`${formatAMPM(dateOfTheMatch)}`}
					</Text>
				</View>
				{/* <View style={styles.spaces}></View> */}
				<View>
					<Text style={styles.textBody}>
						{`${data?.teamOne?.teamName} Scoresheet`}
					</Text>
				</View>
				<PDFTable team={data.teamOne} gameEvent={data.gameEvent} />
				<View>
					<Text style={styles.textBody}>
						{`${data?.teamTwo?.teamName} Scoresheet`}
					</Text>
				</View>
				<PDFTable team={data.teamTwo} gameEvent={data.gameEvent} />
			</Page>
		</Document>
	);
};

export default PDFResult;
