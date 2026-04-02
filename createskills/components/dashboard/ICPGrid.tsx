import { Badge } from "@/components/ui/badge";

const icpByType: Record<string, string[]> = {
  url: ["AI Agent Developers", "Technical Writers", "Developer Advocates", "LLM Engineers", "Knowledge Ops Teams", "Product Teams"],
  github: ["AI Agent Developers", "LLM Engineers", "Open Source Contributors", "DevRel Teams", "Platform Engineers", "Indie AI Builders"],
  md: ["Technical Writers", "Course Creators", "Documentation Teams", "AI Agent Developers", "Knowledge Workers", "Educators"],
  txt: ["Knowledge Ops Teams", "AI Agent Developers", "Course Creators", "Research Teams", "Technical Writers", "Content Teams"],
  file: ["Knowledge Ops Teams", "Enterprise Teams", "AI Agent Developers", "LLM Engineers", "Course Creators", "Research Teams"],
  youtube: ["Course Creators", "Developer Advocates", "Educators", "AI Agent Developers", "Content Creators", "Knowledge Workers"],
  thoughts: ["Indie AI Builders", "Product Managers", "AI Agent Developers", "Prompt Engineers", "Researchers", "Entrepreneurs"],
};

const defaultIcp: string[] = ["AI Agent Developers", "LLM Engineers", "Knowledge Workers", "Technical Writers", "Course Creators", "Indie AI Builders"];

interface ICPGridProps {
  skillType?: string;
}

export function ICPGrid({ skillType }: ICPGridProps) {
  const tags: string[] = (skillType ? icpByType[skillType] : undefined) ?? defaultIcp;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="default" className="text-xs py-1 px-3">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
