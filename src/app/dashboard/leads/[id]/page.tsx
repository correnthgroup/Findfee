import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"

export default function LeadDetailPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Detalhe do Lead</h1>
          <p className="text-muted-foreground">Informações da organização e contatos</p>
        </div>
        <Button variant="outline">
          <PencilIcon className="mr-2 size-4" />
          Editar
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Nome, CNPJ, email, telefone, endereço
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contatos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Lista de contatos da organização
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
