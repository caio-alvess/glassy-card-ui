import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageDropzoneProps {
  onImageSelect: (file: File | null) => void;
}

const ImageDropzone = ({ onImageSelect }: ImageDropzoneProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const removeImage = useCallback(() => {
    setPreview(null);
    onImageSelect(null);
  }, [onImageSelect]);

  return (
    <div className="w-full">
      {!preview ? (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative flex flex-col items-center justify-center w-full h-48 
            rounded-2xl border-2 border-dashed cursor-pointer
            transition-all duration-300 ease-out
            ${isDragging 
              ? "border-primary bg-primary/10 scale-[1.02]" 
              : "border-glass-border/40 hover:border-primary/50 hover:bg-card/30"
            }
          `}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className={`
            flex flex-col items-center gap-3 transition-transform duration-200
            ${isDragging ? "scale-110" : ""}
          `}>
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Arraste uma imagem ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, WEBP até 10MB
              </p>
            </div>
          </div>
        </label>
      ) : (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden group animate-scale-in">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <button
            onClick={removeImage}
            className="
              absolute top-3 right-3 p-2 rounded-full
              bg-background/80 backdrop-blur-sm
              border border-glass-border/30
              text-foreground hover:bg-destructive hover:text-destructive-foreground
              transition-all duration-200 hover:scale-110
            "
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-glass-border/30">
            <ImageIcon className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Imagem selecionada</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
