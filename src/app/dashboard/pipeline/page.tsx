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
} from "@/components/ui/dialog"
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
import { PlusIcon, PencilIcon, MoreHorizontalIcon, KanbanIcon, ListIcon, GripVerticalIcon } from "lucide-react"

interface Deal {
  id: number
  empresa: string
  contato: string
  value: number
  stage: string
  assignedTo: string
  origin: string
  createdAt: string
}

const stages = ["Novo", "Qualificado", "Proposta", "Negociação", "Fechado"]

const deals: Deal[] = [
  { id: 1, empresa: "Tech Solutions", contato: "Carlos Silva", value: 15000, stage: "Novo", assignedTo: "João Silva", origin: "Marketing", createdAt: "01/07/2026" },
  { id: 2, empresa: "Inovação Corp", contato: "Maria Santos", value: 25000, stage: "Qualificado", assignedTo: "Maria Santos", origin: "Indicação", createdAt: "28/06/2026" },
  { id: 3, empresa: "Digital Hub", contato: "Pedro Costa", value: 45000, stage: "Proposta", assignedTo: "Pedro Costa", origin: "Eventos", createdAt: "25/06/2026" },
  { id: 4, empresa: "StartUp Inc", contato: "Ana Oliveira", value: 8000, stage: "Novo", assignedTo: "João Silva", origin: "Marketing", createdAt: "02/07/2026" },
  { id: 5, empresa: "Global Tech", contato: "Roberto Lima", value: 12000, stage: "Negociação", assignedTo: "Maria Santos", origin: "Sistema", createdAt: "20/06/2026" },
  { id: 6, empresa: "Mega Corp", contato: "Fernando Alves", value: 85000, stage: "Fechado", assignedTo: "João Silva", origin: "Venda Direta", createdAt: "15/03/2026" },
  { id: 7, empresa: "Business Plus", contato: "Lucia Ferreira", value: 42000, stage: "Qualificado", assignedTo: "Maria Santos", origin: "Sistema", createdAt: "20/04/2026" },
  { id: 8, empresa: "Enterprise Ltda", contato: "Roberto Santos", value: 120000, stage: "Proposta", assignedTo: "Pedro Costa", origin: "Indicação", createdAt: "10/02/2026" },
]

const stageColors: Record<string, string> = {
  "Novo": "bg-blue-500",
  "Qualificado": "bg-yellow-500",
  "Proposta": "bg-purple-500",
  "Negociação": "bg-orange-500",
  "Fechado": "bg-green-500",
}

export default function PipelinePage() {
  const [view, setView] = useState<"kanban" | "list">("kanban")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null)

  const dealsByStage = stages.reduce((acc, stage) => {
    acc[stage] = deals.filter(deal => deal.stage === stage)
    return acc
  }, {} as Record<string, Deal[]>)

  const totalValue = deals.reduce((acc, deal) => acc + deal.value, 0)
  const closedValue = deals.filter(d => d.stage === "Fechado").reduce((acc, deal) => acc + deal.value, 0)

  const handleEdit = (deal: Deal) => {
    setEditingDeal(deal)
    setDialogOpen(true)
  }

  const handleNew = () => {
    setEditingDeal(null)
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pipeline</h1>
          <p className="text-muted-foreground">Gerencie seus deals</p>
        </div>
        <div className="flex gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "kanban" | "list")}>
            <TabsList>
              <TabsTrigger value="kanban" className="px-3">
                <KanbanIcon className="mr-2 size-4" />
                Kanban
              </TabsTrigger>
              <TabsTrigger value="list" className="px-3">
                <ListIcon className="mr-2 size-4" />
                Lista
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={handleNew}>
            <PlusIcon className="mr-2 size-4" />
            Novo Deal
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deals.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalValue.toLocaleString("pt-BR")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Fechado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">R$ {closedValue.toLocaleString("pt-BR")}</div>
          </CardContent>
        </Card>
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-5 gap-4 min-h-[500px]">
          {stages.map((stage) => (
            <Card key={stage} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{stage}</CardTitle>
                  <Badge className={stageColors[stage]}>
                    {dealsByStage[stage]?.length || 0}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  R$ {(dealsByStage[stage]?.reduce((acc, d) => acc + d.value, 0) || 0).toLocaleString("pt-BR")}
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-2">
                <div className="space-y-2">
                  {dealsByStage[stage]?.map((deal) => (
                    <Card key={deal.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-medium text-sm">{deal.empresa}</div>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={<Button variant="ghost" size="icon" className="size-6" />}
                            >
                              <MoreHorizontalIcon className="size-3" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(deal)}>
                                <PencilIcon className="mr-2 size-3" />
                                Editar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">{deal.contato}</div>
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-sm">R$ {deal.value.toLocaleString("pt-BR")}</div>
                          <Avatar className="size-6">
                            <AvatarFallback className="text-xs">
                              {deal.assignedTo.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Estágio</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{deal.empresa}</TableCell>
                    <TableCell>{deal.contato}</TableCell>
                    <TableCell>
                      <Badge className={stageColors[deal.stage]}>
                        {deal.stage}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      R$ {deal.value.toLocaleString("pt-BR")}
                    </TableCell>
                    <TableCell>{deal.assignedTo}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{deal.origin}</Badge>
                    </TableCell>
                    <TableCell>{deal.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(deal)}>
                        <PencilIcon className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingDeal ? "Editar Deal" : "Novo Deal"}</DialogTitle>
            <DialogDescription>
              {editingDeal ? "Edite as informações do deal" : "Adicione um novo deal ao pipeline"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="empresa">Nome da Empresa</Label>
                <Input id="empresa" defaultValue={editingDeal?.empresa} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato">Contato</Label>
                <Input id="contato" defaultValue={editingDeal?.contato} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="value">Valor</Label>
                <Input id="value" type="number" defaultValue={editingDeal?.value} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage">Estágio</Label>
                <Select defaultValue={editingDeal?.stage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estágio" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="assignedTo">Responsável</Label>
                <Select defaultValue={editingDeal?.assignedTo}>
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
                <Label htmlFor="origin">Origem</Label>
                <Select defaultValue={editingDeal?.origin}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Indicação">Indicação</SelectItem>
                    <SelectItem value="Eventos">Eventos</SelectItem>
                    <SelectItem value="Sistema">Sistema</SelectItem>
                    <SelectItem value="Venda Direta">Venda Direta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea id="notes" placeholder="Notas sobre o deal..." />
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
