import React, { useState, useContext } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

import { ContextApp } from './Reducer';

import NewImage from './NewImage';
import NewText from './NewText';

import './styles/canvas.css';

const View = ({ innerRef }) => {

	const { state: { palette, color, gradient, angle, sizeView: [width, height], images, textObj }, dispatch } = useContext(ContextApp);

	const [selectedId, selectImage] = useState(null);
	const [selectedText, selectText] = useState(false);

	const checkDeselect = (e) => {
		const clickedOnEmpty = e.target === e.target.getStage().children[0].children[0];
		if (clickedOnEmpty) {
			selectImage(null);
			selectText(false);
		}
	};

	return (
		<Stage
			className="stage"
			ref={innerRef}
			width={width}
			height={height}
			onMouseDown={checkDeselect}
			onTouchStart={checkDeselect}
		>
			<Layer>
				{gradient ?
					<Rect
						width={width}
						height={height}
						fillLinearGradientStartPoint={{ x: width / 2 + (width / 2) * Math.cos((Math.PI * (angle + 90)) / 180), y: height / 2 + (height / 2) * Math.sin((Math.PI * (angle + 90)) / 180) }}
						fillLinearGradientEndPoint={{ x: width / 2 + (width / 2) * Math.cos((Math.PI * (angle - 90)) / 180), y: height / 2 + (height / 2) * Math.sin((Math.PI * (angle - 90)) / 180) }}
						fillLinearGradientColorStops={palette.reduce((prev, v) => { prev.push(v.offset, v.color); return prev; }, [])}
					/>
					:
					<Rect
						width={width}
						height={height}
						fillLinearGradientStartPoint={{ x: 0, y: 0 }}
						fillLinearGradientEndPoint={{ x: width, y: height }}
						fillLinearGradientColorStops={['0', color, '1', color]}
					/>
				}
				{
					images.map((image, i) => (
						<NewImage
							key={i}
							imageProps={image}
							isSelected={i === selectedId}
							onSelect={() => {
								selectImage(i);
							}}
							onChange={(newAttrs) => {
								const imgs = images.slice();
								imgs[i] = newAttrs;
								dispatch({ type: 'setImages', value: imgs });
							}}
						/>
					))
				}
				<NewText
					textProps={textObj}
					isSelected={selectedText}
					onSelect={() => {
						selectText(!selectedText)
					}}
					onChange={(newAttrs) => {
						dispatch({ type: 'setTextObj', value: newAttrs });
					}} />
			</Layer>
		</Stage>
	);
};

export default View;