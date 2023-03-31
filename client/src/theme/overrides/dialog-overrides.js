import { isVPXs } from '../media-queries';

export const dialogOverrides = {
  MuiDialog: {
    root: {
      '& > .MuiBackdrop-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', //...0.5*
        backdropFilter: 'blur(10px)', //'none'*
      },
    },
  },
  MuiDialogTitle: {
    root: {
      padding: '16px', //16px 24px*
      [isVPXs]: {
        padding: '12px 16px', //16px 24px* (too big)
      },
    },
  },
  MuiDialogContent: {
    root: {
      padding: '16px', //8px 24px* (l/r padding matches MuiDialogTitle so that title + content start from same point)
      [isVPXs]: {
        padding: '12px', //8px 24px* (too wide)
      },

      '&::-webkit-scrollbar': {
        display: 'none', // hide ugly scrollbar when content overflows <DialogContent>
      },
    },
  },
  MuiDialogContentText: {},
};
