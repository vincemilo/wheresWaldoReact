export default function NameInput({ nameModal, handleSubmit, name, setName }) {
  return (
    <dialog ref={nameModal} className="name-modal">
      <form className="input-field" onSubmit={handleSubmit}>
        <p>Congratulations!</p>
        <p>You made the top ten!</p>
        <p>Please enter your name: </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </dialog>
  );
}
