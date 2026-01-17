import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  BookOpen, 
  Shield, 
  Github, 
  ExternalLink,
  MessageCircle,
  Globe,
  Database
} from "lucide-react";

interface DocumentLink {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

const documentation: DocumentLink[] = [
  {
    title: "Documentation",
    description: "Complete protocol documentation and guides",
    url: "https://docs.capshield.io",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: "Whitepaper",
    description: "Technical whitepaper and protocol design",
    url: "https://docs.capshield.io/whitepaper",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "Security Audits",
    description: "Third-party security audit reports",
    url: "https://docs.capshield.io/audits",
    icon: <Shield className="w-5 h-5" />,
  },
];

const developerResources: DocumentLink[] = [
  {
    title: "GitHub Repository",
    description: "Smart contract source code",
    url: "https://github.com/capshield",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Subgraph Endpoint",
    description: "GraphQL API for querying protocol data",
    url: "https://thegraph.com/hosted-service/subgraph/capshield",
    icon: <Database className="w-5 h-5" />,
  },
];

const communityLinks: DocumentLink[] = [
  {
    title: "Website",
    description: "Official CAPShield website",
    url: "https://capshield.io",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    title: "Discord",
    description: "Join our community on Discord",
    url: "https://discord.gg/capshield",
    icon: <MessageCircle className="w-5 h-5" />,
  },
];

function DocumentCard({ doc }: { doc: DocumentLink }) {
  return (
    <a
      href={doc.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
        {doc.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium group-hover:text-primary transition-colors">{doc.title}</h4>
          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-sm text-muted-foreground">{doc.description}</p>
      </div>
    </a>
  );
}

export default function Documents() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Documents</h1>
        <p className="text-muted-foreground">Protocol documentation and resources</p>
      </div>

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {documentation.map((doc) => (
            <DocumentCard key={doc.title} doc={doc} />
          ))}
        </CardContent>
      </Card>

      {/* Developer Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Developer Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {developerResources.map((doc) => (
            <DocumentCard key={doc.title} doc={doc} />
          ))}
        </CardContent>
      </Card>

      {/* Community */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Community & Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {communityLinks.map((doc) => (
            <DocumentCard key={doc.title} doc={doc} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
