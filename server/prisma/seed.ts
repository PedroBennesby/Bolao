import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@mail.com',
      avatarUrl: 'https://github.com/pedrobennesby.png',
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'My first pool',
      code: '123456',
      ownerId: user.id,

      Participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-02T12:00:00.000Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-03T16:00:00.000Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',

      guesses: {
        create: {
          firstTeamScore: 2,
          secondTeamScore: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
