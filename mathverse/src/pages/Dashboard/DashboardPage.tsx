/**
 * pages/Dashboard/DashboardPage.tsx
 *
 * Dashboard placeholder page.
 *
 * Shows a skeleton UI that communicates the upcoming features:
 *  - Stats overview cards
 *  - Recent activity feed
 *  - Learning streak
 *  - Quick-start buttons
 *
 * No real data yet — the structure and design system are established here
 * so feature implementation slots in cleanly.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { GlowOrb } from '@/components/ui/GlowOrb'
import { useGamificationStore, ACHIEVEMENTS, XP_PER_LEVEL, SHOP_ITEMS } from '@/store/useGamificationStore'
import { useAudioStore } from '@/store/useAudioStore'
import { soundService } from '@/services/SoundService'
import {
  RiArrowRightLine, RiBookOpenLine, RiFlashlightLine, RiTimeLine, RiTrophyLine,
  RiStore2Line, RiVipCrownLine, RiFireLine, RiSnowyLine, RiStarLine,
  RiRainbowLine, RiTerminalLine, RiPlanetLine, RiLeafLine, RiVipDiamondLine,
  RiBookmarkLine, RiMedalLine
} from 'react-icons/ri'

const iconMap: Record<string, React.ElementType> = {
  RiVipCrownLine,
  RiFlashlightLine,
  RiFireLine,
  RiSnowyLine,
  RiStarLine,
  RiRainbowLine,
  RiTerminalLine,
  RiPlanetLine,
  RiLeafLine,
  RiVipDiamondLine,
  RiBookmarkLine,
  RiMedalLine,
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string
  sub: string
  colour: 'indigo' | 'cyan' | 'violet' | 'amber'
}

const colourClasses = {
  indigo: { icon: 'bg-indigo-500/15 text-indigo-400', ring: 'shadow-indigo-500/10' },
  cyan: { icon: 'bg-cyan-500/15   text-cyan-400', ring: 'shadow-cyan-500/10' },
  violet: { icon: 'bg-violet-500/15 text-violet-400', ring: 'shadow-violet-500/10' },
  amber: { icon: 'bg-amber-500/15  text-amber-400', ring: 'shadow-amber-500/10' },
}

function StatCard({ icon: Icon, label, value, sub, colour }: StatCardProps) {
  const c = colourClasses[colour]
  return (
    <Card className={`shadow-lg ${c.ring}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 text-xs font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-slate-500 text-xs mt-1">{sub}</p>
        </div>
        <div className={`p-2.5 rounded-xl ${c.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  )
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export function DashboardPage() {
  const { coins, xp, level, currentStreak, longestStreak, unlockedAchievements, avatarId, equippedFrame, equippedTheme, equippedBadge, addCoins, addXP, recordActivity, unlockAchievement } = useGamificationStore()
  const { musicOn, sfxOn, volume, setMusicOn, setSfxOn, setVolume } = useAudioStore()

  const handleSimulateCorrect = () => {
    addCoins(10)
    addXP(15)
    recordActivity()
    soundService.playCorrect()
    if (!unlockedAchievements.includes('first_question')) {
      setTimeout(() => unlockAchievement('first_question'), 100)
    }
  }

  const handleSimulateWrong = () => {
    soundService.playWrong()
  }

  const handleSimulateTopicComplete = () => {
    if (!unlockedAchievements.includes('first_topic')) {
      unlockAchievement('first_topic')
    }
  }

  const progressPercent = Math.min(100, Math.floor(((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100))

  return (
    <div className="relative max-w-5xl mx-auto">
      <GlowOrb colour="indigo" size={500} top="-20%" right="-10%" opacity={0.15} />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* ── Page Header ────────────────────────────────────────────── */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              {avatarId && (() => {
                const badgeItem = SHOP_ITEMS.find(i => i.id === equippedBadge);
                const BadgeIcon = badgeItem ? iconMap[badgeItem.icon] : null;

                let bgClass = "bg-indigo-500/10";
                if (equippedTheme === 'theme_emerald') bgClass = "bg-emerald-500/20";
                if (equippedTheme === 'theme_ruby') bgClass = "bg-rose-500/20";

                let ringClass = "border-2 border-indigo-500/30";
                if (equippedFrame === 'frame_gold') ringClass = "border-4 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]";
                if (equippedFrame === 'frame_neon') ringClass = "border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]";
                if (equippedFrame === 'frame_fire') ringClass = "border-2 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]";
                if (equippedFrame === 'frame_ice') ringClass = "border-2 border-blue-300 shadow-[0_0_15px_rgba(147,197,253,0.8)]";
                if (equippedFrame === 'frame_stars') ringClass = "border-2 border-indigo-400 border-dashed shadow-[0_0_15px_rgba(129,140,248,0.5)]";
                if (equippedFrame === 'frame_rainbow') ringClass = "border-4 border-transparent border-t-red-500 border-r-green-500 border-b-blue-500 border-l-yellow-500";
                if (equippedFrame === 'frame_hacker') ringClass = "border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]";
                if (equippedFrame === 'frame_galaxy') ringClass = "border-4 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]";

                return (
                  <div className={`relative w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center p-2 ${bgClass} ${ringClass} transition-all duration-300`}>
                    <img src={avatarId} alt="Avatar" className="w-full h-full object-contain drop-shadow-lg" />
                    {BadgeIcon && (
                      <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-amber-400 shadow-lg">
                        <BadgeIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                )
              })()}
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 text-sm mt-1">
                  Your mathematics learning journey at a glance.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/shop">
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<RiStore2Line className="w-4 h-4" />}
                >
                  Reward Shop
                </Button>
              </Link>
              <Link to="/topics">
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<RiArrowRightLine className="w-4 h-4" />}
                >
                  Continue Learning
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Gamification Simulator ─────────────────────────────────────── */}
        <motion.div variants={fadeUp}>
          <Card variant="flat" className="border-indigo-500/30 bg-indigo-500/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-xl">
                  <RiFlashlightLine className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    Gamification System Active
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Use these buttons to simulate learning activity and trigger rewards.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="primary" onClick={handleSimulateCorrect}>Simulate Correct</Button>
                <Button size="sm" variant="danger" onClick={handleSimulateWrong}>Simulate Wrong</Button>
                <Button size="sm" variant="outline" onClick={handleSimulateTopicComplete}>Complete Topic</Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Audio Settings ─────────────────────────────────────────────── */}
        <motion.div variants={fadeUp}>
          <Card variant="flat" className="border-indigo-500/30 bg-indigo-500/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-xl">
                  <RiFlashlightLine className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    Audio Settings
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Toggle music and sound effects.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" checked={musicOn} onChange={(e) => { setMusicOn(e.target.checked); soundService.playClick(); }} className="accent-indigo-500" />
                  Music
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" checked={sfxOn} onChange={(e) => { setSfxOn(e.target.checked); soundService.playClick(); }} className="accent-indigo-500" />
                  SFX
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  Volume:
                  <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-20 accent-indigo-500" />
                </label>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Stats Grid ─────────────────────────────────────────────── */}
        <motion.div variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: RiBookOpenLine, label: 'Coins', value: String(coins), sub: 'Total earned', colour: 'indigo' },
            { icon: RiTrophyLine, label: 'Level', value: String(level), sub: `${xp} Total XP`, colour: 'cyan' },
            { icon: RiFlashlightLine, label: 'Current Streak', value: String(currentStreak), sub: 'Days in a row', colour: 'violet' },
            { icon: RiTimeLine, label: 'Longest Streak', value: String(longestStreak), sub: 'Best record', colour: 'amber' },
          ].map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <StatCard {...s as StatCardProps} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main Content Grid ───────────────────────────────────────── */}
        <motion.div variants={stagger} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity (2/3 width) */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-semibold">Achievements</h2>
                  <Badge variant="violet">{unlockedAchievements.length} / {ACHIEVEMENTS.length}</Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  {unlockedAchievements.length === 0 ? (
                    <p className="text-slate-600 text-sm text-center py-4">No achievements yet. Keep learning!</p>
                  ) : (
                    unlockedAchievements.map((id) => {
                      const ach = ACHIEVEMENTS.find(a => a.id === id)
                      if (!ach) return null
                      return (
                        <div key={id} className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                          <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0">
                            <RiTrophyLine className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{ach.title}</p>
                            <p className="text-slate-400 text-xs">{ach.description}</p>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </Card.Body>
            </Card>
          </motion.div>

          {/* Quick Start (1/3 width) */}
          <motion.div variants={fadeUp}>
            <Card className="h-full flex flex-col">
              <Card.Header>
                <h2 className="text-white font-semibold">Quick Start</h2>
                <p className="text-slate-500 text-xs mt-1">Jump into a theorem</p>
              </Card.Header>
              <Card.Body className="flex-1">
                <div className="space-y-2.5">
                  {['Euclidean Algorithm', "Fermat's Little Theorem", 'Handshake Lemma', 'Binary Exponentiation'].map(
                    (name) => (
                      <Link
                        key={name}
                        to="/topics"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400 flex-shrink-0 text-xs font-bold font-mono">
                          Σ
                        </div>
                        <span className="text-slate-300 text-xs group-hover:text-white transition-colors line-clamp-1">
                          {name}
                        </span>
                        <RiArrowRightLine className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 ml-auto flex-shrink-0 transition-colors" />
                      </Link>
                    ),
                  )}
                </div>
              </Card.Body>
              <Card.Footer>
                <Link to="/topics" className="block">
                  <Button variant="ghost" size="sm" fullWidth rightIcon={<RiArrowRightLine className="w-3.5 h-3.5" />}>
                    All Topics
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          </motion.div>
        </motion.div>

        {/* ── Learning Progress placeholder ───────────────────────────── */}
        <motion.div variants={fadeUp}>
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold">Learning Progress</h2>
                <Badge variant="cyan">Coming Soon</Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-slate-400 text-sm">Level {level} Progress</span>
                    <span className="text-slate-400 text-xs">{xp % XP_PER_LEVEL} / {XP_PER_LEVEL} XP ({progressPercent}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
