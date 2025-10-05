import { useEffect } from "react"; //React hooks
import { useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({category}) => {
    
    const [articles,setArticles] = useState([]);


                /*
                     Fetch top headlines from NewsAPI
                     - `import.meta.env.VITE_API_KEY` is used for the API key injected by Vite.
                     - We only append the `category` query parameter when a category is provided.
                     - Always include `&apiKey=` so the request is authenticated.
                     - After parsing JSON, we default to an empty array to keep `articles` as an array
                         (this prevents runtime errors when rendering with `.map`).
                */

    useEffect(() => {
    const controller = new AbortController();

    const apiKey = import.meta.env.VITE_API_KEY;
    const categoryParam = category ? `&category=${category}` : "";
    const url = `https://newsapi.org/v2/top-headlines?country=us${categoryParam}&apiKey=${apiKey}`;

    fetch(url, {
        signal: controller.signal,
        headers: {
        'Accept': 'application/json',
        'User-Agent': 'BrieflyNewsApp/1.0'
        }
    })
        .then(response => {
        console.log("Status:", response.status);
        return response.json();
        })
        .then(data => {
        console.log("API response:", data);
        setArticles(data.articles || []);
        })
        .catch(err => {
        if (err.name !== 'AbortError') {
            console.error("API error:", err);
        }
        });

    return () => controller.abort();
    }, [category]);
    
    return (
    <div>    
        <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
        {/*
          Render articles safely:
          - Check `Array.isArray` so we don't call `.map` on null/undefined.
          - Use a stable key when possible (`news.url`) to help React diffing.
          - Spread props or pass explicitly depending on whether `NewsItem` expects a specific shape.
        */}
        {Array.isArray(articles) && articles.map((news, index) => {
            // stagger delay: 80ms between items, capped to avoid excessive delays
            const delayMs = Math.min(80 * index, 600);
            return (
                <NewsItem
                    key={news.url || index}
                    title={news.title}
                    description={news.description}
                    src={news.urlToImage}
                    url={news.url}
                    style={{ animationDelay: `${delayMs}ms` }}
                />
            )
        })}
    </div>
  )
}

export default NewsBoard; // Makes component available for use in other parts of the app
