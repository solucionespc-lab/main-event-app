"use client"
import { useState } from "react"
import Link from "next/link"
import { BarChart3, Filter, Home, Package, ShoppingCart, Ticket } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const sidebarItems = [
  { name: "Inicio", icon: Home, href: "/" },
  { name: "Eventos", icon: BarChart3, href: "/eventos" },
  { name: "Boletas Compradas", icon: ShoppingCart, href: "/boletas-compradas" },
  { name: "Boletas en Venta", icon: Ticket, href: "/boletas-en-venta" },
  { name: "Boletas Vendidas", icon: Ticket, href: "/boletas-vendidas" },
  { name: "Suvenires", icon: Package, href: "/suvenires" },
]

const data = [
  { name: "Concierto A", boletas: 400 },
  { name: "Festival B", boletas: 300 },
  { name: "Teatro C", boletas: 200 },
  { name: "Evento D", boletas: 278 },
  { name: "Show E", boletas: 189 },
]

const ticketData = [
  { id: 1, event: "Concierto A", sold: 400, available: 100 },
  { id: 2, event: "Festival B", sold: 300, available: 200 },
  { id: 3, event: "Teatro C", sold: 200, available: 300 },
  { id: 4, event: "Evento D", sold: 278, available: 122 },
  { id: 5, event: "Show E", sold: 189, available: 311 },
]

export default function DashboardPage() {
  const [selectedEvent, setSelectedEvent] = useState("all")

  const filteredTickets = selectedEvent === "all"
    ? ticketData
    : ticketData.filter(ticket => ticket.event === selectedEvent)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5 px-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
            >
              <item.icon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Upperbar */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <div>
                    <Link href="/" className="text-gray-400 hover:text-gray-500">
                      <Home className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Inicio</span>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                    <Link
                      href="#"
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Dashboard
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Boletas Vendidas</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20.1% del mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Boletas Compradas</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">987</div>
                <p className="text-xs text-muted-foreground">+10.5% del mes pasado</p>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Boletas Compradas por Evento</CardTitle>
              <CardDescription>
                Número de boletas compradas para cada evento en el último mes
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="boletas" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Nueva sección: Tabla de Boletas Vendidas */}
          <Card className="mt-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Boletas Vendidas y Disponibles</CardTitle>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar evento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los eventos</SelectItem>
                      {ticketData.map((ticket) => (
                        <SelectItem key={ticket.id} value={ticket.event}>
                          {ticket.event}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Boletas Vendidas</TableHead>
                    <TableHead>Boletas Disponibles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.event}</TableCell>
                      <TableCell>{ticket.sold}</TableCell>
                      <TableCell>{ticket.available}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}