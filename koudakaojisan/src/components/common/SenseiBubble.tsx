type Props = {
  message: string;
};

export default function SenseiBubble({ message }: Props) {
  return (
    <div className="max-w-lg rounded-xl border p-3 bg-card text-card-foreground shadow">
      <div className="text-xs text-muted-foreground mb-1">先生のひとこと</div>
      <p className="leading-relaxed whitespace-pre-wrap">{message}</p>
    </div>
  );
}

