import { db } from '@/db'
import { issues } from '@/db/schema'
import { getCurrentUser } from '@/lib/dal'
import { NextRequest, NextResponse } from 'next/server'
import { connection } from 'next/server'

export const GET = async () => {
  await connection()
  try {
    const issues = await db.query.issues.findMany({})
    return NextResponse.json({ data: { issues } })
  } catch (error) {
    console.error('Error fetching issues:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching issues' },
      { status: 500 },
    )
  }
}

export const POST = async (req: NextRequest) => {
  await connection()
  try {
    const user = await getCurrentUser()
    const newIssueData = await req.json()

    const [newIssue] = await db
      .insert(issues)
      .values({ userId: user?.id, ...newIssueData })
      .returning()
    return NextResponse.json({ data: { newIssue } })
  } catch (error) {
    console.error('Error creating issue:', error)
    return NextResponse.json(
      { error: 'An error occurred while creating the issue' },
      { status: 500 },
    )
  }
}
