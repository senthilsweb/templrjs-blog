"use server"

import { db } from "@/lib/db"
import { contact_submissions } from "@/lib/db/schema"
import type { ContactSubmission } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export type SortField = keyof ContactSubmission
export type SortOrder = "asc" | "desc"

interface GetSubmissionsParams {
  page: number
  pageSize: number
  sortField?: SortField
  sortOrder?: SortOrder
  search?: string
}

export async function getSubmissions({
  page,
  pageSize,
  sortField,
  sortOrder = "desc",
  search = "",
}: GetSubmissionsParams) {
  try {
    let query = db.select().from(contact_submissions)

    if (search) {
      query = query.where(
        sql`${contact_submissions.name} ILIKE ${`%${search}%`} OR
            ${contact_submissions.email} ILIKE ${`%${search}%`} OR
            ${contact_submissions.description} ILIKE ${`%${search}%`}`,
      )
    }

    const countResult = await db.select({ count: sql<number>`count(*)` }).from(contact_submissions)

    const totalCount = countResult[0].count
    const offset = (page - 1) * pageSize

    if (sortField) {
      query = query.orderBy(sql.identifier(sortField), sortOrder)
    } else {
      query = query.orderBy(contact_submissions.createdAt, "desc")
    }

    const results = await query.limit(pageSize).offset(offset)

    return {
      data: results,
      pagination: {
        total: totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        currentPage: page,
        pageSize,
      },
    }
  } catch (error) {
    console.error("Error fetching submissions:", error)
    throw error
  }
}

export async function addSubmission(data: Omit<ContactSubmission, "id" | "createdAt" | "updatedAt" | "isRead">) {
  try {
    await db.insert(contact_submissions).values({
      ...data,
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    revalidatePath("/contact")
    return { success: true }
  } catch (error) {
    console.error("Error adding submission:", error)
    return { success: false, error: "Failed to add submission" }
  }
}

export async function updateSubmission(id: number, data: Partial<ContactSubmission>) {
  try {
    await db
      .update(contact_submissions)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(contact_submissions.id, id))
    revalidatePath("/contact")
    return { success: true }
  } catch (error) {
    console.error("Error updating submission:", error)
    return { success: false, error: "Failed to update submission" }
  }
}

export async function deleteSubmission(id: number) {
  try {
    await db.delete(contact_submissions).where(eq(contact_submissions.id, id))
    revalidatePath("/contact")
    return { success: true }
  } catch (error) {
    console.error("Error deleting submission:", error)
    return { success: false, error: "Failed to delete submission" }
  }
}

export async function markAsRead(id: number, isRead: boolean) {
  return updateSubmission(id, { isRead })
}

