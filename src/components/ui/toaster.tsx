"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toast, ToastProvider as ToastProviderPrimitive } from "@radix-ui/react-toast"

import { type ToastProps, ToastClose, ToastDescription, type ToastProps as ToastPropsPrimitive, ToastProvider, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

function Toaster() {
  const { toasts } = useToast()
  const { theme } = useTheme()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} text-foreground`}
            {...props}
          >
            <div className="grid gap-1">
              {title && <div className="font-semibold [&+div]:text-sm">{title}</div>}
              {description && (
                <div className="text-sm opacity-90">{description}</div>
              )}
            </div>
            {action}
            <ToastClose className="text-foreground/50 hover:text-foreground" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

export { Toaster }
