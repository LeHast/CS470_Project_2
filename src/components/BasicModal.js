import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { type } from '@testing-library/user-event/dist/type';

const refreshPage = () => {
  window.location.reload();
}

const BasicModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const { toOpen } = props;
    const { toWin } = props;
    let DisplayOverlay ='';
    let displayButtonColor ='';

    if (toWin){
      DisplayOverlay = 'WIN!';
      displayButtonColor = 'success';
    }else{
      DisplayOverlay = 'LOSE!'
      displayButtonColor = 'Danger';
    }
    return(
      <React.Fragment>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={toOpen}
          //onClose={() => setOpen(false)}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 1,
              boxShadow: "lg",
              backgroundColor: "#0A2744"
            }}
          >
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              fontWeight="lg"
              mb={1} 
              sx={{
                fontSize: '128px',
                color: '#ffffff',
                backgroundColor: '#0A2744'}
                }>
              {DisplayOverlay}
            </Typography>
            <Button 
              onClick={() => refreshPage()}
              color='danger'
              type='submit'
            > Play Again 
            </Button>
          </Sheet>
        </Modal>
      </React.Fragment>
    );
};
  
export default BasicModal;
  