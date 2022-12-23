import prisma from "./prisma";

// READ
//get unique permit by id
export const getPermitByID = async (id) => {
  const permit = await prisma.permit.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return permit;
};

// CREATE
export const createPermit = async (event, session) => {
  const newPermit = await prisma.permit.create({
    data: {
      name: event.name,
      eventTime: event.eventTime,
      location: event.location,
      liquor: event.liquor,
      venueName: event.venueName,
      email: event.email,
      phone: event.phone,
      contactName: event.contactName,
      contactSSN: event.contactSSN,
      contactDOB: event.contactDOB,
      companyType: event.companyType,
      address: event.address,
      reviewed: false,
      user: { connect: { email: session?.user?.email } },
    },
  });

  const permit = await getPermitByID(newPermit.id);

  return permit;
};

// UPDATE
export const updatePermit = async (id, updatedData, session) => {
  let userId = session?.user.id;
  const updatedPermit = await prisma.permit.update({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    data: {
      ...updatedData,
    },
  });
  const permit = await getPermitByID(updatedPermit.id);
  return permit;
};

// GET
  export const getAllPermitsByUserID = async (id) => {
    const permits = await prisma.permit.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    });
    return permits;
  };

  // DELETE
export const deletePermit = async (id, session) => {
  let userId = session?.user.id;
  const deletedPermit = await prisma.permit.delete({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
  });
  return deletedPermit;
};