import { Dialog } from "@mui/material";
import React from "react";
import Slide from "@mui/material/Slide";

// tst
export function BasicModal({ open, close, children, fullScreen, maxWidth }) {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });
  return (
    <div>
      <Dialog
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
        open={open}
        onClose={close}
        fullScreen={fullScreen}
        maxWidth={maxWidth}
      >
        {children}
      </Dialog>
    </div>
  );
}
