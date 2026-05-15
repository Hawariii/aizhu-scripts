"use client";

type AdminDeleteFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  scriptId: string;
  title: string;
};

export function AdminDeleteForm({
  action,
  scriptId,
  title,
}: AdminDeleteFormProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        const confirmed = window.confirm(`Delete "${title}" permanently?`);

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input name="scriptId" type="hidden" value={scriptId} />
      <button className="font-medium text-danger" type="submit">
        Delete
      </button>
    </form>
  );
}
