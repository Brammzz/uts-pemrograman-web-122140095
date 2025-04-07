const API_BASE_URL = 'https://poetrydb.org'

export const fetchPoems = async (limit = 20) => {
  try {
    const response = await fetch(`${API_BASE_URL}/author`)
    if (!response.ok) throw new Error(`API Error: ${response.status}`)

    const authors = await response.json()

    const randomAuthors = authors.authors
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)

    const poemsPromises = randomAuthors.map(author =>
      fetch(`${API_BASE_URL}/author/${author}`)
        .then(res => {
          if (!res.ok) throw new Error(`API Error: ${res.status}`)
          return res.json()
        })
    )

    const authorsPoems = await Promise.all(poemsPromises)

    const poems = authorsPoems
      .flat()
      .map((poem) => ({
        ...poem,
        id: encodeURIComponent(poem.title),
      }))
      .slice(0, limit)

    return poems
  } catch (error) {
    console.error('Error fetching poems:', error)
    throw error
  }
}

export const fetchPoemById = async (id) => {
  try {
    const decodedTitle = decodeURIComponent(id)
    const response = await fetch(`${API_BASE_URL}/title/${decodedTitle}`)
    if (!response.ok) throw new Error('Failed to fetch poem')
    const data = await response.json()
    return {
      ...data[0],
      id: encodeURIComponent(data[0].title),
    }
  } catch (error) {
    console.error('Error fetching poem by ID:', error)
    throw error
  }
}

export const searchPoems = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/title/${query}`)
    if (!response.ok) throw new Error(`API Error: ${response.status}`)

    const searchResults = await response.json()
    return searchResults.map((poem) => ({
      ...poem,
      id: encodeURIComponent(poem.title)
    }))
  } catch (error) {
    console.error('Error searching poems:', error)
    throw error
  }
}
