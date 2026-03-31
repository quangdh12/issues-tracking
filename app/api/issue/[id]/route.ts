import { db } from '@/db'
import { issues } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { connection } from 'next/server'

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  await connection()
  try {
    const { id } = await params
    const issue = await db.query.issues.findFirst({
      where: eq(issues.id, parseInt(id)),
    })

    return NextResponse.json({ data: { issue } })
  } catch (error) {
    console.error('Error fetching issue:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching the issue' },
      { status: 500 },
    )
  }
}
