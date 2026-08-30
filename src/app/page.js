import { prisma } from "@/lib/prisma";

export default async function Home() {
  const rooms = await prisma.room.findMany({
    orderBy: { hourlyRate: "asc" },
  });

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-stone-800 mb-2">
          Tea Room Scheduler
        </h1>
        <p className="text-stone-600 mb-10">
          Reserve a private room for your tea ceremony.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg shadow-sm border border-stone-200 p-6"
            >
              <h2 className="text-xl font-semibold text-stone-800">
                {room.name}
              </h2>
              <p className="text-stone-600 mt-2 text-sm">
                {room.description}
              </p>
              <div className="mt-4 flex justify-between text-sm text-stone-700">
                <span>Seats up to {room.capacity}</span>
                <span className="font-medium">${room.hourlyRate}/hr</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}