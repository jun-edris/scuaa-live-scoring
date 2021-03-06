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
		width: '10%',
		borderRightColor: '#000',
		borderRightWidth: 1,
		fontSize: 11,
	},
	name: {
		width: '10%',
		borderRightColor: '#000',
		borderRightWidth: 1,
		fontSize: 11,
	},
	score: {
		width: '5%',
		fontSize: 11,
	},
	fouls: {
		width: '5%',
		fontSize: 11,
		borderRightColor: '#000',
		borderRightWidth: 1,
	},
	cards: {
		width: '5%',
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
const PDFVolleyballTable = ({ gameEvent, team }) => {
	let teamScore = team?.players?.reduce((prev, curr) => prev + curr.scores, 0);
	return (
		<>
			<View style={styles.tableContainer}>
				<View style={styles.tableHeader}>
					<Text style={styles.jerseyNumber}>Jersey No.</Text>
					<Text style={styles.name}>Player Name</Text>
					{gameEvent === 'basketball' && (
						<>
							<Text style={styles.fouls}>Fouls</Text>
							<Text style={styles.fouls}>Assists</Text>
							<Text style={styles.fouls}>Rebound</Text>
							<Text style={styles.fouls}>Steal</Text>
							<Text style={styles.fouls}>Block</Text>
							<Text style={styles.fouls}>Fouls</Text>
						</>
					)}
					{gameEvent === 'volleyball' && (
						<>
							<Text style={styles.fouls}>Fouls</Text>
							<Text style={styles.fouls}>Ace</Text>
							<Text style={styles.fouls}>Spike</Text>
							<Text style={styles.fouls}>Digs</Text>
							<Text style={styles.fouls}>Save Ball</Text>
							<Text style={styles.fouls}>Block</Text>
						</>
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
							<>
								<Text style={styles.fouls}>{player?.fouls}</Text>
								<Text style={styles.fouls}>{player?.assists}</Text>
								<Text style={styles.fouls}>{player?.rebounds}</Text>
								<Text style={styles.fouls}>{player?.steal}</Text>
								<Text style={styles.fouls}>{player?.block}</Text>
								<Text style={styles.fouls}>{player?.fouls}</Text>
							</>
						)}
						{gameEvent === 'volleyball' && (
							<>
								<Text style={styles.fouls}>{player?.ace}</Text>
								<Text style={styles.fouls}>{player?.spike}</Text>
								<Text style={styles.fouls}>{player?.digs}</Text>
								<Text style={styles.fouls}>{player?.saveBall}</Text>
								<Text style={styles.fouls}>{player?.block}</Text>
							</>
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

export default PDFVolleyballTable;
