import { createFileRoute } from "@tanstack/react-router";
import { CheckIcon, XIcon } from "lucide-react";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { PortalShell } from "@/components/portal-shell";
import { SectionCards } from "@/components/section-cards";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminKpis, approvalQueue, inr, merchants, transactions } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Districtly" },
      {
        name: "description",
        content:
          "Platform-wide view of merchants, stores, approvals, categories and settled UPI transactions.",
      },
      { property: "og:title", content: "Admin Dashboard — Districtly" },
      {
        property: "og:description",
        content: "Approve merchants, monitor transactions and run the platform.",
      },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const recent = transactions.slice(0, 5);

  return (
    <PortalShell
      role="admin"
      title="Dashboard"
      description="Platform overview · September 2026"
    >
      <SectionCards items={adminKpis} />

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive
          title="Platform GMV & redemptions"
          description="All merchants · settled UPI volume"
        />
      </div>

      <div className="grid gap-6 px-4 lg:grid-cols-3 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Approval queue</CardTitle>
            <CardDescription>{approvalQueue.length} items waiting for review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {approvalQueue.map((a) => (
              <div key={a.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{a.title}</p>
                  <StatusBadge status="PENDING" />
                </div>
                <p className="text-muted-foreground mt-1 truncate text-xs">
                  {a.kind} · {a.detail} · {a.submitted}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button size="sm" className="h-8">
                    <CheckIcon /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="h-8">
                    <XIcon /> Reject
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Latest transactions</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Payment</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead className="text-right">Bill</TableHead>
                  <TableHead className="text-right">Payable</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="pl-6">
                      <p className="font-medium tabular-nums">{t.id}</p>
                      <p className="text-muted-foreground text-xs tabular-nums">{t.paidAt}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{t.merchant}</TableCell>
                    <TableCell className="text-right tabular-nums">{inr(t.billAmount)}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {inr(t.payable)}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <StatusBadge status={t.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Newest merchants</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Business</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>KYC</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {merchants.slice(0, 5).map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="pl-6 font-medium">{m.businessName}</TableCell>
                    <TableCell className="text-muted-foreground">{m.owner}</TableCell>
                    <TableCell className="text-muted-foreground">{m.category}</TableCell>
                    <TableCell className="text-muted-foreground">{m.city}</TableCell>
                    <TableCell>
                      <StatusBadge status={m.kycStatus} />
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <StatusBadge status={m.status} />
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
