import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import axios from 'axios';
import ImageResults from '../Image-Results/ImageResults'

export default class Search extends Component {
  state = {
    searchText: '',
    amount: 15,
    apiUrl: 'https://pixabay.com/api/',
    apiKey: '11661992-7f8e94c42a7747c0874960804',
    images: []
  }

  onTextChangeHandler = (event) => {
    const emptyValue = event.target.value
    this.setState({ [event.target.name]: emptyValue }, () => {
      if (emptyValue === '') {
        this.setState({ images: [] })
      } else {
        axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      }
    })
  }

  onAmountChangeHandler = (event, index, value) => {
    this.setState({ amount: value })
  }

  render() {
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChangeHandler}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="amount"
          value={this.state.amount}
          onChange={this.onAmountChangeHandler}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
      </div >
    )
  }
}
