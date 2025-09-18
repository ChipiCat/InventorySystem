import { useState } from "react"
import { useAppSelector } from "../store"
import { Users, Shield, ShoppingCart, Eye, EyeOff } from "lucide-react"

const DevelopmentHelper = () => {
  const { config } = useAppSelector((state) => state.theme)
  const [showCredentials, setShowCredentials] = useState(false)

  const credentials = [
    {
      role: "Administrador",
      email: "admin@inventario.com",
      password: "Admin123!",
      icon: <Shield className="w-5 h-5 text-red-500" />,
      description: "Acceso completo al sistema"
    },
    {
      role: "Vendedor",
      email: "vendedor@inventario.com", 
      password: "Vendedor123!",
      icon: <ShoppingCart className="w-5 h-5 text-green-500" />,
      description: "Acceso a ventas e inventario"
    }
  ]

  return (
    <div 
      className="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg border max-w-sm z-50"
      style={{
        backgroundColor: config.colors.surface,
        borderColor: config.colors.border,
        boxShadow: 'var(--box-shadow)'
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-5 h-5" style={{ color: config.colors.primary }} />
        <h3 
          className="font-medium text-sm"
          style={{ color: config.colors.text }}
        >
          Usuarios de Desarrollo
        </h3>
      </div>

      <div className="space-y-3">

        <button
          onClick={() => setShowCredentials(!showCredentials)}
          className="w-full flex items-center justify-center gap-2 p-2 text-xs rounded border hover:bg-opacity-80 transition-colors"
          style={{
            borderColor: config.colors.border,
            color: config.colors.textSecondary
          }}
        >
          {showCredentials ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showCredentials ? "Ocultar" : "Ver"} Credenciales
        </button>

        {showCredentials && (
          <div className="space-y-2">
            {credentials.map((cred, index) => (
              <div 
                key={index}
                className="p-2 rounded border text-xs"
                style={{
                  backgroundColor: config.colors.background,
                  borderColor: config.colors.border
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {cred.icon}
                  <span 
                    className="font-medium"
                    style={{ color: config.colors.text }}
                  >
                    {cred.role}
                  </span>
                </div>
                <div 
                  className="text-xs mb-1"
                  style={{ color: config.colors.textSecondary }}
                >
                  {cred.description}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <span style={{ color: config.colors.textSecondary }}>Email:</span>
                    <code 
                      className="px-1 rounded text-xs"
                      style={{ backgroundColor: config.colors.surface }}
                    >
                      {cred.email}
                    </code>
                  </div>
                  <div className="flex items-center gap-1">
                    <span style={{ color: config.colors.textSecondary }}>Pass:</span>
                    <code 
                      className="px-1 rounded text-xs"
                      style={{ backgroundColor: config.colors.surface }}
                    >
                      {cred.password}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DevelopmentHelper
