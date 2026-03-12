import { UserStatus } from "../../enums/userStatus"
import { prisma } from "../../lib/prisma"
import { AppError } from './../../utils/appError';

const createCategory = async (name: string) => {
    return await prisma.category.create({
        data: {
            name
        }
    })
}

const deleteCategory = async (id: string) => {
    return await prisma.category.delete({
        where: {
            id
        }
    })
}


const getAllUsers = async () => {
    return await prisma.user.findMany()
}

const updateUserStatus = async (id: string, status: UserStatus) => {

    const user = await prisma.user.findUnique({
        where: { id }
    });

    if (!user) {
        throw new AppError("User not found");
    }

    const result = await prisma.user.update({
        where: { id },
        data: {
            status
        }
    });

    return result;
};

export const adminServices = {
    createCategory, deleteCategory, getAllUsers, updateUserStatus
}