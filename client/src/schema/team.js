import * as Yup from 'yup';

export const teamSchema = Yup.object().shape({
	teamName: Yup.string().required('Enter team name'),
	players: Yup.array().of(
		Yup.object().shape({
			name: Yup.string().required('Enter player name'),
			jerseyNumber: Yup.number().required('Enter Jersey number'),
		})
	),
});