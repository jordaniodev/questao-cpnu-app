"use client"

import { UserButton, useUser } from "@clerk/nextjs"

export const UserInfo = () => {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="flex items-center gap-2 rounded-md border p-4">
      <UserButton />
      <div className="flex flex-col">
        <span className="font-medium text-sm">{user.fullName}</span>
        <span className="text-xs text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</span>
      </div>
    </div>
  )
}
