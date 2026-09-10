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
import { merchants } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/merchants")({
  head: () => ({
    meta: [
      { title: "Merchant Approval — Districtly Admin" },
      {
        name: "description",
        content:
          "Review KYC, approve or reject merchant registrations and manage live merchant accounts.",
      },
      { property: "og:title", content: "Merchant Approval — Districtly Admin" },
      { property: "og:description", content: "KYC review and merchant lifecycle management." },
    ],
  }),
  component: AdminMerchants,
});

function AdminMerchants() {
  return (
    <PortalShell
      role="admin"
      title="Merchants"
      description="Approve registrations and monitor merchant health"
    >
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">{merchants.length} merchants</CardTitle>
            <div className="relative w-64">
              <SearchIcon className="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
              <Input placeholder="Search business or owner" className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Business</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-right">Stores</TableHead>
                  <TableHead>KYC</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Review</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {merchants.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="pl-6">
                      <p className="font-medium">{m.businessName}</p>
                      <p className="text-muted-foreground text-xs">
                        {m.owner} · {m.phone}
                      </p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{m.category}</TableCell>
                    <TableCell className="text-muted-foreground">{m.city}</TableCell>
                    <TableCell className="text-right tabular-nums">{m.storeCount}</TableCell>
                    <TableCell>
                      <StatusBadge status={m.kycStatus} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={m.status} />
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      {m.status === "PENDING" ? (
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="outline" className="size-7" aria-label="Approve">
                            <CheckIcon className="size-3.5" />
                          </Button>
                          <Button size="icon" variant="outline" className="size-7" aria-label="Reject">
                            <XIcon className="size-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">{m.joinedOn}</span>
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
