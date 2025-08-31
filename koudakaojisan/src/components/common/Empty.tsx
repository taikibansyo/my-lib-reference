type Props = {
  title?: string;
  description?: string;
};

export default function Empty({ title = "データがありません", description = "ここに追加してください" }: Props) {
  return (
    <div className="border rounded-xl p-6 text-center text-sm text-muted-foreground">
      <div className="font-medium text-foreground mb-1">{title}</div>
      <div>{description}</div>
    </div>
  );
}

