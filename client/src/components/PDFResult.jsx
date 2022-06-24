import React from 'react';
import { Document, Page, StyleSheet, View, Text } from '@react-pdf/renderer';
import { monthNames } from './../constants/month';
import { formatAMPM } from './../mappers/formatTime';
import PDFTable from './PDFTable';

const styles = StyleSheet.create({
	page: {
		backgroundColor: '#ffffff',
		padding: 30,
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
		fontSize: 12,
	},
	header: {
		marginTop: 5,
		marginRight: 20,

		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	spaces: {
		marginTop: 20,
	},
	footer: {
		marginTop: 20,
		marginBottom: 30,
	},
	footerHeadingText: {
		marginBottom: 15,
		fontSize: 12,
	},
	footerText: {
		textAlign: 'center',
		fontSize: 12,
	},
	signatureContainer: {
		marginTop: 15,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	signature: {
		borderTopWidth: 1,
		borderTopColor: '#000',
		width: 150,
	},
});

const PDFResult = ({ data, setM }) => {
	let dateOfTheMatch = new Date(data.date);
	let month = monthNames[dateOfTheMatch.getMonth()];
	let day = dateOfTheMatch.getDate();
	let year = dateOfTheMatch.getFullYear();

	return (
		<Document>
			<Page style={styles.page} size="LEGAL" orientation="landscape">
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
					<Text style={styles.textBody} break>
						{`${data?.teamOne?.teamName} Scoresheet`}
					</Text>
					{/* <Text style={styles.textBody}>{JSON.stringify(setM)}</Text> */}
				</View>
				{setM && data?.gameEvent === 'volleyball' ? (
					<>
						{setM?.sets?.map((set, index) => (
							<PDFTable
								set={set}
								team={set.teamOne}
								gameEvent={data.gameEvent}
							/>
						))}
					</>
				) : (
					<PDFTable team={data.teamOne} gameEvent={data.gameEvent} />
				)}
				<View>
					<Text style={styles.textBody} break>
						{`${data?.teamTwo?.teamName} Scoresheet`}
					</Text>
				</View>
				{setM && data?.gameEvent === 'volleyball' ? (
					<>
						{setM?.sets?.map((set, index) => (
							<PDFTable
								set={set}
								team={set.teamTwo}
								gameEvent={data.gameEvent}
							/>
						))}
					</>
				) : (
					<PDFTable team={data.teamTwo} gameEvent={data.gameEvent} />
				)}

				<View style={styles.spaces}></View>
				<View style={styles.footer}>
					<Text style={styles.footerHeadingText}>Verified: </Text>
					<View style={styles.signatureContainer}>
						<View style={styles.signature}>
							<Text style={styles.footerText}>
								{data?.teamOne?.teamName} Coach
							</Text>
						</View>
						<View style={styles.signature}>
							<Text style={styles.footerText}>
								{data?.teamTwo?.teamName} Coach
							</Text>
						</View>
					</View>
					<View style={styles.signatureContainer}>
						<View style={styles.signature}>
							<Text style={styles.footerText}>SCUAA Coordinator</Text>
						</View>
					</View>
				</View>
			</Page>
		</Document>
	);
};

export default PDFResult;
