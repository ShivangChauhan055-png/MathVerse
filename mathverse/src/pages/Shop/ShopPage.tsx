import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  RiVipCrownLine, RiFlashlightLine, RiFireLine, RiSnowyLine, 
  RiStarLine, RiRainbowLine, RiTerminalLine, RiPlanetLine,
  RiLeafLine, RiVipDiamondLine, RiBookmarkLine, RiMedalLine,
  RiCopperCoinLine, RiCheckLine, RiErrorWarningLine
} from 'react-icons/ri'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useGamificationStore, SHOP_ITEMS } from '@/store/useGamificationStore'
import { soundService } from '@/services/SoundService'
import { cn } from '@/utils/cn'

const iconMap: Record<string, React.ElementType> = {
  RiVipCrownLine, RiFlashlightLine, RiFireLine, RiSnowyLine,
  RiStarLine, RiRainbowLine, RiTerminalLine, RiPlanetLine,
  RiLeafLine, RiVipDiamondLine, RiBookmarkLine, RiMedalLine
};

function Toast({ message, type }: { message: string, type: 'error' | 'success' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl flex items-center gap-3 shadow-xl backdrop-blur-md border",
        type === 'error'
          ? "bg-red-50 dark:bg-red-500/20 border-red-300 dark:border-red-500/50 text-red-700 dark:text-red-200"
          : "bg-green-50 dark:bg-green-500/20 border-green-300 dark:border-green-500/50 text-green-700 dark:text-green-200"
      )}
    >
      {type === 'error' ? <RiErrorWarningLine className="w-5 h-5" /> : <RiCheckLine className="w-5 h-5" />}
      <span className="font-semibold">{message}</span>
    </motion.div>
  );
}

export function ShopPage() {
  const { coins, purchasedItems, equippedFrame, equippedTheme, equippedBadge, buyItem, equipItem, unequipItem } = useGamificationStore()
  const [toast, setToast] = useState<{ message: string, type: 'error' | 'success' } | null>(null)

  const showToast = (message: string, type: 'error' | 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleBuy = (id: string, cost: number) => {
    if (coins < cost) {
      soundService.playWrong();
      showToast("Not enough coins!", "error");
      return;
    }
    if (buyItem(id)) {
      soundService.playCoin();
      showToast("Item purchased successfully!", "success");
    }
  }

  const handleEquipToggle = (id: string, type: 'frame' | 'theme' | 'badge') => {
    soundService.playClick();
    const isEquipped = (type === 'frame' && equippedFrame === id) || 
                       (type === 'theme' && equippedTheme === id) || 
                       (type === 'badge' && equippedBadge === id);
    if (isEquipped) {
      unequipItem(type);
    } else {
      equipItem(id, type);
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink-900 dark:text-white">Reward Shop</h1>
          <p className="text-ink-600 dark:text-slate-400 mt-1">Spend your hard-earned coins on exclusive cosmetics.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl">
          <RiCopperCoinLine className="w-6 h-6 text-amber-500 dark:text-amber-400" />
          <motion.span key={coins} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="text-xl font-bold text-amber-600 dark:text-amber-400">
            {coins}
          </motion.span>
        </div>
      </div>

      <div className="space-y-10">
        {(['frame', 'badge', 'theme'] as const).map(category => {
          const items = SHOP_ITEMS.filter(i => i.type === category)
          if (!items.length) return null;
          
          return (
            <div key={category}>
              <h2 className="text-xl font-semibold text-ink-900 dark:text-white capitalize mb-4">{category}s</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map(item => {
                  const isPurchased = purchasedItems.includes(item.id)
                  const isEquipped = equippedFrame === item.id || equippedTheme === item.id || equippedBadge === item.id
                  const Icon = iconMap[item.icon] || RiStarLine

                  return (
                    <Card key={item.id} className={cn("relative overflow-hidden transition-all", isEquipped && "ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-500/5")}>
                      <div className="p-4 flex flex-col items-center text-center">
                        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-3 border",
                          isPurchased
                            ? "bg-indigo-100 dark:bg-indigo-500/20 border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400"
                            : "bg-ink-100 dark:bg-space-700 border-ink-200 dark:border-space-600 text-ink-600 dark:text-slate-400"
                        )}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="font-semibold text-ink-900 dark:text-white">{item.name}</h3>
                        
                        <div className="mt-4 w-full">
                          {isPurchased ? (
                            <Button 
                              variant={isEquipped ? "outline" : "primary"} 
                              fullWidth 
                              size="sm"
                              onClick={() => handleEquipToggle(item.id, item.type)}
                            >
                              {isEquipped ? 'Unequip' : 'Equip'}
                            </Button>
                          ) : (
                            <Button 
                              variant="secondary" 
                              fullWidth 
                              size="sm"
                              onClick={() => handleBuy(item.id, item.cost)}
                              className={cn(coins < item.cost && "opacity-50 hover:opacity-50 cursor-not-allowed")}
                            >
                              <RiCopperCoinLine className="w-4 h-4 mr-1" /> {item.cost}
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
