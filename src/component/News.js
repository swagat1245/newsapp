import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }

  }
  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=d637576a17c540abab8f1d5392116aa1&pageSize=20";
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults })

  }
  handlePrevClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d637576a17c540abab8f1d5392116aa1&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles
    })
  }
  handleNextClick = async () => {
    console.log("next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d637576a17c540abab8f1d5392116aa1&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles
      })
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h1>NewsMonkey - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} descripton={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}

          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>

        </div>
      </div>

    )
  }
}

export default News