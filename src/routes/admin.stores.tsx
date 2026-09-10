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
import { stores } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/stores")({
  head: () => ({
    meta: [
      { title: "Store Approval — Districtly Admin" },
      {
        name: "description",
        content:
          "Verify branch addresses and map pins before stores become discoverable in the customer app.",
      },
      { property: "og:title", content: "Store Approval — Districtly Admin" },
      { property: "og:description", content: "Branch verification and map pin review." },
    ],
  }),
  component: AdminStores,
});

function AdminStores() {
  return (
    <PortalShell
      role="admin"
      title="Stores"
      description="Only approved, correctly pinned stores appear in nearby discovery"
    >
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">{stores.length} stores</CardTitle>
            <div className="relative w-64">
              <SearchIcon className="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
              <Input placeholder="Search store, merchant or city" className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Store</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Coordinates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Review</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stores.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="pl-6">
                      <p className="font-medium">{s.storeName}</p>
                      <p className="text-muted-foreground text-xs">
                        {s.address} · {s.pincode}
                      </p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{s.merchant}</TableCell>
                    <TableCell className="text-muted-foreground">{s.city}</TableCell>
                    <TableCell className="text-muted-foreground text-xs tabular-nums">
                      {s.latitude.toFixed(4)}, {s.longitude.toFixed(4)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={s.status} />
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      {s.status === "PENDING" ? (
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="outline" className="size-7" aria-label="Approve">
                            <CheckIcon className="size-3.5" />
                          </Button>
                          <Button size="icon" variant="outline" className="size-7" aria-label="Reject">
                            <XIcon className="size-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
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
