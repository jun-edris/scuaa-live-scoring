import { Select, FormHelperText } from '@material-ui/core';
import { useField } from 'formik';
const GameSelection = ({ children, type, ...props }) => {
	const [field, meta] = useField(props);
	const errorText = meta.error && meta.touched ? meta.error : '';
	return (
		<>
			<Select {...field} fullWidth error={!!errorText}>
				{children}
			</Select>
			<FormHelperText error>{errorText}</FormHelperText>
		</>
	);
};

export default GameSelection;
