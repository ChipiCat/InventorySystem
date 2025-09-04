import { User } from "lucide-react"
import { useAuth } from "./use-auth"

export function UserMenu() {
  const { user, userProfile, signOut } = useAuth()

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
          <span className="font-medium">{userProfile?.name || user.displayName || user.email}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {userProfile?.role ? getRoleDisplayName(userProfile.role) : 'Usuario'}
          </span>
        </div>
      </div>
      
    </div>
  )
}
