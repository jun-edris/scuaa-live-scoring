import {
	FormHelperText,
	Checkbox,
	FormControlLabel,
	FormGroup,
	FormLabel,
	FormControl,
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

const CheckboxWrapper = ({ name, label, legend, options }) => {
	const { setFieldContext } = useFormikContext();
	const [field, meta] = useField(name);

	const handleChange = (evt) => {
		const { checked } = evt.target;
		setFieldContext(name, checked);
	};

	const configCheckbox = {
		...field,
		onchange: handleChange,
	};

	const configFormControl = {};
	if (meta && meta.touched && meta.error) {
		configFormControl.error = true;
	}

	return (
		<div>
			<FormControl {...configFormControl}>
				<FormLabel component="legend">{legend}</FormLabel>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox {...configCheckbox} />}
						label={label}
					/>
				</FormGroup>
			</FormControl>
		</div>
	);
};

export default CheckboxWrapper;
