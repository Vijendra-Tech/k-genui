import { AnimatePresence, motion } from 'framer-motion'
import { SidebarItem } from './sidebar-item'

interface SidebarItemsProps {
  chats?: any[]
}

export function SidebarItems({ chats }: SidebarItemsProps) {
  if (!chats?.length) return null

  return (
    <AnimatePresence>
      {chats.map(
        (chat, index) =>
          chat && (
            <motion.div
              key={chat?.id}
              exit={{
                opacity: 0,
                height: 0
              }}
            >
              <SidebarItem index={index} chat={chat}>
                {chat}
              </SidebarItem>
            </motion.div>
          )
      )}
    </AnimatePresence>
  )
}
