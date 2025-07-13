'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchBoxProps {
  className?: string
  placeholder?: string
  onSearch?: (query: string) => void
  variant?: 'default' | 'compact'
}

export function SearchBox({ 
  className, 
  placeholder = '記事を検索...', 
  onSearch,
  variant = 'default'
}: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch?.(query.trim())
    }
  }

  const handleClear = () => {
    setQuery('')
    setIsExpanded(false)
  }

  if (variant === 'compact') {
    return (
      <div className={cn('relative', className)}>
        {!isExpanded ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="h-9 w-9 p-0"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">検索</span>
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-1">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8 pr-8 w-48"
                autoFocus
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </form>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </form>
  )
}