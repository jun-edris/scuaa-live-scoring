import React, { useContext, useState } from 'react';
import { Dialog, DialogContent, Grid, Button } from '@material-ui/core';
import { FetchContext } from '../../context/FetchContext';
import { AuthContext } from '../../context/AuthContext';
import CustomButton from './CustomButton';

const PopupImageUpload = ({
	openAddImageAlert,
	handleClose,
	inputEl,
	team,
}) => {
	const [newImage, setNewImage] = useState('');
	const fetchContext = useContext(FetchContext);
	const authContext = useContext(AuthContext);

	const handlePhoto = (e) => {
		setNewImage(e.target.files[0]);
	};

	const handleSubmit = async (e, team) => {
		try {
			e.preventDefault();
			const formData = new FormData();
			formData.append('photo', newImage);

			await fetchContext.authAxios
				.patch(
					`/${authContext.authState.userInfo.role}/upload-image/${team._id}`,
					formData
				)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error?.response?.message);
		}
	};

	return (
		<>
			<Dialog open={openAddImageAlert} onClose={handleClose}>
				<DialogContent style={{ height: '150px' }}>
					<form
						onSubmit={(e) => handleSubmit(e, team)}
						encType="multipart/form-data"
					>
						<Grid
							container
							direction="column"
							alignItems="center"
							justifyContent="space-between"
							spacing={4}
						>
							<Grid item>
								<input
									type="file"
									accept=".png"
									name="photo"
									id="contained-button-file"
									// className={classes.input}
									ref={inputEl}
									onChange={handlePhoto}
								/>
							</Grid>
							<Grid item>
								<Grid container alignItems="center" spacing={2}>
									<Grid item>
										<Button type="submit" color="primary" variant="contained">
											Submit
										</Button>
									</Grid>
									<Grid item>
										<CustomButton
											type="button"
											color="primary"
											variant="contained"
											title="Cancel"
											onClick={handleClose}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default PopupImageUpload;
