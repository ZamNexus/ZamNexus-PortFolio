interface FieldErrorProps {
  id: string;
  message?: string;
}

// Message under a form field; the field points at it with aria-describedby={`${id}-error`}.
export default function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
      {message}
    </p>
  );
}

// aria and border props for a field that may have an error.
export function errorProps(id: string, message?: string) {
  return message
    ? { "aria-invalid": true as const, "aria-describedby": `${id}-error`, "data-invalid": "" }
    : {};
}
