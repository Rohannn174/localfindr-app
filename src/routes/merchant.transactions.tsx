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

export const Route = createFileRoute("/merchant/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions — Districtly Merchant" },
      {
        name: "description",
        content:
          "Every UPI payment against your offers, with bill, discount, payable amount and reward points.",
      },
      { property: "og:title", content: "Transactions — Districtly Merchant" },
      {
        property: "og:description",
        content: "UPI payment history per branch with discounts and rewards.",
      },
    ],
  }),
  component: MerchantTransactions,
});

function MerchantTransactions() {
  const rows = transactions.filter((t) => t.merchant === "ABC Fitness Group");

  return (
    <PortalShell
      role="merchant"
      title="Transactions"
      description="Settled directly to your UPI account — the platform never holds your money"
    >
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">{rows.length} payments</CardTitle>
            <div className="relative w-64">
              <SearchIcon className="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
              <Input placeholder="Search customer or UTR" className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Payment</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Offer</TableHead>
                  <TableHead className="text-right">Bill</TableHead>
                  <TableHead className="text-right">Discount</TableHead>
                  <TableHead className="text-right">Payable</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="pl-6">
                      <p className="font-medium tabular-nums">{t.id}</p>
                      <p className="text-muted-foreground text-xs tabular-nums">
                        {t.paidAt} · {t.utr}
                      </p>
                    </TableCell>
                    <TableCell>{t.customer}</TableCell>
                    <TableCell className="text-muted-foreground max-w-48 truncate">
                      {t.offer}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{inr(t.billAmount)}</TableCell>
                    <TableCell className="text-right tabular-nums">-{inr(t.discount)}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {inr(t.payable)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{t.rewardPoints}</TableCell>
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
