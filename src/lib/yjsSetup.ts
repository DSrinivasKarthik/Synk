import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { IndexeddbPersistence } from 'y-indexeddb'

// Keep track of active documents
const activeDocs = new Map<string, { ydoc: Y.Doc; provider: WebrtcProvider | null; persistence: IndexeddbPersistence }>()

export const initYDoc = (room: string) => {
  // Check if we already have an active document for this room
  if (activeDocs.has(room)) {
    const { ydoc, provider, persistence } = activeDocs.get(room)!
    return {
      ydoc,
      ytext: ydoc.getText('content'),
      cleanup: () => {
        // Don't cleanup if there are other components using this document
        if (activeDocs.get(room)) {
          return
        }
        provider?.destroy()
        persistence.destroy()
        activeDocs.delete(room)
      },
    }
  }

  // Create new document if none exists
  const ydoc = new Y.Doc()
  const ytext = ydoc.getText('content')

  // Set up IndexedDB persistence for offline support
  const persistence = new IndexeddbPersistence(room, ydoc)

  let provider: WebrtcProvider | null = null

  try {
    // Set up WebRTC provider for real-time collaboration
    provider = new WebrtcProvider(room, ydoc, {
      signaling: ['wss://signaling.yjs.dev'],
      filterBcConns: false,
      peerOpts: {},
    })

    // Try to connect with a timeout
    const connectPromise = new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Connection timeout'))
      }, 5000)

      provider?.on('status', ({ connected }: { connected: boolean }) => {
        if (connected) {
          clearTimeout(timeout)
          resolve()
        }
      })

      // Start connection attempt
      provider?.connect()
    })

    // Handle connection attempt
    connectPromise.catch(() => {
      console.warn('Failed to connect to signaling server, falling back to offline mode')
      provider?.destroy()
      provider = null
    })
  } catch (error) {
    console.warn('Failed to initialize WebRTC provider, falling back to offline mode:', error)
  }

  // Store the document and its providers
  activeDocs.set(room, { ydoc, provider, persistence })

  return {
    ydoc,
    ytext,
    cleanup: () => {
      // Only cleanup if there are no other components using this document
      if (activeDocs.get(room)) {
        return
      }
      provider?.destroy()
      persistence.destroy()
      activeDocs.delete(room)
    },
  }
} 