import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';
import {Grid} from '@mui/material';

import Button from '@mui/material/Button';

const LetterContainer = (props) => {
    const letter = props.letter;

    return (
    <Button spacing={{xs: 2, md: 1}} sx={{
        border: '2px dashed black',
        height: 32, 
        width: 32,
        padding:6, 
        
        }}>{letter}
    </Button>
    )
}

const KeyboardKeys = () => {

    return (
        <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(26)).map((_, index) => (
            <Grid item xs={6} sm={4} md={1} key={index}>
            <LetterContainer letter={letters[index]}/>
            </Grid>
        ))}
        </Grid>
    )
}

export default KeyboardKeys;