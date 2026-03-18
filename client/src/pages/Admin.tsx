import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Plus, Pencil, Trash2, LayoutDashboard, BookOpen, 
  FileText, Megaphone, Loader2, Search, Bell, User, UploadCloud, X 
} from "lucide-react";
import { toast } from "sonner";

export default function AdminPage() {
  const utils = trpc.useUtils();
  const [activeTab, setActiveTab] = useState("courses");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  
  // Estado para guardar a imagem em Base64 (texto)
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  // --- 1. BUSCA DE DADOS ---
  const { data: courses, isLoading } = trpc.admin.courses.list.useQuery();

  // --- 2. AÇÕES (MUTATIONS) ---
  const deleteMutation = trpc.admin.courses.delete.useMutation({
    onSuccess: () => {
      toast.success("Curso removido!");
      utils.admin.courses.list.invalidate();
    },
    onError: (err) => toast.error("Erro ao apagar: " + err.message)
  });

  const saveMutation = editingCourse 
    ? trpc.admin.courses.update.useMutation() 
    : trpc.admin.courses.create.useMutation();

  // Função para limpar o formulário e a imagem
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCourse(null);
    setImageBase64(null); // Limpa a imagem selecionada
  };

  // Função para abrir o formulário (Criação ou Edição)
  const openForm = (course?: any) => {
    if (course) {
      setEditingCourse(course);
      setImageBase64(course.image); // Carrega a imagem existente na edição
    } else {
      setEditingCourse(null);
      setImageBase64(null); // Inicia vazio na criação
    }
    setIsFormOpen(true);
  };

  // --- LÓGICA DO DROPZONE DE IMAGEM ---
  const handleFileChange = (file: File | null) => {
    if (!file) return;

    // Verifica se é uma imagem
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione um arquivo de imagem.");
      return;
    }

    // Lê o arquivo e transforma em Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
      toast.success("Imagem carregada!");
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Preparação dos dados para o tRPC
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      // Usamos a imagem em Base64 guardada no estado
      image: imageBase64 || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3", 
      category: formData.get("category") as "tecnologia" | "idiomas" | "corporativo",
      niche: formData.get("niche") as string,
      level: formData.get("level") as "iniciante" | "intermediario" | "avancado",
      price: formData.get("price") as string,
      instructor: formData.get("instructor") as string,
      benefits: (formData.get("benefits") as string).split(",").map(b => b.trim()),
      tags: (formData.get("tags") as string).split(",").map(t => t.trim()),
      affiliateUrl: formData.get("affiliateUrl") as string,
    };

    try {
      if (editingCourse) {
        // @ts-ignore
        await saveMutation.mutateAsync({ id: editingCourse.id, ...data });
        toast.success("Curso atualizado!");
      } else {
        // @ts-ignore
        await saveMutation.mutateAsync(data);
        toast.success("Novo curso criado!");
      }
      closeForm();
      utils.admin.courses.list.invalidate();
    } catch (err) {
      toast.error("Erro ao salvar dados.");
    }
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>;

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* --- SIDEBAR (Barra Lateral profissional) --- */}
      <aside className="w-64 bg-slate-950 p-6 flex flex-col border-r border-slate-800">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">V</div>
          <span className="text-2xl font-bold text-white tracking-tight">Verum</span>
        </div>
        <nav className="space-y-3 flex-grow">
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <LayoutDashboard className="h-5 w-5" /> Painel
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-blue-600/10 text-blue-400 font-medium">
            <BookOpen className="h-5 w-5" /> Cursos
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <FileText className="h-5 w-5" /> Blog
          </a>
        </nav>
        <div className="border-t border-slate-800 pt-6 mt-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-slate-300"><User/></div>
          <div>
            <p className="text-white font-medium">Guilherme Dev</p>
            <p className="text-xs text-slate-500">guilherme@email.com</p>
          </div>
        </div>
      </aside>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-12 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">Painel de Administração Pró</h1>
            <p className="text-slate-600 mt-2 text-lg">Gerencie seus cursos reais no MySQL com upload de imagens.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full text-slate-500"><Search/></Button>
            <Button variant="outline" size="icon" className="rounded-full text-slate-500"><Bell/></Button>
            <Button className="bg-slate-900 hover:bg-slate-800 rounded-full">Sair</Button>
          </div>
        </header>

        {/* --- ABAS (Padrão Prestige Academy) --- */}
        <Tabs defaultValue="courses" onValueChange={setActiveTab}>
          <TabsList className="bg-white border mb-10 p-1.5 h-16 shadow-sm rounded-2xl w-full max-w-2xl">
            <TabsTrigger value="courses" className="px-8 flex-1 gap-2.5 text-base rounded-xl"><BookOpen className="h-5 w-5"/> Cursos</TabsTrigger>
            <TabsTrigger value="blog" className="px-8 flex-1 gap-2.5 text-base rounded-xl"><FileText className="h-5 w-5"/> Blog</TabsTrigger>
            <TabsTrigger value="ebooks" className="px-8 flex-1 gap-2.5 text-base rounded-xl"><LayoutDashboard className="h-5 w-5"/> E-books</TabsTrigger>
          </TabsList>

          {/* --- CONTEÚDO DA ABA DE CURSOS --- */}
          <TabsContent value="courses" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-900">Seus Cursos Reais ({courses?.length || 0})</h2>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-md" onClick={() => openForm()}>
                <Plus className="mr-2 h-5 w-5" /> Novo Curso
              </Button>
            </div>

            {/* --- LISTA DE CARTÕES PROFISSIONAIS --- */}
            <div className="grid gap-6">
              {courses?.map((course) => (
                <Card key={course.id} className="border-none shadow hover:shadow-lg transition-all rounded-2xl overflow-hidden bg-white">
                  <CardContent className="p-8 flex items-center gap-6">
                    <img src={course.image} alt={course.title} className="w-24 h-24 rounded-xl object-cover" />
                    <div className="flex-grow">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-2xl text-slate-950">{course.title}</h3>
                        <span className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-medium uppercase tracking-wider">{course.category} • {course.level}</span>
                      </div>
                      <p className="text-slate-600 mt-2 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                        <p className="text-2xl font-bold text-blue-600">R$ {course.price}</p>
                        <p className="text-sm text-slate-500">Instrutor: {course.instructor}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 pl-6 border-l border-slate-100">
                      <Button variant="outline" size="icon" className="rounded-full text-slate-500" onClick={() => openForm(course)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="icon" className="rounded-full" onClick={() => { if(confirm("Deseja apagar permanentemente?")) deleteMutation.mutate({ id: course.id }); }}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {courses?.length === 0 && (
                <div className="text-center py-24 border-2 border-dashed rounded-3xl bg-white/50 text-slate-500">
                  <BookOpen className="mx-auto h-12 w-12 mb-4 opacity-30" />
                  <p className="text-lg">O banco de dados está vazio.</p>
                  <p>Clique em "Novo Curso" para começar.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* --- MODAL DO FORMULÁRIO COMPLETO COM UPLOAD --- */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-8">
          <DialogHeader className="mb-6 pb-4 border-b">
            <DialogTitle className="text-3xl font-bold tracking-tight">{editingCourse ? `Editar: ${editingCourse.title}` : "Adicionar Novo Curso"}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSave} className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="title">Título do curso</Label>
              <Input id="title" name="title" defaultValue={editingCourse?.title || ""} required />
            </div>
            
            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" name="description" defaultValue={editingCourse?.description || ""} className="h-24" required />
            </div>

            {/* --- ÁREA DE UPLOAD DE IMAGEM (DROPZONE) --- */}
            <div className="space-y-1.5 col-span-2">
              <Label>Capa do Curso (Arrastar ou selecionar arquivo)</Label>
              
              <div 
                className="relative border-2 border-dashed border-slate-300 rounded-2xl p-4 min-h-[160px] flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-all group"
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("border-blue-500", "bg-blue-50"); }}
                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove("border-blue-500", "bg-blue-50"); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("border-blue-500", "bg-blue-50");
                  const file = e.dataTransfer.files[0];
                  handleFileChange(file);
                }}
              >
                {imageBase64 ? (
                  // MOSTRA A PRÉ-VISUALIZAÇÃO DA IMAGEM
                  <div className="relative w-full h-full flex items-center justify-center p-2">
                    <img src={imageBase64} alt="Capa selecionada" className="max-h-[140px] rounded-lg object-contain shadow" />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute -top-3 -right-3 rounded-full h-7 w-7"
                      onClick={() => setImageBase64(null)}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  // MOSTRA O ÍCONE E O BOTÃO DE UPLOAD (Padrão Captura.png)
                  <>
                    <UploadCloud className="h-10 w-10 text-slate-400 group-hover:text-blue-500" />
                    <p className="text-sm text-slate-600 text-center">Arraste e solte o arquivo aqui ou clique para selecionar</p>
                    <Label htmlFor="file-upload" className="bg-slate-900 text-white text-xs px-4 py-2 rounded-full cursor-pointer hover:bg-slate-800 transition-colors">
                      Selecionar Arquivo
                    </Label>
                    <input 
                      id="file-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select name="category" defaultValue={editingCourse?.category || "tecnologia"}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="idiomas">Idiomas</SelectItem>
                  <SelectItem value="corporativo">Corporativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="niche">Nicho</Label>
              <Input id="niche" name="niche" defaultValue={editingCourse?.niche || ""} required />
            </div>

            <div className="space-y-1.5">
              <Label>Nível</Label>
              <Select name="level" defaultValue={editingCourse?.level || "iniciante"}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="iniciante">Iniciante</SelectItem>
                  <SelectItem value="intermediario">Intermediário</SelectItem>
                  <SelectItem value="avancado">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="price">Preço (Ex: 197.00)</Label>
              <Input id="price" name="price" type="number" step="0.01" defaultValue={editingCourse?.price || ""} required />
            </div>

            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="instructor">Instrutor</Label>
              <Input id="instructor" name="instructor" defaultValue={editingCourse?.instructor || ""} required />
            </div>

            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="benefits">Benefícios (vírgula)</Label>
              <Input id="benefits" name="benefits" defaultValue={editingCourse?.benefits?.join(", ") || ""} required />
            </div>

            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="affiliateUrl">URL de afiliado</Label>
              <Input id="affiliateUrl" name="affiliateUrl" defaultValue={editingCourse?.affiliateUrl || ""} required />
            </div>

            <DialogFooter className="col-span-2 pt-8 mt-6 border-t gap-3">
              <Button type="button" variant="ghost" onClick={() => closeForm()}>Cancelar</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                {editingCourse ? "Salvar Alterações" : "Salvar Curso"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}