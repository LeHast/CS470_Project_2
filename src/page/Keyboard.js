import React, {Fragment} from 'react';
import Box from '@mui/material/Box';
import { Grid} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

import {
    keyboardBoxSizes,
    keyboardRowsHGap} from "../utils/sizes";

import boxStyleVariants from '../utils/keyboardAndGuessAreaBoxTypes';

const KeyboardLetterBox = (props) => {

    const {keyAttributes} = props;
    const {keySizeW, keySizeH } = props;

    // console.log(`keyboardBoxSizes ${JSON.stringify(keyAttributes)}`);

    return (
        <Box sx={{
            ...keySizeW,
            ...keySizeH,
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
            <Grid  container columns={10}  // hard-coded value -- this is the number of demo keys
                sx={{
                    width: 5 * keyboardBoxSizes.width + (KeysRow1Num - 1) * keyboardRowsHGap + 300,
                }}>
                {
                    keyboard.slice(0,10).map((keyAttributes, idx) =>
                        <Grid item
                            key={idx}
                            xs={1}
                            sx={{
                                mb: 1,
                                paddingTop: 4,
                            }}
                            onClick={() => onClickCallback(keyAttributes)}>
                            <KeyboardLetterBox keyAttributes={keyAttributes} 
                                keySizeW={{width: 90}}
                                keySizeH={{height: 60}}
                            />
                        </Grid>
                    )
                }
            </Grid>

            <Grid  container columns={10}  // hard-coded value -- this is the number of demo keys
                sx={{
                    width: 5 * keyboardBoxSizes.width + (KeysRow1Num - 1) * keyboardRowsHGap + 300,
                }}>
                {
                    keyboard.slice(10,19).map((keyAttributes, idx) =>
                        <Grid item
                            key={idx}
                            xs={1}
                            sx={{
                                mb: 1,
                                paddingLeft: 4,
                            }}
                            onClick={() => onClickCallback(keyAttributes)}>
                            <KeyboardLetterBox 
                                keyAttributes={keyAttributes}
                                keySizeW={{width: 90}}
                                keySizeH={{height: 60}}
                            />
                        </Grid>
                    )
                }
            </Grid>

            <Grid  container columns={10}  // hard-coded value -- this is the number of demo keys
                sx={{
                    width: 5 * keyboardBoxSizes.width + (KeysRow1Num - 1) * keyboardRowsHGap + 300,
                }}>
                {
                    keyboard.slice(19,KeysRow1Num).map((keyAttributes, idx) =>
                        <Grid item
                            key={idx}
                            xs={1}
                            sx={{
                                mb: 1,
                                paddingLeft: 4,
                            }}
                            onClick={() => onClickCallback(keyAttributes)}>
                            <KeyboardLetterBox 
                                keyAttributes={keyAttributes}
                                keySizeW={{width: 90}}
                                keySizeH={{height: 60}}
                            />
                        </Grid>
                    )
                }
            </Grid>


        </Fragment>
    )
}

export default Keyboard;