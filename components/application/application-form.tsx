"use client"

import type React from "react"

import { useState } from "react"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Toast } from '@/components/ui/toast'

interface ApplicationFormProps {
  initialData?: {
    whatYouShipped: string
    whatYouWillBuild: string
    proofOfWork: string
    role: string
    whyAvalanche: string
    githubHandle?: string
  }
  isEdit?: boolean
  githubHandle?: string
}

export function ApplicationForm({ initialData, isEdit = false, githubHandle }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    whatYouShipped: initialData?.whatYouShipped || "",
    whatYouWillBuild: initialData?.whatYouWillBuild || "",
    proofOfWork: initialData?.proofOfWork || "",
    role: initialData?.role || "",
    whyAvalanche: initialData?.whyAvalanche || "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.whatYouShipped.trim()) {
      errors.whatYouShipped = "Please tell us what you've shipped recently"
    }
    if (!formData.proofOfWork.trim()) {
      errors.proofOfWork = "Please provide proof of your work"
    }
    if (!formData.whatYouWillBuild.trim()) {
      errors.whatYouWillBuild = "Please describe what you'll build"
    }
    if (!formData.role.trim()) {
      errors.role = "Please specify your role"
    }
    if (!formData.whyAvalanche.trim()) {
      errors.whyAvalanche = "Please tell us why Avalanche"
    }
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})
    
    if (!validateForm()) {
      setError("Please fill out all required fields")
      return
    }
    
    setLoading(true)

    try {
      const response = await fetch("/api/application", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setSuccess(true)
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {success && (
        <Toast 
          message={`Application ${isEdit ? "updated" : "submitted"} successfully!`}
          type="success"
          onClose={() => setSuccess(false)}
        />
      )}
      
      {error && (
        <Toast 
          message={error}
          type="error"
          onClose={() => setError('')}
        />
      )}

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black text-2xl">{isEdit ? "Edit Application" : "Submit Application"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            label="What have you shipped in the last 60 days?"
            placeholder="Deployed contracts, live products, infra you're running, etc. Include links."
            value={formData.whatYouShipped}
            onChange={(e) => {
              setFormData({ ...formData, whatYouShipped: e.target.value })
              setFieldErrors({ ...fieldErrors, whatYouShipped: '' })
            }}
            error={fieldErrors.whatYouShipped}
            disabled={loading}
          />

          <Textarea
            label="Proof of Work"
            placeholder="Contract addresses on mainnet, live URLs, subnet IDs, node IDs, GitHub repos with recent commits, etc."
            value={formData.proofOfWork}
            onChange={(e) => {
              setFormData({ ...formData, proofOfWork: e.target.value })
              setFieldErrors({ ...fieldErrors, proofOfWork: '' })
            }}
            error={fieldErrors.proofOfWork}
            disabled={loading}
          />

          <Textarea
            label="What will you ship in your first 14 days?"
            placeholder="Be specific. What user-visible product or feature will you demo?"
            value={formData.whatYouWillBuild}
            onChange={(e) => {
              setFormData({ ...formData, whatYouWillBuild: e.target.value })
              setFieldErrors({ ...fieldErrors, whatYouWillBuild: '' })
            }}
            error={fieldErrors.whatYouWillBuild}
            disabled={loading}
          />

          <Textarea
            label="Your role / what you do"
            placeholder="e.g. Smart contracts, frontend, infra, product, growth, design..."
            value={formData.role}
            onChange={(e) => {
              setFormData({ ...formData, role: e.target.value })
              setFieldErrors({ ...fieldErrors, role: '' })
            }}
            error={fieldErrors.role}
            disabled={loading}
          />

          <Textarea
            label="Why Avalanche C-Chain specifically?"
            placeholder="What makes you want to build on AVAX vs other chains?"
            value={formData.whyAvalanche}
            onChange={(e) => {
              setFormData({ ...formData, whyAvalanche: e.target.value })
              setFieldErrors({ ...fieldErrors, whyAvalanche: '' })
            }}
            error={fieldErrors.whyAvalanche}
            disabled={loading}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : isEdit ? "Update Application" : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
    </>
  )
}
