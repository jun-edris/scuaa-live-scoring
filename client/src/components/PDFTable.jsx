import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	tableContainer: {
		display: 'flex',
		flexDirection: 'column',
		// flexWrap: 'wrap',
		marginTop: 5,
		borderWidth: 1,
		borderColor: '#000',
		// marginRight: 20,
		// marginLeft: 30,
		flexGrow: 1,
		height: 'auto',
	},
	tableHeader: {
		display: 'flex',
		flexDirection: 'row',
		// justifyContent: 'space-between',
		backgroundColor: '#bff0fd',
		height: 24,
		fontStyle: 'bold',
		fontSize: 11,
		paddingLeft: 10,
		paddingRight: 10,
		width: '100%',
		flexGrow: 1,
	},
	tableBody: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 24,
		fontStyle: 'bold',
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 11,
		flexGrow: 1,
	},
	tableCell: {
		flex: 0.08,
	},
	jerseyNumber: {
		width: '10%',
		// borderRightColor: '#000',
		// borderRightWidth: 1,
	},
	name: {
		// borderRightColor: '#000',
		// borderRightWidth: 1,
		width: '15%',
		// textAlign: 'center',
	},
	// score: {
	// 	fontSize: 11,
	// },
	fouls: {
		width: '12%',
		// textAlign: 'center',
		// borderRightColor: '#000',
		// borderRightWidth: 1,
	},
	// cards: {
	// 	fontSize: 11,
	// 	// borderRightColor: '#000',
	// 	// borderRightWidth: 1,
	// },
	footer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		textAlign: 'center',
		height: 24,
		flexGrow: 1,
		fontSize: 11,
	},
	total: {
		width: '80%',
		textAlign: 'right',
		borderRightColor: '#000',
		borderRightWidth: 1,
		paddingRight: 8,
	},
	overAllScore: {
		width: '12%',
	},
	textBody: {
		marginTop: 50,
		marginLeft: 30,
		fontSize: 12,
	},
});
const PDFTable = ({ set, gameEvent, team }) => {
	let teamScore = team?.players?.reduce((prev, curr) => prev + curr.scores, 0);
	return (
		<>
			<Text style={styles.textBody}>Set {set?.no}</Text>
			<View style={styles.tableContainer} wrap={false}>
				<View style={styles.tableHeader}>
					<Text style={styles.jerseyNumber}>Jersey No.</Text>
					<Text style={styles.name}>Player Name</Text>
					{gameEvent === 'basketball' && (
						<>
							<Text style={styles.fouls}>Assists</Text>
							<Text style={styles.fouls}>Rebound</Text>
							<Text style={styles.fouls}>Steal</Text>
							<Text style={styles.fouls}>Block</Text>
							<Text style={styles.fouls}>Fouls</Text>
						</>
					)}
					{gameEvent === 'volleyball' && (
						<>
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

export default PDFTable;
