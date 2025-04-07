import { useState, useCallback, memo } from 'react'
import PropTypes from 'prop-types'

const ShareButton = memo(({ poem }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  // Using useCallback for the share handler
  const handleShare = useCallback(() => {
    // Create the URL for the poem
    const poemSlug = `${poem.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}-${poem.author.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}`
    const shareUrl = `${window.location.origin}/poem/${encodeURIComponent(poemSlug)}`
    
    // Create share text
    const shareText = `Check out "${poem.title}" by ${poem.author}`
    
    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: poem.title,
        text: shareText,
        url: shareUrl
      }).catch(err => console.error('Error sharing:', err))
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
        .then(() => {
          setShowTooltip(true)
          setTimeout(() => setShowTooltip(false), 2000)
        })
        .catch(err => console.error('Error copying to clipboard:', err))
    }
  }, [poem])

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="text-gray-500 hover:text-indigo-600 transition-colors"
        aria-label="Share poem"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>
      
      {showTooltip && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Copied to clipboard!
        </div>
      )}
    </div>
  )
})

ShareButton.displayName = 'ShareButton'

ShareButton.propTypes = {
  poem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired
}

export default ShareButton