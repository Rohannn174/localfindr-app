import { createFileRoute } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";

import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/status-badge";
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
import { inr, transactions } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/transactions")({
  head: () => ({
    meta: [
      { title: "Transaction Monitoring — Districtly Admin" },
      {
        name: "description",
        content:
          "Watch every UPI payment, refund and failure across all merchants in real time.",
      },
      { property: "og:title", content: "Transaction Monitoring — Districtly Admin" },
      { property: "og:description", content: "Platform-wide UPI payment monitoring." },
    ],
  }),
  component: AdminTransactions,
});

function AdminTransactions() {
  return (
    <PortalShell
      role="admin"
      title="Transactions"
      description="All payments across every merchant, verified from PSP webhooks"
    >
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">{transactions.length} recent payments</CardTitle>
            <div className="relative w-64">
              <SearchIcon className="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
              <Input placeholder="Search UTR, merchant or customer" className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Payment</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead className="text-right">Bill</TableHead>
                  <TableHead className="text-right">Discount</TableHead>
                  <TableHead className="text-right">Payable</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="pl-6">
                      <p className="font-medium tabular-nums">{t.id}</p>
                      <p className="text-muted-foreground text-xs tabular-nums">
                        {t.paidAt} · {t.utr}
                      </p>
                    </TableCell>
                    <TableCell>{t.customer}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {t.merchant}
                      <span className="block text-xs">{t.store}</span>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{inr(t.billAmount)}</TableCell>
                    <TableCell className="text-right tabular-nums">-{inr(t.discount)}</TableCell>
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
    </PortalShell>
  );
}
