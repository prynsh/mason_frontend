import type React from "react"
import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const AuthCard = memo(({ title, children }: { 
  title: string;
  children: React.ReactNode 
}) => {
  return (
    <Card className="border-purple-100">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-purple-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
})
AuthCard.displayName = "AuthCard"

export const EmailInput = memo(({ value, onChange }: { 
  value: string; 
  onChange: (value: string) => void 
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="email" className="text-purple-900">Email</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="email"
        type="email"
        placeholder="example@email.com"
        required
        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
      />
    </div>
  )
})
EmailInput.displayName = "EmailInput"

export const PasswordInput = memo(({ value, onChange }: {
  value: string;
  onChange: (value: string) => void
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="password" className="text-purple-900">Password</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="password"
        type="password"
        placeholder="********"
        required
        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
      />
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"

export const AuthButton = memo(({ onClick, loading, text, loadingText }: {
  onClick: () => void;
  loading: boolean;
  text: string;
  loadingText: string;
}) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
      disabled={loading}
    >
      {loading ? loadingText : text}
    </Button>
  )
})
AuthButton.displayName = "AuthButton"