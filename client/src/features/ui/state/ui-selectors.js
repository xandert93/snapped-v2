import { createSelector } from '@reduxjs/toolkit';

export const selectIsDarkMode = (state) => state.ui.isDarkMode;

export const selectIsFormDisabled = (state) => state.ui.isFormDisabled;
export const selectIsRequesting = (state) => state.ui.isRequesting;

export const selectDialogId = (state) => state.ui.dialogId;
export const selectIsDialogOpen = (state) => state.ui.isDialogOpen;

export const selectConfirmDialogId = (state) => state.ui.confirmDialogId;
export const selectIsConfirmDialogOpen = (state) => state.ui.isConfirmDialogOpen;

export const selectDropDownId = (state) => state.ui.dropDownId;
export const selectAnchorEl = (state) => state.ui.anchorEl;

export const selectIsDrawerOpen = (state) => state.ui.isDrawerOpen;

export const selectIsScrolledDown = (state) => state.ui.isScrolledDown;
