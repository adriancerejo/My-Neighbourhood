import React, { useState, useEffect } from "react";
import Article from "./Article";
import "./App.css";

const News = (lat, lng) => {
  const API_KEY = `XXXXXXXXXXXXXXXXXXXX`;
  var url;
  var newsurl;
  var country;
  const [paper, setPaper] = useState(null);
  if (typeof lat.lat !== "undefined" && typeof lat.lng !== "undefined") {
    url = `https://api.opencagedata.com/geocode/v1/json?q=${lat.lat}%2C${lat.lng}&key=${API_KEY}&pretty=1`;
  }
  async function getCountry(mUrl) {
    const response = await fetch(mUrl);
    const countryData = await response.json();
    country = countryData.results[0].components["ISO_3166-1_alpha-2"];
    newsurl = `https://newsapi.org/v2/top-headlines?country=${country.toLowerCase()}&apiKey=XXXXXXXXXXXXXXXXXXXXXX`;

    const response2 = await fetch(newsurl);
    const newsData = await response2.json();
    setPaper(newsData);
  }
  useEffect(() => {
    getCountry(url);
  }, []);

  return (
    <div className="left-container">
      {paper &&
        paper.articles
          .slice(0, 8)
          .map(article => (
            <Article
              name={article.title}
              author={article.author}
              desc={article.description}
              urlImg={article.urlToImage}
            />
          ))}
    </div>
  );
};

export default News;
