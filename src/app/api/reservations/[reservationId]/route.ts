import { NextResponse } from 'next/server';

import prisma from '@/lib/db';
import getCurrentUser from '@/actions/getCurrentUser';

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  console.log(params);

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  console.log('reservationId', reservationId);

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid reservation id');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
