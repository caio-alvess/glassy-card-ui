import { useState } from "react";
import { Calendar, Upload } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ImageDropzone from "@/components/ImageDropzone";

const Index = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>();
  const [noExpiration, setNoExpiration] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <div className="min-h-screen animated-gradient flex flex-col items-center justify-center p-4">
      {/* Decorative orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      {/* Logo Header */}
      <header className="relative mb-8 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-lg font-bold text-primary-foreground tracking-tight">AD</span>
          </div>
          <span className="text-2xl font-semibold text-foreground tracking-tight">ADMU</span>
        </div>
      </header>

      {/* Main Card */}
      <main className="relative w-full max-w-md animate-fade-in">
        <div className="glass-card p-8">
          {/* Card Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 mb-4">
              <Upload className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              Upload de Arquivo
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Adicione uma imagem com título e data de expiração
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground/80">
                Imagem
              </Label>
              <ImageDropzone onImageSelect={setSelectedImage} />
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-foreground/80">
                Título
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Digite o título do arquivo..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="glass-input h-12 px-4"
              />
            </div>

            {/* Expiration Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground/80">
                Data de Expiração
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={noExpiration}
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal glass-input border-glass-border/20",
                      !date && "text-muted-foreground/50",
                      noExpiration && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Calendar className="mr-3 h-4 w-4 text-primary" />
                    {date ? (
                      format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-0 glass-card border-glass-border/30" 
                  align="start"
                >
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>

              {/* No Expiration Checkbox */}
              <div className="flex items-center space-x-3 pt-2">
                <Checkbox
                  id="no-expiration"
                  checked={noExpiration}
                  onCheckedChange={(checked) => {
                    setNoExpiration(checked as boolean);
                    if (checked) setDate(undefined);
                  }}
                  className="border-glass-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="no-expiration"
                  className="text-sm text-muted-foreground cursor-pointer select-none"
                >
                  Este arquivo não tem data de expiração
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="
                w-full h-14 rounded-2xl font-medium text-base
                bg-gradient-to-r from-primary to-accent
                hover:opacity-90 hover:scale-[1.02]
                active:scale-[0.98]
                transition-all duration-200
                shadow-lg shadow-primary/25
              "
            >
              Enviar Arquivo
            </Button>
          </form>
        </div>

        {/* Subtle footer */}
        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          Arquivos são armazenados de forma segura
        </p>
      </main>
    </div>
  );
};

export default Index;
