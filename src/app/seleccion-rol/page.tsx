'use client'

import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, ShieldCheck, Truck } from "lucide-react"

export default function Component() {
  const router = useRouter()

  const handleSelection = (role: 'buyer' | 'admin' | 'logistics') => {
    if (role === 'buyer') {
      router.push('/comprar-ticket')
    } else if (role === 'admin') {
      router.push('/dashboard')
    } else {
      router.push('/logistica')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        <Card className="w-[300px] bg-gray-800 border-2 border-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center justify-center">
              <User className="mr-2 h-5 w-5 text-white" />
              Soy Comprador
            </CardTitle>
            <CardDescription className="text-gray-300 text-center">
              Acceda para comprar tickets de eventos
            </CardDescription>
          </CardHeader>
          <CardContent className="text-white text-center">
            <p>Explore y adquiera tickets para los mejores eventos.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={() => handleSelection('buyer')}
              className="w-full bg-white hover:bg-gray-200 text-gray-800 font-semibold transition-colors duration-300"
            >
              Comprar Ticket
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-[300px] bg-gray-800 border-2 border-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center justify-center">
              <ShieldCheck className="mr-2 h-5 w-5 text-white" />
              Soy Administrador
            </CardTitle>
            <CardDescription className="text-gray-300 text-center">
              Acceda al panel de control administrativo
            </CardDescription>
          </CardHeader>
          <CardContent className="text-white text-center">
            <p>Gestione eventos, usuarios y reportes desde un solo lugar.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={() => handleSelection('admin')}
              className="w-full bg-white hover:bg-gray-200 text-gray-800 font-semibold transition-colors duration-300"
            >
              Acceder al Dashboard
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-[300px] bg-gray-800 border-2 border-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center justify-center">
              <Truck className="mr-2 h-5 w-5 text-white" />
              Soy de Logística
            </CardTitle>
            <CardDescription className="text-gray-300 text-center">
              Acceda a la gestión de eventos asignados
            </CardDescription>
          </CardHeader>
          <CardContent className="text-white text-center">
            <p>Vea los eventos asignados y escanee códigos QR para validar entradas.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={() => handleSelection('logistics')}
              className="w-full bg-white hover:bg-gray-200 text-gray-800 font-semibold transition-colors duration-300"
            >
              Acceder a Logística
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}