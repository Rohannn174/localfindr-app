import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon, MapPinnedIcon, ShieldCheckIcon, StoreIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Districtly — Merchant & Admin Console" },
      {
        name: "description",
        content:
          "Sign in to the Districtly console to manage stores, offers, approvals and UPI transactions for local merchants.",
      },
      { property: "og:title", content: "Districtly — Merchant & Admin Console" },
      {
        property: "og:description",
        content:
          "Location-first local commerce platform. Manage merchants, stores, offers and payments in one console.",
      },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  return (
    <div className="bg-muted/40 grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground grid size-9 place-items-center rounded-lg">
              <ShieldCheckIcon className="size-5" />
            </div>
            <div className="leading-tight">
              <p className="text-base font-semibold tracking-tight">Districtly</p>
              <p className="text-muted-foreground text-xs">Local commerce console</p>
            </div>
          </div>

          <h1 className="mt-10 text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Enter your registered mobile number to receive a one-time password.
          </p>

          <Tabs defaultValue="merchant" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="merchant">Merchant</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="merchant" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="m-phone">Mobile number</Label>
                <Input id="m-phone" defaultValue="+91 98220 41120" inputMode="tel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="m-otp">One-time password</Label>
                <Input id="m-otp" defaultValue="482913" inputMode="numeric" />
              </div>
              <Button asChild className="w-full">
                <Link to="/merchant">
                  Continue to merchant portal <ArrowRightIcon />
                </Link>
              </Button>
            </TabsContent>

            <TabsContent value="admin" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="a-phone">Admin email</Label>
                <Input id="a-phone" defaultValue="admin@districtly.in" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="a-otp">One-time password</Label>
                <Input id="a-otp" defaultValue="771204" inputMode="numeric" />
              </div>
              <Button asChild className="w-full">
                <Link to="/admin">
                  Continue to admin portal <ArrowRightIcon />
                </Link>
              </Button>
            </TabsContent>
          </Tabs>

          <p className="text-muted-foreground mt-6 text-xs">
            Demo build running on sample data. Authentication will be wired to the OTP + JWT API.
          </p>
        </div>
      </div>

      <div className="bg-background hidden border-l p-12 lg:flex lg:flex-col lg:justify-center">
        <div className="mx-auto w-full max-w-md space-y-4">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
            Phase 1 · September 2026
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight">
            One console for every branch, offer and rupee collected.
          </h2>
          <div className="grid gap-3 pt-4">
            <Card>
              <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                <StoreIcon className="text-primary mt-0.5 size-5 shrink-0" />
                <div>
                  <CardTitle className="text-sm">Merchant portal</CardTitle>
                  <CardDescription>
                    Business profile, multi-branch stores, map pins, offers and settlements.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                <MapPinnedIcon className="text-primary mt-0.5 size-5 shrink-0" />
                <div>
                  <CardTitle className="text-sm">Admin portal</CardTitle>
                  <CardDescription>
                    Merchant, store and offer approvals, category tree and transaction monitoring.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardContent className="text-muted-foreground pt-6 text-sm">
                Discovery runs on latitude, longitude and radius — every store carries its own map
                pin, so a merchant with branches in Pune, Mumbai and Nagpur is found in all three.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
