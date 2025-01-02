import { Metadata } from "next"

import AdminPage from "@/components/AdminPage"
import AuthWrapper from "@/components/AuthWrapper"

export const metadata: Metadata = {
  title: "Admin Page",
  description: "Admin Page of Indira Shop"
}

export default function Admin() {
  return (
    <AuthWrapper>
      <AdminPage />
    </AuthWrapper>
  )
}
