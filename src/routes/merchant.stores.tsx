import { createFileRoute } from "@tanstack/react-router";
import { MapPinIcon, PlusIcon, SearchIcon } from "lucide-react";

import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export const Route = createFileRoute("/merchant/stores")({
  head: () => ({
    meta: [
      { title: "Store Management — Districtly Merchant" },
      {
        name: "description",
        content:
          "Add branches, set the map pin and control which of your stores are discoverable nearby.",
      },
      { property: "og:title", content: "Store Management — Districtly Merchant" },
      {
        property: "og:description",
        content: "Branch addresses, coordinates and discoverability in one place.",
      },
    ],
  }),
  component: Stores,
});

function Stores() {
  const rows = stores.filter((s) => s.merchantId === "mrc_1042");

  return (
    <PortalShell
      role="merchant"
      title="Stores"
      description="Each branch carries its own location and is discovered separately"
      actions={
        <Button size="sm">
          <PlusIcon /> Add store
        </Button>
      }
    >
      <div className="grid gap-6 px-4 lg:grid-cols-3 lg:px-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">4 branches</CardTitle>
            <div className="relative w-56">
              <SearchIcon className="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
              <Input placeholder="Search branch or city" className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Store</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Coordinates</TableHead>
                  <TableHead className="text-right">Offers</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="pl-6">
                      <p className="font-medium">{s.storeName}</p>
                      <p className="text-muted-foreground text-xs">
                        {s.address} · {s.pincode}
                      </p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{s.city}</TableCell>
                    <TableCell className="text-muted-foreground text-xs tabular-nums">
                      {s.latitude.toFixed(4)}, {s.longitude.toFixed(4)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{s.activeOffers}</TableCell>
                    <TableCell className="pr-6 text-right">
                      <StatusBadge status={s.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Map pin</CardTitle>
            <CardDescription>
              Drag the pin so customers arrive at the right entrance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted relative grid h-56 place-items-center overflow-hidden rounded-lg border">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <MapPinIcon className="text-primary relative size-8" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <p className="text-muted-foreground text-xs">Latitude</p>
                <Input defaultValue="18.5074" className="tabular-nums" />
              </div>
              <div className="space-y-1.5">
                <p className="text-muted-foreground text-xs">Longitude</p>
                <Input defaultValue="73.8077" className="tabular-nums" />
              </div>
            </div>
            <Button className="w-full" variant="outline">
              Save pin for Kothrud
            </Button>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
