'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Event = {
  id: number
  name: string
  date: string
  price: number
  location: string
  maxTickets: number
  souvenir: boolean
  souvenirItem?: string
}

export default function EventManagement() {
  const [events, setEvents] = useState<Event[]>([])
  const [currentEvent, setCurrentEvent] = useState<Event>({
    id: 0,
    name: '',
    date: '',
    price: 0,
    location: '',
    maxTickets: 0,
    souvenir: false,
    souvenirItem: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [souvenirItems, setSouvenirItems] = useState<string[]>(['Camiseta', 'Póster', 'Llavero'])
  const [newSouvenirItem, setNewSouvenirItem] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setCurrentEvent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing) {
      setEvents(events.map(event => event.id === currentEvent.id ? currentEvent : event))
    } else {
      setEvents([...events, { ...currentEvent, id: Date.now() }])
    }
    resetForm()
  }

  const resetForm = () => {
    setCurrentEvent({
      id: 0,
      name: '',
      date: '',
      price: 0,
      location: '',
      maxTickets: 0,
      souvenir: false,
      souvenirItem: ''
    })
    setIsEditing(false)
  }

  const editEvent = (event: Event) => {
    setCurrentEvent(event)
    setIsEditing(true)
  }

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id))
  }

  const addSouvenirItem = () => {
    if (newSouvenirItem && !souvenirItems.includes(newSouvenirItem)) {
      setSouvenirItems([...souvenirItems, newSouvenirItem])
      setNewSouvenirItem('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{isEditing ? 'Actualizar Evento' : 'Crear Evento'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre del Evento</Label>
              <Input id="name" name="name" value={currentEvent.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="date">Fecha del Evento</Label>
              <Input id="date" name="date" type="date" value={currentEvent.date} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="price">Precio de la Entrada</Label>
              <Input id="price" name="price" type="number" value={currentEvent.price} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="location">Ubicación del Evento</Label>
              <Input id="location" name="location" value={currentEvent.location} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="maxTickets">Entradas Máximas</Label>
              <Input id="maxTickets" name="maxTickets" type="number" value={currentEvent.maxTickets} onChange={handleInputChange} required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="souvenir" 
                name="souvenir" 
                checked={currentEvent.souvenir} 
                onCheckedChange={(checked) => setCurrentEvent(prev => ({ ...prev, souvenir: checked as boolean }))}
              />
              <Label htmlFor="souvenir">Recuerdo Incluido</Label>
            </div>
            {currentEvent.souvenir && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="souvenirItem">Seleccionar Recuerdo</Label>
                  <Select 
                    value={currentEvent.souvenirItem} 
                    onValueChange={(value) => setCurrentEvent(prev => ({ ...prev, souvenirItem: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un recuerdo" />
                    </SelectTrigger>
                    <SelectContent>
                      {souvenirItems.map((item, index) => (
                        <SelectItem key={index} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Añadir nuevo recuerdo" 
                    value={newSouvenirItem} 
                    onChange={(e) => setNewSouvenirItem(e.target.value)}
                  />
                  <Button type="button" onClick={addSouvenirItem}>Añadir</Button>
                </div>
              </div>
            )}
            <Button type="submit">{isEditing ? 'Actualizar' : 'Guardar'}</Button>
            {isEditing && <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Entradas Máx.</TableHead>
                <TableHead>Recuerdo</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map(event => (
                <TableRow key={event.id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>${event.price}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.maxTickets}</TableCell>
                  <TableCell>{event.souvenir ? (event.souvenirItem || 'Sí') : 'No'}</TableCell>
                  <TableCell>
                    <Button variant="outline" className="mr-2" onClick={() => editEvent(event)}>Editar</Button>
                    <Button variant="destructive" onClick={() => deleteEvent(event.id)}>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}