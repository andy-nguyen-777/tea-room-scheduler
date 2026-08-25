import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data first, so we don't get duplicates if rerun 
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

  // Creates tea rooms while inserting multiple rows into one cell
  await prisma.room.createMany({
    data: [
      {
        name: "Moon Garden Room",
        description: "A quiet tatami room overlooking the koi pond, ideal for traditional ceremonies.",
        capacity: 4,
        hourlyRate: 25.5,
      },
      {
        name: "Bamboo Grove Room",
        description: "Intimate two-person room surrounded by potted bamboo, perfect for a first tea ceremony experience.",
        capacity: 2,
        hourlyRate: 18.0,
      },
      {
        name: "Willow Pavilion",
        description: "Our largest room, seats up to 8, with a low ceremonial table and sliding shoji screens.",
        capacity: 8,
        hourlyRate: 40.0,
      },
    ],
  });

  // Create a test admin user
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@tearoom.test",
      role: "admin",
    },
  });

  console.log("Seed data created successfully.");
}

// Wrapper while ensuring error catching
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });