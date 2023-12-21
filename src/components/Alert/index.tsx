import React, { useState, useEffect } from 'react';
import { primary } from '@/styles/colors';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';
import { createRoot } from 'react-dom/client';
import { useTheme } from '@mui/material/styles';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  }
);

export interface WarningProps {
  content: string;
  color: AlertColor;
}

function WarningBar(props: WarningProps) {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }, []);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      //   onClose={() => setOpen(false)}
      key={'top-center-warning'}
      sx={{ zIndex: theme.zIndex.snackbar + 100 }}
    >
      <Alert
        sx={{
          borderRadius: '0',
          '&.MuiAlert-filledSuccess': { backgroundColor: primary },
        }}
        icon={false}
        color={props?.color}
      >
        {props?.content ?? ''}
      </Alert>
    </Snackbar>
  );
}

export function callAlert(props: WarningProps) {
  const warningDom = document.createElement('div');
  document.body.appendChild(warningDom);
  warningDom.id = 'warning-window';
  warningDom.style.zIndex = '-2';
  const warningRoot = createRoot(warningDom);
  warningRoot.render(<WarningBar {...props} />);
  setTimeout(() => {
    warningDom.remove();
  }, 3000);
}

const alertActions = {
  success: (content: string) => callAlert({ color: 'success', content }),
  warning: (content: string) => callAlert({ color: 'warning', content }),
  error: (content: string) => callAlert({ color: 'error', content }),
};

export default alertActions;
