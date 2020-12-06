import React, { useRef, useContext } from 'react';

import { ContextApp } from "./Reducer";

import { TextField, InputAdornment, Grid } from '@material-ui/core';
import { Clear } from "@material-ui/icons";

const SizeView = () => {

    const { state: { sizeView: [width, height] }, dispatch } = useContext(ContextApp);

    const widthRef = useRef();
    const heightRef = useRef();

    return (
        <Grid container alignItems="center">
            <Grid item>
                <TextField
                    label="Width"
                    type="number"
                    size="small"
                    variant="outlined"
                    defaultValue={width}
                    InputProps={{
                        inputRef: widthRef,
                        endAdornment: <InputAdornment position="end">Px</InputAdornment>,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        dispatch({ type: 'setSizeView', value: [+e.target.value, +heightRef.current.value] });
                    }}
                />
            </Grid>
            <Grid item>
                <Clear />
            </Grid>
            <Grid item>
                <TextField
                    label="Height"
                    type="number"
                    size="small"
                    variant="outlined"
                    defaultValue={height}
                    InputProps={{
                        inputRef: heightRef,
                        endAdornment: <InputAdornment position="end">Px</InputAdornment>,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        dispatch({ type: 'setSizeView', value: [+widthRef.current.value, +e.target.value] });
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default SizeView;