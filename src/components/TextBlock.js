import React, { useContext } from 'react';

import { ContextApp } from "./Reducer";
import { SketchPicker } from 'react-color';

import { TextField, Grid, FormControl, InputLabel, Select, Typography } from '@material-ui/core';

const TextBlock = () => {

	const { state: { textObj }, dispatch } = useContext(ContextApp);

	return (
		<div>
			<Grid container alignItems="center" spacing={2}>
				<Grid item>
					<TextField
						label="Text"
						type="text"
						defaultValue={textObj.text}
						size="small"
						variant="outlined"
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => {
							dispatch({ type: 'setTextObj', value: { ...textObj, text: e.target.value } });
						}}
					/>
				</Grid>
				<Grid item>
					<TextField
						label="FontSize"
						type="number"
						defaultValue={textObj.fontSize}
						size="small"
						variant="outlined"
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => {
							dispatch({ type: 'setTextObj', value: { ...textObj, fontSize: +e.target.value } });
						}}
					/>
				</Grid>
				<Grid item>
					<Typography>FontColor</Typography>
					<SketchPicker color={textObj.fill} onChange={(color) => { const { r, g, b, a } = color.rgb; dispatch({ type: 'setTextObj', value: { ...textObj, fill: `rgba(${r}, ${g}, ${b}, ${a})` } }) }} />
				</Grid>
				<Grid item>
					<FormControl variant="outlined">
						<InputLabel>FontStyle</InputLabel>
						<Select
							native
							value={textObj.fontStyle}
							onChange={(e) => { dispatch({ type: 'setTextObj', value: { ...textObj, fontStyle: e.target.value } }); }}
							label="FontStyle"
						>
							<option value='bold'>Bold</option>
							<option value='normal'>Normal</option>
							<option value='italic'>Italic</option>
						</Select>
					</FormControl>
				</Grid>

			</Grid>
		</div>
	)
}

export default TextBlock;