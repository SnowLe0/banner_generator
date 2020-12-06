import React, { useReducer, useRef } from 'react';

import { ContextApp, initialState, reducer } from "./Reducer";

import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid } from "@material-ui/core";

import View from './View';
import Picker from './Picker';
import SizeView from './SizeView';
import PaletteSwitch from './PaletteSwitch';
import AddImage from './AddImage';
import TextBlock from './TextBlock';
import Download from './Download';

const Layout = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const stageRef = useRef();

    return (
        <>
            <ContextApp.Provider value={{ state, dispatch }}>
                <View innerRef={stageRef} />
                <Accordion>
                    <AccordionSummary>
                        <Typography>Size</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SizeView />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <Typography>Background</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="column" alignItems="flex-start">
                            <Grid item>
                                <PaletteSwitch />
                            </Grid>
                            <Grid container alignItems="center">
                                <Picker />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <Typography>Image</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AddImage />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <Typography>Text</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextBlock />
                    </AccordionDetails>
                </Accordion>
                <Download stage={stageRef} />
            </ContextApp.Provider>
        </>
    );
}

export default Layout;