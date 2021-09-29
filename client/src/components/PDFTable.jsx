import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
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
		flexWrap: 'wrap',
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
	},
	fouls: {
		width: '20%',
		fontSize: 11,
		borderRightColor: '#000',
		borderRightWidth: 1,
	},
	cards: {
		width: '10%',
		fontSize: 11,
		borderRightColor: '#000',
		borderRightWidth: 1,
	},
	footer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		textAlign: 'center',
		height: 24,
		flexGrow: 1,
	},
	total: {
		width: '80%',
		textAlign: 'right',
		borderRightColor: '#000',
		borderRightWidth: 1,
		paddingRight: 8,
		fontSize: 11,
	},
	overAllScore: {
		width: '20%',
		fontSize: 11,
	},
});
const PDFTable = ({ gameEvent, team }) => {
	let teamScore = team?.players?.reduce((prev, curr) => prev + curr.scores, 0);
	return (
		<>
			<View style={styles.tableContainer}>
				<View style={styles.tableHeader}>
					<Text style={styles.jerseyNumber}>Jersey No.</Text>
					<Text style={styles.name}>Player Name</Text>
					{gameEvent === 'basketball' && (
						<Text style={styles.fouls}>Fouls</Text>
					)}
					{gameEvent === 'soccer' && (
						<>
							<Text style={styles.cards}>Yellow Cards</Text>
							<Text style={styles.cards}>Red Cards</Text>
						</>
					)}
					<Text style={styles.score}>Score</Text>
				</View>
				{team?.players.map((player, index) => (
					<View style={styles.tableBody} key={index}>
						<Text style={styles.jerseyNumber}>{player?.jerseyNumber}</Text>
						<Text style={styles.name}>{player?.name}</Text>
						{gameEvent === 'basketball' && (
							<Text style={styles.fouls}>{player?.fouls}</Text>
						)}
						{gameEvent === 'soccer' && (
							<>
								<Text style={styles.cards}>{player?.card?.yellow}</Text>
								<Text style={styles.cards}>{player?.card?.red}</Text>
							</>
						)}
						<Text style={styles.score}>{player?.scores}</Text>
					</View>
				))}
				<View style={styles.footer}>
					<Text style={styles.total}>TOTAL SCORE</Text>
					<Text style={styles.overAllScore}>{teamScore}</Text>
				</View>
			</View>
		</>
	);
};

export default PDFTable;
