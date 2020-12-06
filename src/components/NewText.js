import React, { useEffect, useRef } from 'react';
import { Text, Transformer } from 'react-konva';

const NewText = ({ textProps, isSelected, onSelect, onChange }) => {

	const textRef = useRef();
	const trRef = useRef();

	useEffect(() => {

		if (isSelected) {
			trRef.current.nodes([textRef.current]);
			trRef.current.moveToTop();
			textRef.current.moveToTop();
			trRef.current.getLayer().batchDraw();
		}

	}, [isSelected]);

	return (
		<>
			<Text
				onClick={onSelect}
				onTap={onSelect}
				ref={textRef}
				{...textProps}
				draggable
				onDragEnd={(e) => {
					const node = textRef.current;
					onChange({
						...textProps,
						x: node.x(),
						y: node.y(),
					});
				}}
				onTransform={(e) => {
					const node = textRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					node.scaleX(1);
					node.scaleY(1);
					onChange({
						...textProps,
						x: node.x(),
						y: node.y(),
						width: Math.max(5, node.width() * scaleX),
						height: Math.max(5, node.height() * scaleY),
					});
				}}
			/>
			{isSelected && (
				<Transformer
					ref={trRef}
					boundBoxFunc={(oldBox, newBox) => {
						if (newBox.width < 5 || newBox.height < 5) {
							return oldBox;
						}
						return newBox;
					}}
				/>
			)}
		</>
	);
};

export default NewText;