export default function Modal({ dialogRef }) {
  const handleClose = () => {
    console.log(dialogRef.current);
    dialogRef.current.close();
  };

  const outsideClick = (e) => {
    console.log(e.target);
  };

  return (
    <dialog id="modal" ref={dialogRef} onClick={outsideClick}>
      <p>
        Modal content of your choice. Click the below button or press the escape
        key to close this.
      </p>
      <button id="closeModal" onClick={handleClose}>
        Close this modal
      </button>
    </dialog>
  );
}
