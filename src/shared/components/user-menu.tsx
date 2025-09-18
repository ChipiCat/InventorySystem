import { User } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

export function UserMenu() {
  const { user } = useAuth()

  if (!user) return null


  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "administrador":
        return "Administrador"
      case "vendedor":
        return "Vendedor"
      default:
        return role
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm">
        <User className="h-4 w-4" />
        <div className="flex flex-col">
          <span className="font-medium">{user?.name || user?.email}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {user?.role ? getRoleDisplayName(user.role) : 'Usuario'}
          </span>
        </div>
      </div>
      
    </div>
  )
}
