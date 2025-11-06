import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CurrentUser extends JwtPayload {
  id?: string;
  role?: string;
  [key: string]: unknown;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CurrentUser;
    return decoded; // شامل id و role و سایر اطلاعات
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
