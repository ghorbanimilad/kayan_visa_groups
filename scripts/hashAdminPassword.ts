import bcrypt from "bcrypt";
import {prisma} from "@/lib/prisma"

async function updateAdminPassword() {
  const username = "miladgh";
  const plainPassword = "123456789";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.admin.update({
    where: { username },
    data: { password: hashedPassword },
  });

  console.log("رمز هش شد و ذخیره شد!");
  process.exit(0);
}

updateAdminPassword().catch((e) => {
  console.error(e);
  process.exit(1);
});
