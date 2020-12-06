import React, { useContext } from 'react';

import { ContextApp } from "./Reducer";

import { GradientPicker, AnglePicker } from "react-linear-gradient-picker";
import { SketchPicker } from 'react-color';
import { Typography } from '@material-ui/core';

const rgbToRgba = (rgb, a = 1) => rgb.replace('rgb(', 'rgba(').replace(')', `, ${a})`);
const WrappedSketchPicker = ({ onSelect, ...rest }) => (
    <SketchPicker {...rest}
        color={rgbToRgba(rest.color, rest.opacity)}
        onChange={c => {
            const { r, g, b, a } = c.rgb;
            onSelect(`rgba(${r}, ${g}, ${b}, ${a})`);
        }}
    />
);

const Picker = () => {

    const { state: { palette, color, gradient, angle }, dispatch } = useContext(ContextApp);

    return (
        <>
            { gradient ?
                <>
                    <GradientPicker
                        width={320}
                        paletteHeight={32}
                        palette={palette}
                        onPaletteChange={(palette) => { dispatch({ type: 'setPalette', value: palette }) }}
                    >
                        <WrappedSketchPicker />
                    </GradientPicker>
                    <Typography>Angle: </Typography>
                    <AnglePicker angle={angle} setAngle={(angle) => { dispatch({ type: 'setAngle', value: angle }); }} />
                </>
                :
                <SketchPicker color={color} onChange={(color) => { const { r, g, b, a } = color.rgb; dispatch({ type: 'setColor', value: `rgba(${r}, ${g}, ${b}, ${a})` }) }} />
            }
        </>
    );
}

export default Picker;