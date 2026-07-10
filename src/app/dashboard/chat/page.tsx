"use client"

import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/components/ui/message"
import { SendIcon, PaperclipIcon, SmileIcon, PhoneIcon, VideoIcon, MoreVerticalIcon } from "lucide-react"

interface ChatMessage {
  id: string
  content: string
  sender: "user" | "other"
  senderName: string
  senderAvatar: string
  timestamp: string
  reactions?: string[]
}

const contacts = [
  { id: 1, name: "João Silva", avatar: "", status: "online", lastMessage: "O deal está avançando bem", unread: 2 },
  { id: 2, name: "Maria Santos", avatar: "", status: "offline", lastMessage: "Enviei a proposta ontem", unread: 0 },
  { id: 3, name: "Pedro Costa", avatar: "", status: "online", lastMessage: "Preciso revisar os valores", unread: 1 },
  { id: 4, name: "Ana Oliveira", avatar: "", status: "away", lastMessage: "Vamos agendar uma reunião?", unread: 0 },
]

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    content: "Olá! Como está o andamento do deal com a empresa X?",
    sender: "other",
    senderName: "João Silva",
    senderAvatar: "",
    timestamp: "10:30",
  },
  {
    id: "2",
    content: "Oi João! Está indo bem. O cliente demonstrou interesse na proposta premium.",
    sender: "user",
    senderName: "Você",
    senderAvatar: "",
    timestamp: "10:32",
  },
  {
    id: "3",
    content: "Ótimo! Qual é o valor total da proposta?",
    sender: "other",
    senderName: "João Silva",
    senderAvatar: "",
    timestamp: "10:33",
    reactions: ["👍"],
  },
  {
    id: "4",
    content: "O valor total é R$ 45.000,00 com pagamento parcelado em 12x. Inclui suporte premium por 12 meses.",
    sender: "user",
    senderName: "Você",
    senderAvatar: "",
    timestamp: "10:35",
  },
  {
    id: "5",
    content: "Perfeito! Vou agendar uma reunião para fechar os detalhes finais. Podemos contar com essa venda este mês? 🎉",
    sender: "other",
    senderName: "João Silva",
    senderAvatar: "",
    timestamp: "10:36",
    reactions: ["🎯", "🔥"],
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [selectedContact, setSelectedContact] = useState(contacts[0])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      senderName: "Você",
      senderAvatar: "",
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] p-4 pt-0 gap-4">
      <Card className="w-80 flex-shrink-0">
        <CardHeader>
          <CardTitle>Conversas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-280px)]">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${
                  selectedContact.id === contact.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-background ${
                    contact.status === "online" ? "bg-green-500" :
                    contact.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm truncate">{contact.name}</span>
                    {contact.unread > 0 && (
                      <Badge variant="default" className="ml-2 size-5 flex items-center justify-center text-xs">
                        {contact.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedContact.avatar} />
              <AvatarFallback>{selectedContact.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{selectedContact.name}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {selectedContact.status === "online" ? "Online" :
                 selectedContact.status === "away" ? "Ausente" : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <PhoneIcon className="size-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <VideoIcon className="size-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVerticalIcon className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-[calc(100vh-380px)] p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <Message key={msg.id} align={msg.sender === "user" ? "end" : "start"}>
                  {msg.sender !== "user" && (
                    <MessageAvatar>
                      <Avatar className="size-8">
                        <AvatarImage src={msg.senderAvatar} />
                        <AvatarFallback className="text-xs">
                          {msg.senderName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </MessageAvatar>
                  )}
                  <MessageContent>
                    {msg.sender !== "user" && (
                      <MessageHeader>
                        <span className="text-xs font-medium text-muted-foreground">
                          {msg.senderName}
                        </span>
                      </MessageHeader>
                    )}
                    <Bubble variant={msg.sender === "user" ? "default" : "secondary"}>
                      <BubbleContent>{msg.content}</BubbleContent>
                      {msg.reactions && msg.reactions.length > 0 && (
                        <BubbleReactions>
                          {msg.reactions.map((reaction, i) => (
                            <span key={i}>{reaction}</span>
                          ))}
                        </BubbleReactions>
                      )}
                    </Bubble>
                    <MessageFooter>
                      <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                    </MessageFooter>
                  </MessageContent>
                  {msg.sender === "user" && (
                    <MessageAvatar>
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">V</AvatarFallback>
                      </Avatar>
                    </MessageAvatar>
                  )}
                </Message>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <Separator />
        <div className="p-4">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <PaperclipIcon className="size-4" />
            </Button>
            <Textarea
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="min-h-[44px] max-h-32 resize-none"
            />
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <SmileIcon className="size-4" />
            </Button>
            <Button
              size="icon"
              className="flex-shrink-0"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <SendIcon className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
