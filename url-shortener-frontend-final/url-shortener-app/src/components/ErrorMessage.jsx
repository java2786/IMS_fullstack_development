export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <div className="text-red-500 text-sm p-2">{message}</div>;
}
