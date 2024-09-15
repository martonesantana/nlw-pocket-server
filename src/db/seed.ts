import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      {
        title: 'Learn Next.js',
        desiredWeeklyFrequency: 5,
      },
      {
        title: 'Learn React',
        desiredWeeklyFrequency: 3,
      },
      {
        title: 'Learn TypeScript',
        desiredWeeklyFrequency: 2,
      },
      {
        title: 'Learn Drizzle',
        desiredWeeklyFrequency: 1,
      },
      {
        title: 'Learn Drizzle2',
        desiredWeeklyFrequency: 4,
      },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() },
    { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
