import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const TopBanner = (props) => {

    return (
        <Fragment>
            <Box 
            sx={{
                    mt: 2, 
                    mb: 2,

                }} >
            <Typography variant='h5' 
                sx={{
                    fontSize: '128px',
                    color: '#ffffff',
                    fontWeight: 'bold',
                }}>
                Wordle
            </Typography>
            </Box>
        </Fragment>
    )
}

export default TopBanner;