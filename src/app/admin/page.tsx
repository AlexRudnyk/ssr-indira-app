import AdminPage from "@/components/AdminPage"
import AuthWrapper from "@/components/AuthWrapper"

export default function Admin() {
  return (
    <AuthWrapper>
      <AdminPage />
    </AuthWrapper>
  )
}
