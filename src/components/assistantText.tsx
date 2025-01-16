/* eslint-disable prettier/prettier */
import settingsStore from '@/features/stores/settings'
import { useRef, useEffect, useState } from 'react'
import { Markdown } from './Markdown'

export const AssistantText = ({ message }: { message: string }) => {
  const characterName = settingsStore((s) => s.characterName)
  const showCharacterName = settingsStore((s) => s.showCharacterName)
  const contentRef = useRef<HTMLDivElement>(null)
  const [needsScroll, setNeedsScroll] = useState(false)

  useEffect(() => {
    if (contentRef.current) {
      setNeedsScroll(contentRef.current.scrollHeight > 200)
    }
  }, [message])

  return (
    <div className="absolute bottom-0 left-0 md:mb-[96px] mb-[80px] w-full z-10">
      <div className="mx-auto max-w-4xl w-full p-16">
        <div className="bg-white rounded-8">
          {showCharacterName && (
            <div className="px-24 py-8 bg-secondary rounded-t-8 text-white font-bold tracking-wider">
              {characterName}
            </div>
          )}
          <div className="px-24 py-16 pb-20">
            <div
              ref={contentRef}
              className={`max-h-[200px] pb-1 ${needsScroll ? 'overflow-y-auto' : 'overflow-visible'
                } text-secondary typography-16 font-bold leading-loose`}
            >
              <Markdown content={message} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
