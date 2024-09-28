'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, QrCodeIcon, TicketIcon } from 'lucide-react'
import { QrReader } from 'react-qr-reader'
import { Progress } from "@/components/ui/progress"
import Confetti from 'react-confetti'

interface Event {
  id: number
  name: string
  date: string
  location: string
  image: string
  totalTickets: number
}

interface AuthorizedTicket {
  id: string
  eventId: number
}

export default function LogisticsPage() {
  const [authorizedTickets, setAuthorizedTickets] = useState<AuthorizedTicket[]>([])
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [scannedTicket, setScannedTicket] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState<number | null>(null)

  const assignedEvents: Event[] = [
    { id: 1, name: 'Concierto de Rock', date: '2023-07-15', location: 'Estadio Nacional', image: 'https://st3.depositphotos.com/9999814/36454/i/450/depositphotos_364544044-stock-photo-happy-people-dance-nightclub-party.jpg', totalTickets: 2 },
    { id: 2, name: 'Festival de Jazz', date: '2023-08-01', location: 'Parque Central', image: 'https://wallpapers.com/images/hd/musicade-jazz-wikipedia-7mfwh46z6elzmflu.jpg', totalTickets: 10 },
    { id: 3, name: 'Obra de Teatro', date: '2023-08-10', location: 'Teatro Municipal', image: 'https://inteligentisimo.com/wp-content/uploads/escenario-teatral.jpg', totalTickets: 2 },
  ]

  const handleScan = (result: { text: string } | null, eventId: number) => {
    if (result?.text) {
      setScannedTicket(result.text)
    }
  }

  const handleError = (error: unknown) => {
    console.error(error)
  }

  const toggleEventExpansion = (eventId: number) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId)
    setScannedTicket(null)
  }

  const authorizeTicket = (eventId: number) => {
    if (scannedTicket) {
      setAuthorizedTickets(prev => {
        const newAuthorizedTickets = [...prev, { id: scannedTicket, eventId }]
        const event = assignedEvents.find(e => e.id === eventId)
        if (event && newAuthorizedTickets.filter(t => t.eventId === eventId).length === event.totalTickets) {
          setShowConfetti(eventId)
          setExpandedEvent(null) // Hide camera when total tickets are reached
        }
        return newAuthorizedTickets
      })
      setScannedTicket(null)
    }
  }

  const getAuthorizedTicketsCount = (eventId: number) => 
    authorizedTickets.filter(ticket => ticket.eventId === eventId).length

  const getProgress = (eventId: number) => {
    const event = assignedEvents.find(e => e.id === eventId)
    if (!event) return 0
    return (getAuthorizedTicketsCount(eventId) / event.totalTickets) * 100
  }

  useEffect(() => {
    if (showConfetti !== null) {
      const timer = setTimeout(() => setShowConfetti(null), 5000) // Confetti duration: 5 seconds
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Panel de Logística</h1>
      
      <div className="space-y-6">
        {assignedEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden relative">
            {showConfetti === event.id && (
              <div className="absolute inset-0 z-10">
                <Confetti width={500} height={300} recycle={false} />
              </div>
            )}
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }} />
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center text-sm text-gray-500 mb-2">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {event.date}
              </p>
              <p className="text-sm text-gray-500 mb-2">{event.location}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progreso de autorización</span>
                <span className="text-sm font-medium">
                  {getAuthorizedTicketsCount(event.id)} / {event.totalTickets}
                </span>
              </div>
              <Progress value={getProgress(event.id)} className="w-full" />
              {getAuthorizedTicketsCount(event.id) < event.totalTickets && (
                <Button 
                  onClick={() => toggleEventExpansion(event.id)} 
                  className="w-full mt-4"
                >
                  <QrCodeIcon className="mr-2 h-4 w-4" />
                  {expandedEvent === event.id ? 'Ocultar Escáner' : 'Mostrar Escáner'}
                </Button>
              )}
              {getAuthorizedTicketsCount(event.id) === event.totalTickets && (
                <p className="text-center text-green-600 font-bold mt-4">
                  ¡Felicidades! Todas las boletas han sido autorizadas.
                </p>
              )}
            </CardContent>
            {expandedEvent === event.id && getAuthorizedTicketsCount(event.id) < event.totalTickets && (
              <CardFooter className="flex flex-col items-center space-y-4">
                <div className="w-full aspect-square">
                  <QrReader
                    constraints={{ facingMode: 'environment' }}
                    delay={300}
                    onError={handleError}
                    onResult={(result) => handleScan(result, event.id)}
                    style={{ width: '60%', height: '40%' }}
                  />
                </div>
                {scannedTicket && (
                  <div className="w-full text-center">
                    <p className="mb-2">Ticket escaneado: {scannedTicket}</p>
                    <Button onClick={() => authorizeTicket(event.id)}>
                      Autorizar Boleta
                    </Button>
                  </div>
                )}
              </CardFooter>
            )}
            <CardFooter className="flex flex-col items-center space-y-4">
              <div className="w-full">
                <h3 className="font-semibold mb-2">Boletas Autorizadas:</h3>
                <ul className="max-h-40 overflow-y-auto">
                  {authorizedTickets
                    .filter(ticket => ticket.eventId === event.id)
                    .map(ticket => (
                      <li key={ticket.id} className="flex items-center text-sm text-gray-600 mb-1">
                        <TicketIcon className="mr-2 h-4 w-4" />
                        {ticket.id}
                      </li>
                    ))}
                </ul>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}