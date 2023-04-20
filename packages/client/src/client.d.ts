import { DOMAttributes } from 'react'
import { GameElement } from '@/game'
import './Game'

declare const __SERVER_PORT__: number

type CustomEvents<K extends string> = {
  [key in K]: (event: CustomEvent) => void
}

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['sfr-game']: CustomElement<GameElement>
    }
  }
}

interface SyncManager {
  getTags(): Promise<string[]>
  register(tag: string): Promise<void>
}

interface ServiceWorkerRegistration {
  readonly sync: SyncManager
}

interface SyncEvent extends ExtendableEvent {
  readonly lastChance: boolean
  readonly tag: string
}

interface ServiceWorkerGlobalScopeEventMap {
  sync: SyncEvent
}
