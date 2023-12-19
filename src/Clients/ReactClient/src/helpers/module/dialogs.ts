import Swal from 'sweetalert2';

const defaultSettings = {
  confirmButtonClass: 'btn btn-primary mx-2',
  cancelButtonClass: 'btn btn-default mx-2',
  buttonsStyling: false,
  reverseButtons: true,
}

export const Dialog = Swal.mixin(defaultSettings);

export const ConfirmDialog = Swal.mixin({
  ...defaultSettings,
  confirmButtonText: 'Confirm',
  showCancelButton: true,
  type: 'warning',
});

export const ActionDialog = (title: string, text: string | undefined, action: () => void ) => Dialog({
  title, 
  text,
  onClose: action
});
