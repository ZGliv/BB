/*
page.tsx
This page renders Clerk's Billing component for users to manage their subscription and payments.

Functions:
- BillingPage: Renders the Clerk Billing UI for payment management.
*/
"use client";
import { Billing } from "@clerk/nextjs";

// BillingPage renders the Clerk Billing component
export default function BillingPage() {
  return <Billing />; // Renders the Clerk Billing UI
} 