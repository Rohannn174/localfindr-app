import { TrendingDownIcon, TrendingUpIcon, MinusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Kpi } from "@/lib/mock-data";

export function SectionCards({ items }: { items: Kpi[] }) {
  return (
    <div className="@xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 dark:*:data-[slot=card]:bg-card">
      {items.map((kpi) => {
        const Icon =
          kpi.trend === "up" ? TrendingUpIcon : kpi.trend === "down" ? TrendingDownIcon : MinusIcon;
        return (
          <Card key={kpi.label} className="@container/card">
            <CardHeader className="relative">
              <CardDescription>{kpi.label}</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums tracking-tight">
                {kpi.value}
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  <Icon className="size-3" />
                  {kpi.delta}
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="text-muted-foreground text-sm">{kpi.hint}</CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
