import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"

export default function DealDetailPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Detalhe do Deal</h1>
          <p className="text-muted-foreground">Informações do deal</p>
        </div>
        <Button variant="outline">
          <PencilIcon className="mr-2 size-4" />
          Editar
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dados do Deal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Valor, estágio, vendedor, origem
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Organização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Dados da organização vinculada
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
