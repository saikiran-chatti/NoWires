import type { event } from '@tauri-apps/api'

export function extractUnlistener(futureUnlistener: Promise<event.UnlistenFn>) {
    return async () => {
        console.log('running unlistener')
        const unlisten = await futureUnlistener
        unlisten()
    }
}