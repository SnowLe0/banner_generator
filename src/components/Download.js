import React, { useContext, useRef, useState } from 'react';

import { ContextApp } from "./Reducer";

import { Button, Grid, RadioGroup, FormControlLabel, Radio, Snackbar, IconButton, Paper } from '@material-ui/core';
import { Close } from "@material-ui/icons";

function downloadURI(uri, name) {
	let link = document.createElement('a');
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
function downloadHTML(width, height, gradient, angle, palette, color, textObj, images) {
	palette = palette.map((val) => `${val.color} ${val.offset * 100}%`).join(', ');
	const background = gradient ? `linear-gradient(${angle}deg,  ${palette})` : color;

	let wrap = document.createElement('div');

	let html = document.createElement('div');
	html.style.cssText = `
		position: relative;
		width: ${width}px;
		height: ${height}px;
		background: ${background};
		overflow: hidden;
	`;

	let text = document.createElement('div');
	text.style.cssText = `
		position: absolute;
		top: ${textObj.y ? textObj.y : 0}px;
		left: ${textObj.x ? textObj.x : 0}px;
		width: ${textObj.width}px;
		height: ${textObj.height}px;
		color: ${textObj.fill};
		font-size: ${textObj.fontSize}px;
		font-weight: ${textObj.fontStyle === 'bold' ? textObj.fontStyle : 'normal'};
		font-style: ${textObj.fontStyle === 'italic' ? textObj.fontStyle : 'normal'};
		word-break: break-word;
		line-height: 1;
		overflow: hidden;
	`;
	text.innerHTML = textObj.text;

	images.forEach((image) => {
		let img = document.createElement('img');
		img.style.cssText = `
			position: absolute;
			top: ${image.y ? image.y : 0}px;
			left: ${image.x ? image.x : 0}px;
			width: ${image.width}px;
			height: ${image.height}px;
		`;
		img.src = image.src;
		html.appendChild(img);
	});



	html.appendChild(text);

	wrap.appendChild(html);
	return wrap.innerHTML;
}


const Download = ({ stage }) => {

	const { state: { angle, gradient, palette, color, sizeView: [width, height], textObj, images } } = useContext(ContextApp);

	const [value, setValue] = useState('json');
	const [open, setOpen] = useState(false);

	const divRef = useRef();

	return (
		<>
			<Paper square>
				<Grid container direction="row" alignItems="center">
					<Grid item>
						<RadioGroup value={value} onChange={(e) => { setValue(e.target.value) }}>
							<FormControlLabel value="json" control={<Radio />} label="JSON" />
							<FormControlLabel value="html" control={<Radio />} label="HTML" />
							<FormControlLabel value="image" control={<Radio />} label="Image" />
						</RadioGroup>
					</Grid>
					<Grid item>
						<Button variant="contained" size="large" onClick={() => {
							switch (value) {
								case 'json':
									navigator.clipboard.writeText(stage.current.toJSON()).then(() => {
										setOpen(true);
									});
									break;
								case 'html':
									navigator.clipboard.writeText(downloadHTML(width, height, gradient, angle, palette, color, textObj, images));
									setOpen(true);
									break;
								case 'image':
									const uri = stage.current.toDataURL();
									downloadURI(uri, 'image.png');
									break;

							}

						}}>Download</Button>
					</Grid>
				</Grid>
			</Paper>
			<div ref={divRef}></div>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				open={open}
				autoHideDuration={1500}
				onClose={(event, reason) => {
					if (reason === 'clickaway') {
						return;
					}

					setOpen(false);
				}}
				message={'Copy to clipboard !!!'}
				action={
					<>
						<IconButton size="small" color="inherit" onClick={(event, reason) => {
							if (reason === 'clickaway') {
								return;
							}

							setOpen(false);
						}}>
							<Close fontSize="small" />
						</IconButton>
					</>
				}
			/>
		</>
	)
}

export default Download;