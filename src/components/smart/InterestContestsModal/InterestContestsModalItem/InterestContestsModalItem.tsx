'use client'
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

interface InterestContestsModalItemProps {
  title: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export const InterestContestsModalItem = ({ title, checked = false, onChange }: InterestContestsModalItemProps) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleChange = (value: boolean) => {
    setIsChecked(value)
    onChange?.(value)
  }

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox checked={isChecked} onCheckedChange={handleChange} />
      <p className="text-foreground text-xs font-normal">{title}</p>
    </label>
  )
}
