import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({ open, closeDialog, title, children }) {

    const handleClose = () => {
        open && closeDialog(false);
    };

    return (
        <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
}
