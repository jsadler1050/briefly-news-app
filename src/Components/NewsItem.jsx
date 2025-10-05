import image from '../assets/news.jpg'

/*
  NewsItem component
  - Props:
    - title: string (article headline)
    - description: string (article summary)
    - src: string (image URL for the article)
    - url: string (link to full article)
  - Behavior/Notes:
    - Uses a local fallback image when `src` is falsy to avoid broken images.
    - Truncates `title` and `description` to keep card layout consistent.
    - Uses `url` directly on the anchor; consider `rel="noopener noreferrer" target="_blank"`
      if you want links to open in a new tab safely.
*/
const NewsItem = ({title, description, src, url, style}) => {
  // `style` allows a parent to pass inline styles like animationDelay for staggering
  return (
    <div className="card news-card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{maxWidth:"345px", ...style}}>
      {/* If an article image URL is provided use it, otherwise use a bundled fallback */}
      <img
        src={src ? src : image}
        style={{height:"200px", width:"328px"}}
        className="card-img-top"
        alt={title || "News item"}
      />
      <div className="card-body">
        {/* Limit title length to prevent overflow in the card */}
        <h5 className="card-title">{(title || "").slice(0,50)}</h5>
        {/* Show a short description or a default placeholder */}
        <p className="card-text">{description ? description.slice(0,90) : "Updates"}</p>
        {/* The Read More link goes to the article's original URL */}
        <a href={url} className="btn btn-primary">Read More</a>
      </div>
    </div>
  )
}

export default NewsItem;
