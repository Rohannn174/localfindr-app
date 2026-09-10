import { createFileRoute } from "@tanstack/react-router";
import { CheckIcon, SearchIcon, XIcon } from "lucide-react";

import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { offers } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/offers")({
  head: () => ({
    meta: [
      { title: "Offer Approval — Districtly Admin" },
      {
        name: "description",
        content:
          "Review merchant offers before they go live and monitor active campaigns across the platform.",
      },
      { property: "og:title", content: "Offer Approval — Districtly Admin" },
      { property: "og:description", content: "Offer review pipeline and live campaign monitoring." },
    ],
  }),
  component: AdminOffers,
});

function AdminOffers() {
  return (
    <PortalShell
      role="admin"
      title="Offers"
      description="Every offer passes review before it reaches the customer app"
    >
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">{offers.length} offers</CardTitle>
            <div className="relative w-64">
              <SearchIcon className="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
              <Input placeholder="Search offer or merchant" className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Offer</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Valid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Review</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offers.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="pl-6 font-medium">{o.title}</TableCell>
                    <TableCell className="text-muted-foreground">{o.merchant}</TableCell>
                    <TableCell className="text-muted-foreground">{o.store}</TableCell>
                    <TableCell className="tabular-nums">{o.value}</TableCell>
                    <TableCell className="text-muted-foreground text-xs tabular-nums">
                      {o.validFrom.slice(5).replace("-", "/")} – {o.validTo.slice(5).replace("-", "/")}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={o.status} />
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      {o.status === "PENDING" ? (
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="outline" className="size-7" aria-label="Approve">
                            <CheckIcon className="size-3.5" />
                          </Button>
                          <Button size="icon" variant="outline" className="size-7" aria-label="Reject">
                            <XIcon className="size-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs tabular-nums">
                          {o.redemptions} redeemed
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
