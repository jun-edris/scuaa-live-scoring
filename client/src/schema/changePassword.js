import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
	oldPassword: Yup.string().required('Old Password is required'),
	newPassword: Yup.string().required('New Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('newPassword')], 'Passwords must match')
		.required('Confirm your password'),
});
