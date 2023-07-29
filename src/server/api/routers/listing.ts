import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.listing.findMany();
  }),
  get: publicProcedure
    .input(z.object({ listingId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.listing.findUnique({
        where: {
          id: input.listingId,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({ name: z.string(), description: z.string(), price: z.number() })
    )
    .mutation(async ({ input, ctx }) => {
      const createdlisting = await ctx.prisma.listing.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      });
      return createdlisting;
    }),
  delete: protectedProcedure
    .input(z.object({ listingId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.listing.delete({
        where: {
          id: input.listingId,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        listingId: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updateListing = await ctx.prisma.listing.update({
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
        },
        where: {
          id: input.listingId,
        },
      });
      return updateListing;
    }),
  addCart: protectedProcedure
    .input(z.object({ itemName: z.string(), itemPrice: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.cart.create({
        data: {
          itemName: input.itemName,
          itemPrice: input.itemPrice,
          userId: ctx.auth.userId,
        },
      });
    }),
  getCart: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.cart.findMany({
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),
  updateCartItemQuantity: protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
        newQuantity: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.cart.update({
        data: {
          quantity: input.newQuantity,
        },
        where: {
          id: input.itemId,
        },
      });
    }),
  removeCartItem: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.cart.delete({
        where: {
          id: input.itemId,
        },
      });
    }),
  sendMessage: protectedProcedure
    .input(z.object({ message: z.string(), listingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const fromUser = await clerkClient.users.getUser(ctx.auth.userId);

      const message = await ctx.prisma.message.create({
        data: {
          fromUser: ctx.auth.userId,
          fromUserName:
            fromUser.username ||
            `${fromUser?.firstName} ${fromUser?.lastName}` ||
            `${fromUser?.emailAddresses}`,
          message: input.message,
          listingId: input.listingId,
        },
      });
      return message;
    }),
  getMessage: protectedProcedure.query(async ({ ctx, input }) => {
    const messageListings = await ctx.prisma.listing.findMany({
      where: { userId: ctx.auth.userId },
      include: {
        message: true,
      },
    });
    return messageListings.flatMap((item) => item.message);
  }),
});
