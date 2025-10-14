import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies(); // <- باید await شود
    const adminToken = cookieStore.get('adminToken')?.value;
    return new Response(JSON.stringify({ isAdmin: !!adminToken }));
}
