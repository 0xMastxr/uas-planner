import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let isProcessing = false; // Bandera para controlar si el asignador está en ejecución

// Función para asignar el siguiente plan en la cola
const assignNextPlan = async () => {
  if (isProcessing) return; // Evita la ejecución si ya se está procesando
  isProcessing = true;

  try {
    // Buscar el siguiente plan en estado 'en cola' y una máquina disponible
    const nextPlan = await prisma.flightPlan.findFirst({
      where: { status: 'en cola' },
      orderBy: { createdAt: 'asc' },
    });

    if (!nextPlan) return; // No hay planes en cola

    const availableMachine = await prisma.machine.findFirst({
      where: { status: 'Disponible' },
    });

    if (!availableMachine) return; // No hay máquinas disponibles

    // Asignar el plan a la máquina y actualizar los estados
    await prisma.flightPlan.update({
      where: { id: nextPlan.id },
      data: {
        status: 'procesando',
        machineAssignedName: availableMachine.name,
      },
    });

    await prisma.machine.update({
      where: { id: availableMachine.id },
      data: { status: 'Ocupada' },
    });

    console.log(`Asignado el plan con ID ${nextPlan.id} a la máquina ${availableMachine.name}`);
  } catch (error) {
    console.error(`Error al asignar el plan:`, error);
  } finally {
    isProcessing = false; // Libera la bandera al finalizar
  }
};

// Función principal que se ejecuta periódicamente para asignar planes
const main = async () => {
  // Ejecutar asignaciones cada cierto intervalo
  setInterval(async () => {
    await assignNextPlan();
  }, 1000); // Cada segundo se revisa la cola de planes
};

// Iniciar el asignador de planes
main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
