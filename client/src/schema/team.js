import * as Yup from 'yup';

export const basketballTeamSchema = Yup.object().shape({
	teamName: Yup.string().required('Enter team name'),
	players: Yup.array()
		.of(
			Yup.object().shape({
				name: Yup.string().required('Enter player name'),
				jerseyNumber: Yup.number().required('Enter Jersey number'),
			})
		)
		.length(15, 'Create 15 players'),
});

export const volleyballTeamSchema = Yup.object().shape({
	teamName: Yup.string().required('Enter team name'),
	players: Yup.array()
		.of(
			Yup.object().shape({
				name: Yup.string().required('Enter player name'),
				jerseyNumber: Yup.number().required('Enter Jersey number'),
			})
		)
		.length(12, 'Create 12 players'),
});

export const soccerTeamSchema = Yup.object().shape({
	teamName: Yup.string().required('Enter team name'),
	players: Yup.array()
		.of(
			Yup.object().shape({
				name: Yup.string().required('Enter player name'),
				jerseyNumber: Yup.number().required('Enter Jersey number'),
			})
		)
		.length(18, 'Create 18 players'),
});
