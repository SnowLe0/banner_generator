import React, { useEffect, useRef, useState } from 'react';
import { Image, Transformer } from 'react-konva';

const NewImage = ({ imageProps, isSelected, onSelect, onChange }) => {

	const [image, setImage] = useState(null);
	const imageRef = useRef();
	const trRef = useRef();

	useEffect(() => {

		const handleLoad = () => {
			setImage(newImage);
		};

		let newImage = new window.Image();
		newImage.addEventListener('load', handleLoad);
		newImage.src = imageProps.src;
		newImage.crossOrigin = 'anonymous';

		return (() => {
			newImage.removeEventListener('load', handleLoad)
		});

	}, [imageProps.src]);

	useEffect(() => {

		if (isSelected) {
			trRef.current.nodes([imageRef.current]);
			trRef.current.moveToTop();
			imageRef.current.moveToTop();
			trRef.current.getLayer().batchDraw();
		}

	}, [isSelected]);

	return (
		<>
			<Image
				onClick={onSelect}
				onTap={onSelect}
				ref={imageRef}
				image={image}
				{...imageProps}
				draggable
				onDragEnd={(e) => {
					const node = imageRef.current;

					onChange({
						...imageProps,
						x: node.x(),
						y: node.y(),
					});
				}}
				onTransformEnd={(e) => {
					const node = imageRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					node.scaleX(1);
					node.scaleY(1);
					onChange({
						...imageProps,
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

export default NewImage;