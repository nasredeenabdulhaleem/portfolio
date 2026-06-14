import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'

/**
 * Real-time Firestore hook with static data fallback.
 * If Firebase is not configured or the collection is empty,
 * falls back to the provided static data seamlessly.
 *
 * Firestore collections expected:
 * - "projects" (orderBy: "order")
 * - "experiences" (orderBy: "order")
 * - "skills" (orderBy: "order")
 * - "messages" (write-only via contact form)
 */
export function useFirestoreCollection<T>(
  collectionName: string,
  fallbackData: T[],
  orderByField?: string
) {
  const [data, setData] = useState<T[]>(fallbackData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = orderByField
      ? query(collection(db, collectionName), orderBy(orderByField))
      : collection(db, collectionName)

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T))
          setData(docs)
        }
        // empty snapshot → keep fallback
        setLoading(false)
      },
      () => {
        // Firebase unavailable (no config, network, rules) → use static data
        setLoading(false)
      }
    )

    return () => unsub()
  }, [collectionName])

  return { data, loading }
}
