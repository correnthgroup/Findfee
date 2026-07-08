"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PlusIcon, PencilIcon, TrashIcon, MoreHorizontalIcon, SearchIcon, FilterIcon, DownloadIcon, PhoneIcon, MailIcon } from "lucide-react"

interface Cliente {
  id: number
  empresa: string
  cnpj: string
  contato: string
  email: string
  telefone: string
  origem: string
  status: string
  valor: number
  responsible: string
  criadoEm: string
}

const clientes: Cliente[] = [
  { id: 1, empresa: "Mega Corp", cnpj: "11.111.111/0001-11", contato: "Fernando Alves", email: "fernando@megacorp.com", telefone: "(11) 9999-1111", origem: "Venda Direta", status: "Ativo", valor: 85000, responsible: "João Silva", criadoEm: "15/03/2026" },
  { id: 2, empresa: "Business Plus", cnpj: "22.222.222/0001-22", contato: "Lucia Ferreira", email: "lucia@businessplus.com", telefone: "(11) 8888-2222", origem: "Sistema", status: "Ativo", valor: 42000, responsible: "Maria Santos", criadoEm: "20/04/2026" },
  { id: 3, empresa: "Enterprise Ltda", cnpj: "33.333.333/0001-33", contato: "Roberto Santos", email: "roberto@enterprise.com", telefone: "(11) 7777-3333", origem: "Indicação", status: "Ativo", valor: 120000, responsible: "Pedro Costa", criadoEm: "10/02/2026" },
  { id: 4, empresa: "Small Business Inc", cnpj: "44.444.444/0001-44", contato: "Mariana Costa", email: "mariana@smallbiz.com", telefone: "(11) 6666-4444", origem: "Venda Direta", status: "Inativo", valor: 15000, responsible: "João Silva", criadoEm: "05/05/2026" },
]

const statusColors: Record<string, string> = {
  "Ativo": "bg-green-500",
  "Inativo": "bg-gray-500",
  "Suspenso": "bg-yellow-500",
}

export default function ClientesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null)

  const filteredClientes = clientes.filter((cliente) => {
    const matchesSearch = cliente.empresa.toLowerCase().includes(search.toLowerCase()) ||
      cliente.contato.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || cliente.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalClientes = clientes.length
  const clientesAtivos = clientes.filter(c => c.status === "Ativo").length
  const clientesInativos = clientes.filter(c => c.status === "Inativo").length
  const valorTotal = clientes.reduce((acc, cliente) => acc + cliente.valor, 0)

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente)
    setDialogOpen(true)
  }

  const handleNew = () => {
    setEditingCliente(null)
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">Organizações e contatos de vendas</p>
        </div>
        <Button onClick={handleNew}>
          <PlusIcon className="mr-2 size-4" />
          Novo Cliente
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClientes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{clientesAtivos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-500">{clientesInativos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {valorTotal.toLocaleString("pt-BR")}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por empresa ou contato..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
              <SelectTrigger className="w-48">
                <FilterIcon className="mr-2 size-4" />
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
                <SelectItem value="Suspenso">Suspenso</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <DownloadIcon className="mr-2 size-4" />
              Exportar
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{cliente.empresa}</div>
                      <div className="text-sm text-muted-foreground">{cliente.cnpj}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">
                          {cliente.contato.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{cliente.contato}</div>
                        <div className="text-sm text-muted-foreground">{cliente.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{cliente.origem}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[cliente.status]}>
                      {cliente.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    R$ {cliente.valor.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell>{cliente.responsible}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button variant="ghost" size="icon" />}
                      >
                        <MoreHorizontalIcon className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(cliente)}>
                          <PencilIcon className="mr-2 size-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <PhoneIcon className="mr-2 size-4" />
                          Ligar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MailIcon className="mr-2 size-4" />
                          Enviar Email
                        </DropdownMenuItem>
                        <Separator />
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={<DropdownMenuItem className="text-red-600" />}
                          >
                            <TrashIcon className="mr-2 size-4" />
                            Excluir
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir cliente?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. O cliente será removido permanentemente.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction>Excluir</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingCliente ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
            <DialogDescription>
              {editingCliente ? "Edite as informações do cliente" : "Adicione um novo cliente ao sistema"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="empresa">Nome da Empresa</Label>
                <Input id="empresa" defaultValue={editingCliente?.empresa} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" defaultValue={editingCliente?.cnpj} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contato">Nome do Contato</Label>
                <Input id="contato" defaultValue={editingCliente?.contato} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={editingCliente?.email} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" defaultValue={editingCliente?.telefone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="origem">Origem</Label>
                <Select defaultValue={editingCliente?.origem}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Venda Direta">Venda Direta</SelectItem>
                    <SelectItem value="Sistema">Sistema</SelectItem>
                    <SelectItem value="Indicação">Indicação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={editingCliente?.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                    <SelectItem value="Suspenso">Suspenso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor do Contrato</Label>
                <Input id="valor" type="number" defaultValue={editingCliente?.valor} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsavel">Responsável</Label>
              <Select defaultValue={editingCliente?.responsible}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="João Silva">João Silva</SelectItem>
                  <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                  <SelectItem value="Pedro Costa">Pedro Costa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notas">Observações</Label>
              <Textarea id="notas" placeholder="Notas sobre o cliente..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => setDialogOpen(false)}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
