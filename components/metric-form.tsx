"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { Metric } from "@/lib/db/schema"
import { Loader2, X } from "lucide-react"

interface MetricFormProps {
  initialData?: Partial<Metric>
  onSubmit: (data: Partial<Metric>) => Promise<void>
  onCancel: () => void
}

export function MetricForm({ initialData, onSubmit, onCancel }: MetricFormProps) {
  const [formData, setFormData] = useState<Partial<Metric>>(initialData || {})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      toast.success("Metric saved successfully", {
        className: "bg-green-500 text-white",
      })
      setFormData({}) // Reset form
      setIsSubmitting(false) // Reset loading state before closing
      onCancel() // Close form
    } catch (error) {
      toast.error("Failed to save metric", {
        className: "bg-destructive text-destructive-foreground",
      })
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof Metric, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    setFormData(initialData || {})
  }

  return (
    <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <div className="pointer-events-auto w-screen max-w-md transform transition-transform duration-500 ease-in-out">
              <form className="flex h-full flex-col divide-y divide-gray-200 bg-background shadow-xl">
                {/* Loading Overlay */}
                {isSubmitting && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-200">
                    <div className="flex flex-col items-center space-y-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Saving...</p>
                    </div>
                  </div>
                )}

                <div className="h-0 flex-1 overflow-y-auto">
                  <div className="bg-primary px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-primary-foreground" id="slide-over-title">
                          New Metric
                        </h2>
                        <p className="mt-1 text-sm text-primary-foreground/60">
                          Get started by filling in the information below.
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={onCancel}
                        className="text-primary-foreground hover:bg-primary-foreground/10"
                        disabled={isSubmitting}
                      >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close panel</span>
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="divide-y divide-border px-4 sm:px-6">
                      <div className="space-y-6 pb-5 pt-6">
                        <div className="space-y-2">
                          <Label htmlFor="datasourceDescription" className="text-sm font-medium">
                            Description
                          </Label>
                          <Textarea
                            id="datasourceDescription"
                            value={formData.datasourceDescription || ""}
                            onChange={(e) => handleChange("datasourceDescription", e.target.value)}
                            placeholder="Enter metric description..."
                            className="min-h-[100px] resize-none"
                            disabled={isSubmitting}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="noOfFilesOrTables" className="text-sm font-medium">
                            Number of Files/Tables
                          </Label>
                          <Input
                            id="noOfFilesOrTables"
                            type="number"
                            value={formData.noOfFilesOrTables || ""}
                            onChange={(e) => handleChange("noOfFilesOrTables", Number.parseInt(e.target.value))}
                            placeholder="Enter number of files or tables"
                            disabled={isSubmitting}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="fileType" className="text-sm font-medium">
                            File Type
                          </Label>
                          <Input
                            id="fileType"
                            value={formData.fileType || ""}
                            onChange={(e) => handleChange("fileType", e.target.value)}
                            placeholder="Enter file type"
                            disabled={isSubmitting}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dataSourceType" className="text-sm font-medium">
                            Data Source Type
                          </Label>
                          <Input
                            id="dataSourceType"
                            value={formData.dataSourceType || ""}
                            onChange={(e) => handleChange("dataSourceType", e.target.value)}
                            placeholder="Enter data source type"
                            disabled={isSubmitting}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="totalSourceDataSizeInKb" className="text-sm font-medium">
                            Total Source Data Size (KB)
                          </Label>
                          <Input
                            id="totalSourceDataSizeInKb"
                            type="number"
                            value={formData.totalSourceDataSizeInKb || ""}
                            onChange={(e) => handleChange("totalSourceDataSizeInKb", Number.parseFloat(e.target.value))}
                            placeholder="Enter total size in KB"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 justify-end gap-2 px-4 py-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={isSubmitting}
                    className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-500"
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

