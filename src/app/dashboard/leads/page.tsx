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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Progress } from "@/components/ui/progress"
import { PlusIcon, PencilIcon, TrashIcon, MoreHorizontalIcon, SearchIcon, FilterIcon, DownloadIcon, PhoneIcon, MailIcon } from "lucide-react"

interface Lead {
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

const leads: Lead[] = [
  { id: 1, empresa: "Tech Solutions Ltda", cnpj: "12.345.678/0001-90", contato: "Carlos Silva", email: "carlos@techsolutions.com", telefone: "(11) 9999-8888", origem: "Marketing Digital", status: "Novo", valor: 15000, responsible: "João Silva", criadoEm: "01/07/2026" },
  { id: 2, empresa: "Inovação Corp", cnpj: "98.765.432/0001-10", contato: "Maria Santos", email: "maria@inovacao.com", telefone: "(11) 8888-7777", origem: "Indicação", status: "Qualificado", valor: 25000, responsible: "Maria Santos", criadoEm: "28/06/2026" },
  { id: 3, empresa: "Digital Hub", cnpj: "11.222.333/0001-44", contato: "Pedro Costa", email: "pedro@digitalhub.com", telefone: "(11) 7777-6666", origem: "Eventos", status: "Proposta", valor: 45000, responsible: "Pedro Costa", criadoEm: "25/06/2026" },
  { id: 4, empresa: "StartUp Inc", cnpj: "55.666.777/0001-88", contato: "Ana Oliveira", email: "ana@startup.com", telefone: "(11) 6666-5555", origem: "Marketing Digital", status: "Novo", valor: 8000, responsible: "João Silva", criadoEm: "02/07/2026" },
  { id: 5, empresa: "Global Tech", cnpj: "33.444.555/0001-22", contato: "Roberto Lima", email: "roberto@globaltech.com", telefone: "(11) 5555-4444", origem: "Sistema", status: "Descartado", valor: 12000, responsible: "Maria Santos", criadoEm: "20/06/2026" },
]

const statusColors: Record<string, string> = {
  "Novo": "bg-blue-500",
  "Qualificado": "bg-yellow-500",
  "Proposta": "bg-purple-500",
  "Fechado": "bg-green-500",
  "Descartado": "bg-gray-500",
}

export default function LeadsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.empresa.toLowerCase().includes(search.toLowerCase()) ||
      lead.contato.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalLeads = leads.length
  const leadsNovos = leads.filter(l => l.status === "Novo").length
  const leadsQualificados = leads.filter(l => l.status === "Qualificado").length
  const valorTotal = leads.reduce((acc, lead) => acc + lead.valor, 0)

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead)
    setDialogOpen(true)
  }

  const handleNew = () => {
    setEditingLead(null)
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Organizações e contatos de marketing</p>
        </div>
        <Button onClick={handleNew}>
          <PlusIcon className="mr-2 size-4" />
          Novo Lead
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{leadsNovos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualificados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{leadsQualificados}</div>
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
                <SelectItem value="Novo">Novo</SelectItem>
                <SelectItem value="Qualificado">Qualificado</SelectItem>
                <SelectItem value="Proposta">Proposta</SelectItem>
                <SelectItem value="Fechado">Fechado</SelectItem>
                <SelectItem value="Descartado">Descartado</SelectItem>
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
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{lead.empresa}</div>
                      <div className="text-sm text-muted-foreground">{lead.cnpj}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">
                          {lead.contato.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{lead.contato}</div>
                        <div className="text-sm text-muted-foreground">{lead.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.origem}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[lead.status]}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    R$ {lead.valor.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell>{lead.responsible}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button variant="ghost" size="icon" />}
                      >
                        <MoreHorizontalIcon className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(lead)}>
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
                            nativeButton={false}
                            render={<DropdownMenuItem className="text-red-600" />}
                          >
                            <TrashIcon className="mr-2 size-4" />
                            Excluir
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir lead?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. O lead será removido permanentemente.
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
            <DialogTitle>{editingLead ? "Editar Lead" : "Novo Lead"}</DialogTitle>
            <DialogDescription>
              {editingLead ? "Edite as informações do lead" : "Adicione um novo lead ao sistema"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="empresa">Nome da Empresa</Label>
                <Input id="empresa" defaultValue={editingLead?.empresa} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" defaultValue={editingLead?.cnpj} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contato">Nome do Contato</Label>
                <Input id="contato" defaultValue={editingLead?.contato} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={editingLead?.email} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" defaultValue={editingLead?.telefone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="origem">Origem</Label>
                <Select defaultValue={editingLead?.origem}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marketing Digital">Marketing Digital</SelectItem>
                    <SelectItem value="Indicação">Indicação</SelectItem>
                    <SelectItem value="Eventos">Eventos</SelectItem>
                    <SelectItem value="Sistema">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={editingLead?.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Novo">Novo</SelectItem>
                    <SelectItem value="Qualificado">Qualificado</SelectItem>
                    <SelectItem value="Proposta">Proposta</SelectItem>
                    <SelectItem value="Fechado">Fechado</SelectItem>
                    <SelectItem value="Descartado">Descartado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor Estimado</Label>
                <Input id="valor" type="number" defaultValue={editingLead?.valor} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsavel">Responsável</Label>
              <Select defaultValue={editingLead?.responsible}>
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
              <Textarea id="notas" placeholder="Notas sobre o lead..." />
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
