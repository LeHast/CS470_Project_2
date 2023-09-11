import React, {Fragment} from 'react';
import Box from '@mui/material/Box';
import { Grid} from "@mui/material";

import {
    keyboardBoxSizes,
    keyboardRowsHGap} from "../utils/sizes";

import boxStyleVariants from '../utils/keyboardAndGuessAreaBoxTypes';

const KeyboardLetterBox = (props) => {

    const {keyAttributes} = props;

    // console.log(`keyboardBoxSizes ${JSON.stringify(keyAttributes)}`);

    return (
        <Box sx={{
            ...keyboardBoxSizes,
            border: 1,
            ...keyAttributes,
            textAlign: 'center',
            fontSize: 28,
            fontWeight: 'bold',
        }}>
            {keyAttributes.letter}
        </Box>
    )
}

const Keyboard = (props) => {

    const {keyboard, onClickCallback} = props;
    const {KeysRow1Num} = props;
    const {KeysRow2Num} = props;
    const {KeysRow3Num} = props;

    //console.log(keyboard);

    return (
        <Fragment>
            <Grid  container columns={11}  // hard-coded value -- this is the number of demo keys
                sx={{
                    width: 5 * keyboardBoxSizes.width + (KeysRow1Num - 1) * keyboardRowsHGap + 200,
                }}>
                {
                    keyboard.map((keyAttributes, idx) =>
                        <Grid item
                            key={idx}
                            xs={1}
                            sx={{mb: 1}}
                            onClick={() => onClickCallback(keyAttributes)}>
                            <KeyboardLetterBox keyAttributes={keyAttributes}/>
                        </Grid>
                    )
                }
            </Grid>
        </Fragment>
    )
}

export default Keyboard;