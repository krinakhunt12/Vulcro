import { redirect } from 'next/navigation';

export default function AdminDashboardPage() {
    // Redirect /admin/dashboard to /admin
    redirect('/admin');
}