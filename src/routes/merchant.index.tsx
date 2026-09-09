import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { PortalShell } from "@/components/portal-shell";
import { SectionCards } from "@/components/section-cards";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { inr, merchantKpis, offers, stores, transactions } from "@/lib/mock-data";

export const Route = createFileRoute("/merchant/")({
  head: () => ({
    meta: [
      { title: "Merchant Dashboard — Districtly" },
      {
        name: "description",
        content:
          "Track revenue, redemptions, store health and live offers across every branch of your business.",
      },
      { property: "og:title", content: "Merchant Dashboard — Districtly" },
      {
        property: "og:description",
        content: "Revenue, redemptions and branch performance for local merchants.",
      },
    ],
  }),
  component: MerchantDashboard,
});

function MerchantDashboard() {
  const myStores = stores.filter((s) => s.merchantId === "mrc_1042");
  const myOffers = offers.filter((o) => o.merchant === "ABC Fitness Group");
  const myTx = transactions.filter((t) => t.merchant === "ABC Fitness Group");

  return (
    <PortalShell
      role="merchant"
      title="Dashboard"
      description="ABC Fitness Group · 4 branches"
      actions={
        <Button asChild size="sm">
          <Link to="/merchant/offers">
            <PlusIcon /> New offer
          </Link>
        </Button>
      }
    >
      <SectionCards items={merchantKpis} />

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

      <div className="grid gap-6 px-4 lg:grid-cols-3 lg:px-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent transactions</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Customer</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead className="text-right">Bill</TableHead>
                  <TableHead className="text-right">Payable</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myTx.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="pl-6 font-medium">{t.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{t.store}</TableCell>
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

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your stores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myStores.map((s) => (
                <div key={s.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{s.storeName}</p>
                    <p className="text-muted-foreground truncate text-xs">
                      {s.city} · {s.pincode}
                    </p>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Offer pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myOffers.map((o) => (
                <div key={o.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{o.title}</p>
                    <p className="text-muted-foreground truncate text-xs">
                      {o.store} · {o.redemptions} redeemed
                    </p>
                  </div>
                  <StatusBadge status={o.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}
