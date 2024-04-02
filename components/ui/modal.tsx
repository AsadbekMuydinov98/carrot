import React, { ReactElement } from 'react'
import { Dialog, DialogContent } from './dialog'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen?: boolean
  onClose?: ()=> void
  title?: string
  body?: ReactElement
  footer?: ReactElement
}

export default function Modal({body, footer, isOpen, onClose, title}: ModalProps) {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <div className="mt-4">{body}</div>
          {footer && <div>{footer}</div>}
        </DialogContent>
      </Dialog>
    </div>
  )
}
