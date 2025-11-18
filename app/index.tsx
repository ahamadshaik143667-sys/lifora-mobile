// FILE: app/index.tsx
import React from "react";
import { Redirect } from "expo-router";

export default function Index() {
  // Force landing on login screen first
  return <Redirect href="/(auth)/login" />;
}
