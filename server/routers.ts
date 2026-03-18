import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Admin routes for managing courses, blog, ebooks, and ads
  admin: router({
    courses: router({
      list: adminProcedure.query(() => db.getAllCourses()),
      getById: adminProcedure.input(z.object({ id: z.string() })).query(({ input }) => db.getCourseById(input.id)),
      create: adminProcedure.input(z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        category: z.enum(["tecnologia", "idiomas", "corporativo"]),
        niche: z.string(),
        level: z.enum(["iniciante", "intermediario", "avancado"]),
        price: z.string(),
        originalPrice: z.string().optional(),
        instructor: z.string(),
        rating: z.string().optional(),
        students: z.number().optional(),
        benefits: z.array(z.string()),
        tags: z.array(z.string()),
        affiliateUrl: z.string(),
        isRecommended: z.boolean().optional(),
        isFeatured: z.boolean().optional(),
      })).mutation(({ input }) => db.createCourse({
        id: nanoid(),
        ...input,
        price: parseFloat(input.price),
        originalPrice: input.originalPrice ? parseFloat(input.originalPrice) : undefined,
        rating: input.rating ? parseFloat(input.rating) : undefined,
      })),
      update: adminProcedure.input(z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        category: z.enum(["tecnologia", "idiomas", "corporativo"]).optional(),
        niche: z.string().optional(),
        level: z.enum(["iniciante", "intermediario", "avancado"]).optional(),
        price: z.string().optional(),
        originalPrice: z.string().optional(),
        instructor: z.string().optional(),
        rating: z.string().optional(),
        students: z.number().optional(),
        benefits: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        affiliateUrl: z.string().optional(),
        isRecommended: z.boolean().optional(),
        isFeatured: z.boolean().optional(),
      })).mutation(({ input }) => {
        const { id, ...data } = input;
        return db.updateCourse(id, {
          ...data,
          price: data.price ? parseFloat(data.price) : undefined,
          originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : undefined,
          rating: data.rating ? parseFloat(data.rating) : undefined,
        });
      }),
      delete: adminProcedure.input(z.object({ id: z.string() })).mutation(({ input }) => db.deleteCourse(input.id)),
    }),
    blog: router({
      list: adminProcedure.query(() => db.getAllBlogPosts()),
      getById: adminProcedure.input(z.object({ id: z.string() })).query(({ input }) => db.getBlogPostById(input.id)),
      create: adminProcedure.input(z.object({
        title: z.string(),
        slug: z.string(),
        excerpt: z.string(),
        content: z.string(),
        image: z.string(),
        category: z.string(),
        author: z.string(),
        readTime: z.number(),
      })).mutation(({ input }) => db.createBlogPost({
        id: nanoid(),
        ...input,
      })),
      update: adminProcedure.input(z.object({
        id: z.string(),
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        image: z.string().optional(),
        category: z.string().optional(),
        author: z.string().optional(),
        readTime: z.number().optional(),
      })).mutation(({ input }) => {
        const { id, ...data } = input;
        return db.updateBlogPost(id, data);
      }),
      delete: adminProcedure.input(z.object({ id: z.string() })).mutation(({ input }) => db.deleteBlogPost(input.id)),
    }),
    ebooks: router({
      list: adminProcedure.query(() => db.getAllEBooks()),
      getById: adminProcedure.input(z.object({ id: z.string() })).query(({ input }) => db.getEBookById(input.id)),
      create: adminProcedure.input(z.object({
        title: z.string(),
        description: z.string(),
        fileUrl: z.string(),
        fileName: z.string(),
        fileSize: z.number(),
        category: z.string(),
      })).mutation(({ input }) => db.createEBook({
        id: nanoid(),
        ...input,
      })),
      update: adminProcedure.input(z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        fileUrl: z.string().optional(),
        fileName: z.string().optional(),
        fileSize: z.number().optional(),
        category: z.string().optional(),
      })).mutation(({ input }) => {
        const { id, ...data } = input;
        return db.updateEBook(id, data);
      }),
      delete: adminProcedure.input(z.object({ id: z.string() })).mutation(({ input }) => db.deleteEBook(input.id)),
    }),
    ads: router({
      list: adminProcedure.query(() => db.getAllAdvertisements()),
      getById: adminProcedure.input(z.object({ id: z.string() })).query(({ input }) => db.getAdvertisementById(input.id)),
      create: adminProcedure.input(z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string(),
        linkUrl: z.string(),
        placement: z.enum(["hero", "sidebar", "footer", "modal"]),
        isActive: z.boolean().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        priority: z.number().optional(),
      })).mutation(({ input }) => db.createAdvertisement({
        id: nanoid(),
        ...input,
      })),
      update: adminProcedure.input(z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        linkUrl: z.string().optional(),
        placement: z.enum(["hero", "sidebar", "footer", "modal"]).optional(),
        isActive: z.boolean().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        priority: z.number().optional(),
      })).mutation(({ input }) => {
        const { id, ...data } = input;
        return db.updateAdvertisement(id, data);
      }),
      delete: adminProcedure.input(z.object({ id: z.string() })).mutation(({ input }) => db.deleteAdvertisement(input.id)),
    }),
  }),
});

export type AppRouter = typeof appRouter;