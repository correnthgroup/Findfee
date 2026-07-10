"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
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
import { PlusIcon, PencilIcon, TrashIcon, SaveIcon } from "lucide-react"

const vendedores = [
  { id: 1, nome: "João Silva", email: "joao@findfee.com", meta: 50000, ativo: true },
  { id: 2, nome: "Maria Santos", email: "maria@findfee.com", meta: 75000, ativo: true },
  { id: 3, nome: "Pedro Costa", email: "pedro@findfee.com", meta: 60000, ativo: false },
]

const estagios = [
  { id: 1, nome: "Novo", cor: "#3b82f6", ordem: 1 },
  { id: 2, nome: "Qualificado", cor: "#f59e0b", ordem: 2 },
  { id: 3, nome: "Proposta", cor: "#8b5cf6", ordem: 3 },
  { id: 4, nome: "Negociação", cor: "#f97316", ordem: 4 },
  { id: 5, nome: "Fechado", cor: "#22c55e", ordem: 5 },
]

export default function SettingsPage() {
  const [empresa, setEmpresa] = useState({
    nome: "Findfee Tecnologia",
    cnpj: "12.345.678/0001-90",
    email: "contato@findfee.com",
    telefone: "(11) 3000-1234",
    endereco: "Rua Example, 123 - São Paulo, SP",
  })

  const [notas, setNotas] = useState("")
  const [autoAssign, setAutoAssign] = useState(true)
  const [notificacoes, setNotificacoes] = useState(true)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do CRM</p>
        </div>
        <Button>
          <SaveIcon className="mr-2 size-4" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="empresa" className="w-full">
        <TabsList>
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="vendedores">Vendedores</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="metas">Metas</TabsTrigger>
          <TabsTrigger value="geral">Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="empresa" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Empresa</CardTitle>
              <CardDescription>Informações básicas da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da Empresa</Label>
                  <Input
                    id="nome"
                    value={empresa.nome}
                    onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={empresa.cnpj}
                    onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={empresa.email}
                    onChange={(e) => setEmpresa({ ...empresa, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={empresa.telefone}
                    onChange={(e) => setEmpresa({ ...empresa, telefone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={empresa.endereco}
                  onChange={(e) => setEmpresa({ ...empresa, endereco: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notas">Observações</Label>
                <Textarea
                  id="notas"
                  placeholder="Notas internas sobre a empresa..."
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendedores" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Equipe de Vendas</CardTitle>
                <CardDescription>Gerencie os vendedores do CRM</CardDescription>
              </div>
              <Button size="sm">
                <PlusIcon className="mr-2 size-4" />
                Novo Vendedor
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Meta Mensal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendedores.map((vendedor) => (
                    <TableRow key={vendedor.id}>
                      <TableCell className="font-medium">{vendedor.nome}</TableCell>
                      <TableCell>{vendedor.email}</TableCell>
                      <TableCell>R$ {vendedor.meta.toLocaleString("pt-BR")}</TableCell>
                      <TableCell>
                        <Badge variant={vendedor.ativo ? "default" : "secondary"}>
                          {vendedor.ativo ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <PencilIcon className="size-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={
                              <Button variant="ghost" size="icon" />
                            }
                          >
                            <TrashIcon className="size-4" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir vendedor?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. O vendedor será removido permanentemente do sistema.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction>Excluir</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Estágios do Pipeline</CardTitle>
                <CardDescription>Configure as colunas do kanban</CardDescription>
              </div>
              <Button size="sm">
                <PlusIcon className="mr-2 size-4" />
                Novo Estágio
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ordem</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cor</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estagios.map((estagio) => (
                    <TableRow key={estagio.id}>
                      <TableCell>{estagio.ordem}</TableCell>
                      <TableCell className="font-medium">{estagio.nome}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="size-4 rounded-full"
                            style={{ backgroundColor: estagio.cor }}
                          />
                          <span className="text-sm text-muted-foreground">{estagio.cor}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <PencilIcon className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <TrashIcon className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Metas Mensais</CardTitle>
              <CardDescription>Defina metas de venda por vendedor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {vendedores.filter(v => v.ativo).map((vendedor) => (
                <div key={vendedor.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{vendedor.nome}</div>
                    <Badge variant="outline">{vendedor.email}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`meta-${vendedor.id}`} className="text-sm text-muted-foreground">
                      Meta:
                    </Label>
                    <Input
                      id={`meta-${vendedor.id}`}
                      type="number"
                      className="w-32"
                      defaultValue={vendedor.meta}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geral" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Automação</CardTitle>
                <CardDescription>Configurações de automação do pipeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Atribuição automática</Label>
                    <p className="text-sm text-muted-foreground">
                      Atribuir novos leads automaticamente aos vendedores
                    </p>
                  </div>
                  <Switch checked={autoAssign} onCheckedChange={setAutoAssign} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por email</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar notificações quando um deal mudar de estágio
                    </p>
                  </div>
                  <Switch checked={notificacoes} onCheckedChange={setNotificacoes} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Origens Padrão</CardTitle>
                <CardDescription>Fontes de leads disponíveis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Origem padrão para novos leads</Label>
                  <Select defaultValue="marketing">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a origem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing Digital</SelectItem>
                      <SelectItem value="indicacao">Indicação</SelectItem>
                      <SelectItem value="sistema">Sistema do Cliente</SelectItem>
                      <SelectItem value="eventos">Eventos</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Tag padrão</Label>
                  <Select defaultValue="novo">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="novo">Novo Lead</SelectItem>
                      <SelectItem value="quente">Lead Quente</SelectItem>
                      <SelectItem value="frio">Lead Frio</SelectItem>
                      <SelectItem value="retorno">Retorno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
