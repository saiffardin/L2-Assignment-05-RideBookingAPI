/* eslint-disable no-console */
import bcryptjs from "bcryptjs";
import { envVars } from "../config";
import { Role } from "../constants";
import { Admin } from "../modules/admin/admin.model";
import { IAdmin } from "../modules/admin/admin.interface";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await Admin.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      console.log("Super Admin Already Exists!");
      return;
    }

    console.log("Trying to create Super Admin...");

    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const payload: IAdmin = {
      name: "Super admin",
      role: Role.SUPER_ADMIN,
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      isVerified: true,
    };

    const superAdmin = await Admin.create(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = superAdmin.toObject();

    console.log("Super Admin Created Successfully! \n");
    console.log(rest);
  } catch (error) {
    console.log(error);
  }
};
