import React, { useContext } from 'react';

import { ContextApp } from './Reducer';

import { withStyles, Switch, Typography, Grid } from '@material-ui/core';

const AntSwitch = withStyles((theme) => ({
	root: {
		width: 36,
		height: 18,
		padding: 0,
		display: 'flex',
	},
	switchBase: {
		padding: 3,
		color: theme.palette.primary.main,
		'&$checked': {
			transform: 'translateX(18px)',
			color: theme.palette.grey[100],
			'& + $track': {
				opacity: 1,
				backgroundColor: theme.palette.primary.main,
			},
		},
	},
	thumb: {
		width: 12,
		height: 12,
		boxShadow: 'none',
	},
	track: {
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: theme.palette.grey[100],
	},
	checked: {},
}))(Switch);


const PaletteSwitch = () => {

	const { state: { gradient }, dispatch } = useContext(ContextApp);

	return (
		<Typography component="div">
			<Grid container alignItems="center" >
				<Grid item>Color</Grid>
				<Grid item>
					<AntSwitch onChange={(event) => { dispatch({ type: 'togglePicker', value: !gradient }); }} checked={gradient} />
				</Grid>
				<Grid item>Gradient</Grid>
			</Grid>
		</Typography>
	);
}

export default PaletteSwitch;