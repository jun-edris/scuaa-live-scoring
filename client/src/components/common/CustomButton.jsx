import { Button } from '@material-ui/core';
import React from 'react';
// import useStyles from './../../styles/customBtn';

const CustomButton = ({ type, title, onClick, Icon, ...props }) => {
	return (
		<>
			<Button type={type} startIcon={Icon} onClick={onClick} {...props}>
				{title}
			</Button>
		</>
	);
};

export default CustomButton;
