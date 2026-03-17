import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, courses, blogPosts, eBooks, advertisements, type Course, type InsertCourse, type BlogPost, type InsertBlogPost, type EBook, type InsertEBook, type Advertisement, type InsertAdvertisement } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================
// Courses
// ============================================================

export async function getAllCourses(): Promise<Course[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(courses);
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCourse(course: InsertCourse): Promise<Course> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(courses).values(course);
  return getCourseById(course.id) as Promise<Course>;
}

export async function updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(courses).set(course).where(eq(courses.id, id));
  return getCourseById(id) as Promise<Course>;
}

export async function deleteCourse(id: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(courses).where(eq(courses.id, id));
}

// ============================================================
// Blog Posts
// ============================================================

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts);
}

export async function getBlogPostById(id: string): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blogPosts).values(post);
  return getBlogPostById(post.id) as Promise<BlogPost>;
}

export async function updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(blogPosts).set(post).where(eq(blogPosts.id, id));
  return getBlogPostById(id) as Promise<BlogPost>;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// ============================================================
// E-Books
// ============================================================

export async function getAllEBooks(): Promise<EBook[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(eBooks);
}

export async function getEBookById(id: string): Promise<EBook | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(eBooks).where(eq(eBooks.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createEBook(book: InsertEBook): Promise<EBook> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(eBooks).values(book);
  return getEBookById(book.id) as Promise<EBook>;
}

export async function updateEBook(id: string, book: Partial<InsertEBook>): Promise<EBook> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(eBooks).set(book).where(eq(eBooks.id, id));
  return getEBookById(id) as Promise<EBook>;
}

export async function deleteEBook(id: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(eBooks).where(eq(eBooks.id, id));
}

// ============================================================
// Advertisements
// ============================================================

export async function getAllAdvertisements(): Promise<Advertisement[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(advertisements);
}

export async function getAdvertisementById(id: string): Promise<Advertisement | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(advertisements).where(eq(advertisements.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createAdvertisement(ad: InsertAdvertisement): Promise<Advertisement> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(advertisements).values(ad);
  return getAdvertisementById(ad.id) as Promise<Advertisement>;
}

export async function updateAdvertisement(id: string, ad: Partial<InsertAdvertisement>): Promise<Advertisement> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(advertisements).set(ad).where(eq(advertisements.id, id));
  return getAdvertisementById(id) as Promise<Advertisement>;
}

export async function deleteAdvertisement(id: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(advertisements).where(eq(advertisements.id, id));
}
