export default function NetworkError() {
  return (
    <p>
      A network error was encountered.{" "}
      <button onClick={() => location.reload()}>Refresh</button>
    </p>
  );
}
