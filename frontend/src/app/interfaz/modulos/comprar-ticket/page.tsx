"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, MapPinIcon, ArrowLeftIcon, PlusIcon, MinusIcon } from "lucide-react"

const eventos = [
  { id: "1", nombre: "Rock Legends Festival 2023", fecha: "15 de Agosto, 2023", lugar: "Estadio Nacional", imagen: "/placeholder.svg?height=100&width=200" },
  { id: "2", nombre: "Metal Mayhem Concert", fecha: "22 de Septiembre, 2023", lugar: "Arena Central", imagen: "/placeholder.svg?height=100&width=200" },
  { id: "3", nombre: "Indie Rock Showcase", fecha: "5 de Octubre, 2023", lugar: "Parque de la Ciudad", imagen: "/placeholder.svg?height=100&width=200" },
  { id: "4", nombre: "Classic Rock Revival", fecha: "19 de Noviembre, 2023", lugar: "Teatro Metropolitano", imagen: "/placeholder.svg?height=100&width=200" },
]

export default function Component() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [qrCodes, setQrCodes] = useState<string[]>([])
  const [ticketCount, setTicketCount] = useState(1)

  const handleEventSelect = (eventId: string) => {
    const event = eventos.find(e => e.id === eventId)
    setSelectedEvent(event?.nombre || null)
    setQrCodes([]) // Reset QR codes when a new event is selected
  }

  const handleCompra = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedEvent) {
      const newQrCodes = Array.from({ length: ticketCount }, (_, index) => 
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(selectedEvent)}_${index + 1}`
      )
      setQrCodes(newQrCodes)
    }
  }

  const handleBack = () => {
    setSelectedEvent(null)
    setQrCodes([])
  }

  const incrementTicket = () => {
    setTicketCount(prev => Math.min(prev + 1, 10))
  }

  const decrementTicket = () => {
    setTicketCount(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Boletería de Rock</h1>
      
      {!selectedEvent ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventos.map((evento) => (
            <Card key={evento.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <img src={evento.imagen} alt={evento.nombre} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle>{evento.nombre}</CardTitle>
                <main>
                  <div className="flex items-center mt-2">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>{evento.fecha}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    <span>{evento.lugar}</span>
                  </div>
                </main>
              </CardHeader>
              <CardFooter>
                <Button 
                  onClick={() => handleEventSelect(evento.id)}
                  className="w-full"
                >
                  Seleccionar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <Button variant="outline" onClick={handleBack} className="mb-4">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Volver a eventos
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Compra tu Boleta</CardTitle>
              <CardDescription>Para: {selectedEvent}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCompra} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" placeholder="Tu nombre completo" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cantidad">Cantidad de boletas</Label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={decrementTicket}
                      disabled={ticketCount <= 1}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <Input 
                      id="cantidad" 
                      type="number" 
                      min="1" 
                      max="10" 
                      value={ticketCount}
                      onChange={(e) => setTicketCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                      className="w-20 text-center"
                      required 
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={incrementTicket}
                      disabled={ticketCount >= 10}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full">Comprar Boleta</Button>
              </form>
            </CardContent>
          </Card>

          {qrCodes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tus Boletas para {selectedEvent}</CardTitle>
                <CardDescription>Escanea estos códigos QR para acceder al evento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-4">
                  {qrCodes.map((qrCode, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <img src={qrCode} alt={`Código QR de la boleta ${index + 1}`} className="w-[150px] h-[150px]" />
                      <p className="mt-2 text-sm text-muted-foreground">Boleta {index + 1}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <p className="text-sm text-muted-foreground">Guarda estos códigos para el día del evento. ¡Prepárate para rockear!</p>
              </CardFooter>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}