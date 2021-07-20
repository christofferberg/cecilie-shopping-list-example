import clsx from 'clsx'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export const Container = ({ children, className }: Props): JSX.Element => {
  return (
    <div className={clsx('container mx-auto max-w-prose', className)}>
      {children}
    </div>
  )
}
