import { Card } from "@/components/ui/card"
import { FileText, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FilesTab() {
    const files = [
        { name: "resume_v2.pdf", type: "PDF", updatedAt: "2h ago" },
        { name: "cover_letter.docx", type: "Word", updatedAt: "1d ago" },
        { name: "job_descriptions.txt", type: "Text", updatedAt: "3d ago" },
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Project Files</h2>
                <Button>
                    <Upload className="mr-2 h-4 w-4" /> Upload File
                </Button>
            </div>

            <Card>
                <div className="divide-y">
                    {files.map((file) => (
                        <div key={file.name} className="p-4 flex items-center">
                            <FileText className="h-4 w-4 mr-3 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="font-medium">{file.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {file.type} • Updated {file.updatedAt}
                                </p>
                            </div>
                            <Button variant="ghost" size="sm">
                                Download
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
} 