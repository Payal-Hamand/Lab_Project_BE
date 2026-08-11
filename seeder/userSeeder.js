import bcrypt from "bcryptjs";
import User from "../models/User.js";

const defaultSuperAdmin = {
  name: "Super Admin",
  email: "admin@labbook.com",
  phone: "9999999999",
  password: "Admin@123",
  role: "super_admin",
};

export const seedSuperAdmin = async () => {
  try {
    const exists = await User.findOne({ role: "super_admin" });
    if (exists) {
      console.log("Super admin user already exists, skipping seed");
      return;
    }

    const hashedPassword = await bcrypt.hash(defaultSuperAdmin.password, 10);

    await User.create({
      name: defaultSuperAdmin.name,
      email: defaultSuperAdmin.email,
      phone: defaultSuperAdmin.phone,
      password: hashedPassword,
      role: defaultSuperAdmin.role,
    });

    console.log(`Super admin seeded: ${defaultSuperAdmin.email}`);
  } catch (error) {
    console.error("Error seeding super admin:", error.message);
  }
};
