import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'
const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResult] = useState(0)
    // document.title = props.category;

  
  const  updateNews = async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
setLoading(true);
    props.setProgress(30);
    let data = await fetch(url);
    props.setProgress(70);
    let parseData = await data.json();
    setArticles(parseData.articles)
    setTotalResult(parseData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews();
  }, [])
  
  const handlePrevClick = async () => {
    setPage(page-1)
    updateNews();
  }
 const handleNextClick = async () => {
  setPage(page+1)
  updateNews();      
    }
  
  const fetchMoreData = async () => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;  
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles))
    setTotalResult(parseData.totalResults)
  };

    return (
      <>
        <h1 className="text-center" sttyle={{ margin: "35px" }}>NewsMonkey - Top props.category Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} descripton={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>


      </>
    )
  
}

News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",

}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News