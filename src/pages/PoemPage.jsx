import { useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import PoemDetail from '../components/PoemDetail'
import Loading from '../components/Loading'
import useFetchPoems from '../hooks/useFetchPoems'

const PoemPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const poemFromState = location.state?.poem

  const { data: fetchedPoem, loading, error } = useFetchPoems(
    poemFromState ? null : id
  )

  const poem = poemFromState || fetchedPoem

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (loading) return <Loading message="Loading poem..." />

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>Error loading poem: {error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-200"
        >
          Return to Home
        </button>
      </div>
    )
  }

  if (!poem) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Poem Not Found</h1>
        <p className="text-gray-500 mb-6">Sorry, we couldn't find the poem you're looking for.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-200"
        >
          Return to Home
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-purple-600 mb-6 hover:text-purple-700 transition duration-200"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      <PoemDetail poem={poem} />

    <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-purple-300 mb-4">About {poem.author}</h2>
        <p className="text-gray-300">
            {poem.author} is a renowned poet whose works have touched many hearts. 
            Explore more of their literary masterpieces in our collection.
        </p>
        </div>

    </div>
  )
}

export default PoemPage
