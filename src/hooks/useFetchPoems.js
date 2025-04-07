import { useState, useEffect, useCallback } from 'react'
import { fetchPoems, fetchPoemById } from '../utils/api'

// Custom hook for fetching poems
const useFetchPoems = (poemId = null) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      let result
      if (poemId) {
        result = await fetchPoemById(poemId)
      } else {
        result = await fetchPoems()
      }
      
      setData(result)
    } catch (err) {
      setError(err.message || 'Failed to fetch poems')
      console.error('Error fetching poems:', err)
    } finally {
      setLoading(false)
    }
  }, [poemId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Add refresh capability
  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}

export default useFetchPoems