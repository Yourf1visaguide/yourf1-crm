import { Label } from "@/components/ui/label";

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export default function Field({ label, error, children }: FieldProps) {
  return (
    <div className="min-w-0 space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{String(error)}</p>}
    </div>
  );
}