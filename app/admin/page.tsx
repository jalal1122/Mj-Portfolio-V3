import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="section-wrap">
        <p className="sub-heading">Admin CMS</p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Manage Portfolio Content</h1>
      </div>
      <AdminDashboard />
    </div>
  );
}
