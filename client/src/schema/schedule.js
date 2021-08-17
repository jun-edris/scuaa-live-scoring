import * as Yup from 'yup';

export const scheduleSchema = Yup.object().shape({
	date: Yup.date().required('Please enter valid date').nullable(),
	teamOne: Yup.string().required('Please select team'),
	teamTwo: Yup.string().required('Please select team'),
});