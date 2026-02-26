'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { serviceModules, type ServiceItem } from '@/lib/services-data'
import { LeadModal } from '@/components/lead-modal'
import {
  Cable,
  CircleDot,
  PanelTop,
  Lightbulb,
  Zap,
  Minus,
  Plus,
  Phone,
  Receipt,
  Trash2,
  X,
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  cable: <Cable className="size-5" />,
  'circle-dot': <CircleDot className="size-5" />,
  'panel-top': <PanelTop className="size-5" />,
  lightbulb: <Lightbulb className="size-5" />,
  zap: <Zap className="size-5" />,
}

export function ServiceCalculator() {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [showReceipt, setShowReceipt] = useState(false)

  const updateQuantity = useCallback((id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0
      const next = Math.max(0, current + delta)
      if (next === 0) {
        const copy = { ...prev }
        delete copy[id]
        return copy
      }
      return { ...prev, [id]: next }
    })
  }, [])

  const setQuantity = useCallback((id: string, value: number) => {
    setQuantities((prev) => {
      const next = Math.max(0, value)
      if (next === 0) {
        const copy = { ...prev }
        delete copy[id]
        return copy
      }
      return { ...prev, [id]: next }
    })
  }, [])

  const clearAll = useCallback(() => {
    setQuantities({})
  }, [])

  const selectedItems = useMemo(() => {
    const items: (ServiceItem & { quantity: number })[] = []
    for (const mod of serviceModules) {
      for (const item of mod.items) {
        if (quantities[item.id] && quantities[item.id] > 0) {
          items.push({ ...item, quantity: quantities[item.id] })
        }
      }
    }
    return items
  }, [quantities])

  const total = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [selectedItems])

  const itemCount = selectedItems.length

  return (
    <section id="calculator" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Калькулятор
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Розрахувати вартість
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Оберіть необхідні послуги та вкажіть кількість. Калькулятор автоматично розрахує
            загальну вартість робіт.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side: Service modules accordion */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 min-w-0"
          >
            <Accordion type="multiple" defaultValue={['wiring']} className="space-y-3">
              {serviceModules.map((mod) => (
                <AccordionItem
                  key={mod.id}
                  value={mod.id}
                  className="rounded-xl border border-border bg-card overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-primary">{iconMap[mod.icon]}</span>
                      <span className="font-semibold text-base text-foreground">
                        {mod.title}
                      </span>
                      {mod.items.some((i) => quantities[i.id] > 0) && (
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          {mod.items.filter((i) => quantities[i.id] > 0).length}
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-0">
                    <div className="divide-y divide-border">
                      {mod.items.map((item) => (
                        <ServiceRow
                          key={item.id}
                          item={item}
                          quantity={quantities[item.id] || 0}
                          onIncrement={() => updateQuantity(item.id, 1)}
                          onDecrement={() => updateQuantity(item.id, -1)}
                          onSetQuantity={(v) => setQuantity(item.id, v)}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Right side: Live Receipt */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-96 lg:shrink-0"
          >
            <div className="lg:sticky lg:top-24">
              <div className="rounded-xl border border-border bg-card overflow-hidden glass">
                {/* Receipt header */}
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="size-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Кошторис</h3>
                  </div>
                  {itemCount > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Очистити все"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>

                {/* Receipt body */}
                <div className="px-5 py-4 min-h-[200px] max-h-[400px] overflow-y-auto">
                  <AnimatePresence mode="popLayout">
                    {itemCount === 0 ? (
                      <motion.p
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-muted-foreground text-sm text-center py-8"
                      >
                        Оберіть послуги зліва, щоб побачити кошторис
                      </motion.p>
                    ) : (
                      <div className="space-y-3">
                        {selectedItems.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-start justify-between gap-2 text-sm"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-foreground leading-tight truncate">
                                {item.name}
                              </p>
                              <p className="text-muted-foreground text-xs mt-0.5">
                                {item.quantity} {item.unit} x {item.price} грн
                              </p>
                            </div>
                            <span className="font-mono font-semibold text-foreground whitespace-nowrap">
                              {(item.price * item.quantity).toLocaleString('uk-UA')} грн
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Receipt footer */}
                <div className="px-5 py-4 border-t border-border bg-muted/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Загальна вартість
                    </span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold font-mono text-primary"
                    >
                      {total.toLocaleString('uk-UA')} грн
                    </motion.span>
                  </div>

                  <AnimatePresence>
                    {total > 0 && (
                      <LeadModal
                        title="Отримати кошторис"
                        description="Надішліть вашу заявку, і Дмитро зателефонує вам для детального обговорення кошторису."
                        metadata={{
                          totalPrice: total,
                          items: selectedItems.map(i => ({ name: i.name, qty: i.quantity }))
                        }}
                        trigger={
                          <Button
                            size="lg"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                          >
                            <Phone className="size-4 mr-2" />
                            Отримати консультацію від Дмитра
                          </Button>
                        }
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile floating receipt toggle */}
        {itemCount > 0 && (
          <div className="fixed bottom-6 right-6 z-50 lg:hidden">
            <Button
              onClick={() => setShowReceipt(!showReceipt)}
              size="lg"
              className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 gap-2"
            >
              <Receipt className="size-5" />
              <span className="font-mono font-semibold">
                {total.toLocaleString('uk-UA')} грн
              </span>
              <Badge variant="secondary" className="text-xs rounded-full">
                {itemCount}
              </Badge>
            </Button>
          </div>
        )}

        {/* Mobile receipt sheet */}
        <AnimatePresence>
          {showReceipt && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-foreground/50 z-50 lg:hidden"
                onClick={() => setShowReceipt(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 lg:hidden rounded-t-2xl bg-card border-t border-border max-h-[80vh] overflow-y-auto"
              >
                <div className="px-5 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
                  <div className="flex items-center gap-2">
                    <Receipt className="size-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Кошторис</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearAll}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Очистити все"
                    >
                      <Trash2 className="size-4" />
                    </button>
                    <button
                      onClick={() => setShowReceipt(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Закрити"
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                </div>

                <div className="px-5 py-4 space-y-3">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-2 text-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground leading-tight">{item.name}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">
                          {item.quantity} {item.unit} x {item.price} грн
                        </p>
                      </div>
                      <span className="font-mono font-semibold text-foreground whitespace-nowrap">
                        {(item.price * item.quantity).toLocaleString('uk-UA')} грн
                      </span>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-4 border-t border-border bg-muted/30 sticky bottom-0">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Загальна вартість
                    </span>
                    <span className="text-2xl font-bold font-mono text-primary">
                      {total.toLocaleString('uk-UA')} грн
                    </span>
                  </div>
                  <LeadModal
                    title="Отримати кошторис"
                    description="Надішліть вашу заявку, і Дмитро зателефонує вам для детального обговорення кошторису."
                    metadata={{
                      totalPrice: total,
                      items: selectedItems.map(i => ({ name: i.name, qty: i.quantity }))
                    }}
                    trigger={
                      <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                      >
                        <Phone className="size-4 mr-2" />
                        Отримати консультацію від Дмитра
                      </Button>
                    }
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ---- Individual service row component ---- */

function ServiceRow({
  item,
  quantity,
  onIncrement,
  onDecrement,
  onSetQuantity,
}: {
  item: ServiceItem
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  onSetQuantity: (v: number) => void
}) {
  const isActive = quantity > 0

  return (
    <div
      className={`flex items-center justify-between gap-3 px-5 py-3 transition-colors ${isActive ? 'bg-primary/5' : 'hover:bg-muted/30'
        }`}
    >
      {/* Service info */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-tight ${isActive ? 'text-foreground font-medium' : 'text-foreground'
            }`}
        >
          {item.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-xs text-muted-foreground">{item.unit}</span>
          <span className="font-mono text-sm font-semibold text-primary">
            {item.price} грн
          </span>
        </div>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onDecrement}
          disabled={quantity === 0}
          className="size-8 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={`Зменшити кількість ${item.name}`}
        >
          <Minus className="size-3.5" />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10)
            onSetQuantity(isNaN(val) ? 0 : val)
          }}
          min={0}
          className="w-12 h-8 text-center font-mono text-sm font-medium bg-transparent border border-border rounded-lg text-foreground focus:border-primary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          aria-label={`Кількість ${item.name}`}
        />
        <button
          onClick={onIncrement}
          className="size-8 rounded-lg border border-primary bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
          aria-label={`Збільшити кількість ${item.name}`}
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
