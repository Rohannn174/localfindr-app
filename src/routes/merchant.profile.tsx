import { createFileRoute } from "@tanstack/react-router";

import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { merchantProfile } from "@/lib/mock-data";

export const Route = createFileRoute("/merchant/profile")({
  head: () => ({
    meta: [
      { title: "Business Profile — Districtly Merchant" },
      {
        name: "description",
        content:
          "Manage your registered business details, category, GST and UPI settlement account.",
      },
      { property: "og:title", content: "Business Profile — Districtly Merchant" },
      {
        property: "og:description",
        content: "Registered business details, KYC status and UPI settlement account.",
      },
    ],
  }),
  component: Profile,
});

function Profile() {
  const p = merchantProfile;
  return (
    <PortalShell
      role="merchant"
      title="Business profile"
      description="Details shown to customers and used for settlement"
      actions={<Button size="sm">Save changes</Button>}
    >
      <div className="grid gap-6 px-4 lg:grid-cols-3 lg:px-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Business details</CardTitle>
            <CardDescription>Changes to name or category need admin re-approval.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bn">Business name</Label>
              <Input id="bn" defaultValue={p.businessName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ln">Registered legal name</Label>
              <Input id="ln" defaultValue={p.legalName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ow">Owner</Label>
              <Input id="ow" defaultValue={p.owner} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ct">Category</Label>
              <Input id="ct" defaultValue={p.category} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="em">Email</Label>
              <Input id="em" defaultValue={p.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ph">Phone</Label>
              <Input id="ph" defaultValue={p.phone} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="ab">About</Label>
              <Textarea
                id="ab"
                rows={3}
                defaultValue="Neighbourhood strength and conditioning studios with certified trainers, group classes and recovery zones across four cities."
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">KYC & settlement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">KYC status</span>
                <StatusBadge status={p.kycStatus} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">GSTIN</span>
                <span className="font-medium tabular-nums">{p.gstin}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Settlement UPI</span>
                <span className="font-medium">{p.upiVpa}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Head office</span>
                <span className="font-medium">{p.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">On platform since</span>
                <span className="font-medium">{p.since}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Onboarding progress</CardTitle>
              <CardDescription>All steps complete except one branch approval.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {[
                ["Business details", "ACTIVE"],
                ["Category selected", "ACTIVE"],
                ["Stores added", "ACTIVE"],
                ["Map pins confirmed", "ACTIVE"],
                ["KYC documents", "VERIFIED"],
                ["Admin review", "PENDING"],
              ].map(([step, status]: [string, string]) => (
                <div key={step} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{step}</span>
                  <StatusBadge status={status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}
