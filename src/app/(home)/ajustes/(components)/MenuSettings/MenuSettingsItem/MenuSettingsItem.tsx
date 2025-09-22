interface ItemsSettings {
  icon: React.ReactNode;
  description: string;
  action?: () => void;
}

interface MenuSettingsItemProps {
  items: ItemsSettings;
}

export const MenuSettingsItem = ({ items }: MenuSettingsItemProps) => {
  return (
    <button
      onClick={items.action}
      className="self-start p-4 w-full flex items-center gap-2 text-sm border-b last:border-b-0"
    >
      {items.icon}
      {items.description}
    </button>
  )
}
