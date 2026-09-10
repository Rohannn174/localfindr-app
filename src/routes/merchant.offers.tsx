import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { offers } from "@/lib/mock-data";

export const Route = createFileRoute("/merchant/offers")({
  head: () => ({
    meta: [
      { title: "Offer Management — Districtly Merchant" },
      {
        name: "description",
        content:
          "Create flat, percentage and BOGO offers per branch and track their approval pipeline and redemptions.",
      },
      { property: "og:title", content: "Offer Management — Districtly Merchant" },
      {
        property: "og:description",
        content: "Create and track offers across branches, from draft to expiry.",
      },
    ],
  }),
  component: Offers,
});

function Offers() {
  const rows = offers.filter((o) => o.merchant === "ABC Fitness Group");

  return (
    <PortalShell
      role="merchant"
      title="Offers"
      description="Created → Pending approval → Active → Expired"
      actions={
        <Button size="sm">
          <PlusIcon /> New offer
        </Button>
      }
    >
      <div className="grid gap-6 px-4 lg:grid-cols-3 lg:px-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Your offers</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Offer</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Valid</TableHead>
                  <TableHead className="text-right">Redeemed</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="pl-6 font-medium">{o.title}</TableCell>
                    <TableCell className="text-muted-foreground">{o.store}</TableCell>
                    <TableCell className="tabular-nums">{o.value}</TableCell>
                    <TableCell className="text-muted-foreground text-xs tabular-nums">
                      {o.validFrom.slice(5).replace("-", "/")} – {o.validTo.slice(5).replace("-", "/")}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{o.redemptions}</TableCell>
                    <TableCell className="pr-6 text-right">
                      <StatusBadge status={o.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create offer</CardTitle>
            <CardDescription>New offers go to admin review before going live.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ot">Title</Label>
              <Input id="ot" placeholder="Flat 20% off membership" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select defaultValue="FLAT_PCT">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FLAT_PCT">Percent off</SelectItem>
                    <SelectItem value="FLAT_AMT">Flat amount</SelectItem>
                    <SelectItem value="BOGO">Buy 1 get 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ov">Value</Label>
                <Input id="ov" placeholder="20%" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Applies to</Label>
              <Select defaultValue="str_2201">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All stores</SelectItem>
                  <SelectItem value="str_2201">Kothrud, Pune</SelectItem>
                  <SelectItem value="str_2202">Bandra West, Mumbai</SelectItem>
                  <SelectItem value="str_2203">Dharampeth, Nagpur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="vf">Valid from</Label>
                <Input id="vf" type="date" defaultValue="2026-09-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vt">Valid to</Label>
                <Input id="vt" type="date" defaultValue="2026-09-30" />
              </div>
            </div>
            <Button className="w-full">Submit for approval</Button>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
