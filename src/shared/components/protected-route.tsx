import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "./use-auth"
import type { UserRole } from "./auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = "/login" 
}: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />
  }

  if (requiredRole && userProfile?.role !== requiredRole && userProfile?.role !== "administrador") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Acceso Denegado</h2>
          <p className="text-gray-600 dark:text-gray-400">
            No tienes permisos para acceder a esta página.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
