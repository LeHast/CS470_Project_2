import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';

import GitHubIcon from '@mui/icons-material/GitHub';
import BookIcon from '@mui/icons-material/Book';

const MessageCenter = (props) => {
    const { msg } = props;

    return (
        <Fragment>
            <Typography variant='h7' 
                sx={{ 
                    color: '#9FA6AD',
                    fontSize: 16,
                }}
            >
            <BookIcon fontSize='small'/>CS 470 <br/>
            <GitHubIcon fontSize='small' href='https://github.com/LeHast' />{msg} <br/>


            </Typography>
        </Fragment>
    )
}

export default MessageCenter;