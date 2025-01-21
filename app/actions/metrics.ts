"use server"

import { db } from "@/lib/db"
import { perf_test_metrics } from "@/lib/db/schema"
import type { Metric } from "@/lib/db/schema"
import { eq, sql, desc, asc } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export type SortField = keyof Metric
export type SortOrder = "asc" | "desc"

interface GetMetricsParams {
  page: number
  pageSize: number
  sortField?: SortField
  sortOrder?: SortOrder
  search?: string
}

export async function getMetrics({ page, pageSize, sortField, sortOrder = "asc", search = "" }: GetMetricsParams) {
  try {
    let query = db.select().from(perf_test_metrics)

    // Add search condition if search string is provided
    if (search) {
      query = query.where(
        sql`${perf_test_metrics.datasourceDescription} ILIKE ${`%${search}%`} OR
            ${perf_test_metrics.fileType} ILIKE ${`%${search}%`} OR
            ${perf_test_metrics.dataSourceType} ILIKE ${`%${search}%`}`,
      )
    }

    // Get total count
    const countResult = await db.select({ count: sql<number>`count(*)` }).from(perf_test_metrics)

    const totalCount = Number(countResult[0].count)
    const offset = (page - 1) * pageSize

    // Add sorting
    if (sortField) {
      const sortColumn = perf_test_metrics[sortField as keyof typeof perf_test_metrics]
      if (sortColumn) {
        query = query.orderBy(sortOrder === "desc" ? desc(sortColumn) : asc(sortColumn))
      }
    } else {
      query = query.orderBy(desc(perf_test_metrics.id))
    }

    // Add pagination
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
    console.error("Error fetching metrics:", error)
    throw error
  }
}

export async function addMetric(data: Omit<Metric, "id" | "createdAt" | "updatedAt">) {
  try {
    await db.insert(perf_test_metrics).values({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    revalidatePath("/metrics")
    return { success: true }
  } catch (error) {
    console.error("Error adding metric:", error)
    return { success: false, error: "Failed to add metric" }
  }
}

export async function updateMetric(id: number, data: Partial<Metric>) {
  try {
    await db
      .update(perf_test_metrics)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(perf_test_metrics.id, id))
    revalidatePath("/metrics")
    return { success: true }
  } catch (error) {
    console.error("Error updating metric:", error)
    return { success: false, error: "Failed to update metric" }
  }
}

export async function deleteMetric(id: number) {
  try {
    await db.delete(perf_test_metrics).where(eq(perf_test_metrics.id, id))
    revalidatePath("/metrics")
    return { success: true }
  } catch (error) {
    console.error("Error deleting metric:", error)
    return { success: false, error: "Failed to delete metric" }
  }
}

