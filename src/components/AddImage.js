import React, { useContext, useRef } from 'react';

import { ContextApp } from "./Reducer";

import { TextField, Button, Grid } from '@material-ui/core';

const AddImage = () => {

    const { state: { images }, dispatch } = useContext(ContextApp);

    const imageURLRef = useRef();

    return (
        <div>
            <Grid container alignItems="center">
                <Grid item>
                    <TextField
                        label="ImageURL / DataURI"
                        type="text"
                        size="small"
                        variant="outlined"
                        InputProps={{
                            inputRef: imageURLRef,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" size="large" onClick={() => { dispatch({ type: 'setImages', value: [...images, { src: imageURLRef.current.value }] }); imageURLRef.current.value = ''; }}>Add Image</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddImage;