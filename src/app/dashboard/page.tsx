'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Home, UserPlus, Calendar, BarChart2, CreditCard, HelpCircle, Menu, User, ShoppingBag } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserButton } from '@clerk/nextjs'

const sidebarItems = [
  { icon: Home, label: 'Administrar eventos', href: '/dashboard/eventos' },
  { icon: UserPlus, label: 'Asignar logistica', href: '/registro' },
  { icon: Calendar, label: 'Administrar eventos', href: '/jiji' },
  { icon: BarChart2, label: 'Monitoreo de ventas', href: '/ventas' },
  { icon: CreditCard, label: 'Pagos y finanzas', href: '/pagos' },
  { icon: ShoppingBag, label: 'Suvenires', href: '/suvenires' },
  { icon: HelpCircle, label: 'Soporte para vendedores', href: '/soporte' },
]

const chartData = [
  { name: 'Concierto A', ventas: 4000 },
  { name: 'Festival B', ventas: 3000 },
  { name: 'Teatro C', ventas: 2000 },
  { name: 'Evento D', ventas: 2780 },
  { name: 'Show E', ventas: 1890 },
]

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const Sidebar = () => (
    <div className="flex flex-col h-full p-3 bg-gray-900 text-white">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <Menu />
          </Button>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {sidebarItems.map((item, index) => (
              <li key={index} className="rounded-sm">
                <Link href={item.href} className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-800">
                  <item.icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-gray-900">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <h1 className="ml-4 text-2xl font-semibold text-gray-800">Dashboard</h1>
          </div>
         <UserButton />
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Resumen de ventas</h3>
            
            <div className="mt-4">
              <div className="flex flex-wrap -mx-6">
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total de ventas</CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground">+20.1% respecto al mes anterior</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3 mt-4 sm:mt-0">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Boletos vendidos</CardTitle>
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">13,670</div>
                      <p className="text-xs text-muted-foreground">+15% respecto al mes anterior</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full px-6 xl:w-1/3 mt-4 xl:mt-0">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Eventos activos</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">+2 nuevos eventos esta semana</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ventas de boletos por evento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="ventas" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}