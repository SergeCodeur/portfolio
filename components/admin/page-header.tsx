interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function AdminPageHeader({
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
