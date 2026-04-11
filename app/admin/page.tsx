import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="section-wrap">
        <p className="sub-heading">Admin CMS</p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Portfolio Control Center</h1>
        <p className="mt-3 text-[var(--text-secondary)] max-w-3xl">
          Manage projects, technologies, and experience records with secure write access and Cloudinary-powered media uploads.
        </p>
      </div>
      <AdminDashboard />
    </div>
  );
}
