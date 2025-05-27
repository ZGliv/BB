/*
page.tsx
This page renders Clerk's PricingTable component for users to view and subscribe to plans.

Functions:
- PricingPage: Renders the Clerk PricingTable UI for plan selection and subscription.
*/
"use client";
import { PricingTable } from "@clerk/nextjs";

// PricingPage renders the Clerk PricingTable component
export default function PricingPage() {
  return <PricingTable />; // Renders the Clerk PricingTable UI
} 