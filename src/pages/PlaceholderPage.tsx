import { useLocation } from "react-router-dom";

export default function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname.slice(1).replace(/-/g, " ");
  const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{formattedName || "Page"}</h1>
        <p className="text-muted-foreground">
          This section is under development
        </p>
      </div>
      <div className="flex items-center justify-center h-64 bg-card rounded-lg border border-border">
        <p className="text-muted-foreground">{formattedName} page coming soon...</p>
      </div>
    </div>
  );
}
