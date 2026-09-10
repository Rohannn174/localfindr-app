import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categories } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      { title: "Category Management — Districtly Admin" },
      {
        name: "description",
        content:
          "Manage the category tree that powers discovery filters in the customer app.",
      },
      { property: "og:title", content: "Category Management — Districtly Admin" },
      { property: "og:description", content: "Category tree and store distribution." },
    ],
  }),
  component: AdminCategories,
});

function AdminCategories() {
  const total = categories.reduce((sum, c) => sum + c.storeCount, 0);

  return (
    <PortalShell
      role="admin"
      title="Categories"
      description="The tree customers filter by during discovery"
      actions={
        <Button size="sm">
          <PlusIcon /> New category
        </Button>
      }
    >
      <div className="grid gap-6 px-4 lg:grid-cols-3 lg:px-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">{categories.length} categories</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Category</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead className="text-right">Stores</TableHead>
                  <TableHead className="w-48">Share</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="pl-6 font-medium">{c.name}</TableCell>
                    <TableCell className="text-muted-foreground">{c.parent ?? "—"}</TableCell>
                    <TableCell className="text-right tabular-nums">{c.storeCount}</TableCell>
                    <TableCell>
                      <Progress value={(c.storeCount / total) * 100} className="h-1.5" />
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <StatusBadge status={c.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">How discovery uses this</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm">
            <p>
              Categories filter the nearby search on the customer app. A store appears under its
              merchant's category, resolved by latitude, longitude and radius — not by city.
            </p>
            <p>
              Ranking combines distance, active status, offer availability, rating and price
              signals. Paused categories hide all their stores from discovery.
            </p>
            <p>
              Sub-categories like Electronics inherit their parent's filters, so a store can match
              both "Retail" and "Electronics" searches.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
