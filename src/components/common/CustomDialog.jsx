import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({ open, closeDialog, title, children }) {

    const handleClose = () => {
        open && closeDialog(false);
    };

    return (
        <Dialog open={open} TransitionComponent={Transition} onClose={handleClose} maxWidth='xl' fullWidth className='custom-dialog'>
            <DialogTitle sx={{justifyContent:"space-between",display:"flex"}}>
                {title}
                <IconButton aria-label="close" onClick={handleClose} sx={{maxWidth:"35px",maxHeight:"35px"}}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
}
