import { FormHelperText, TextField } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';

export const InputField = ({ type, autoComplete, label, ...props }) => {
	const [field, meta] = useField(props.name);
	const errorText = meta.error && meta.touched ? meta.error : '';

	return (
		<>
			<TextField
				name={field.name}
				{...field}
				label={label}
				variant="outlined"
				fullWidth
				error={!!errorText}
				autoComplete={autoComplete}
				type={type}
				onChange={(e) => {
					field.onChange(props.name)(e.target.value);
				}}
				onKeyPress={
					type === 'text'
						? (evt) => {
								const alpha = /^[a-zA-Z\s]*$/;
								evt.key.replace(alpha, '') && evt.preventDefault();
						  }
						: type === 'number'
						? (evt) =>
								['e', 'E', '+', '-', '.'].includes(evt.key) &&
								evt.preventDefault()
						: null
				}
				{...props}
			/>
			<FormHelperText error>{errorText}</FormHelperText>
		</>
	);
};
