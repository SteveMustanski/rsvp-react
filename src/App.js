import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';
import Counter from  './Counter';

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: 'Steve',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Pepper',
        isConfirmed: true,
        isEditing: false
      },
      {
        name: 'John',
        isConfirmed: true,
        isEditing: false
      }
    ]
  }



  toggleGuestPropertyAt = (property, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          }
        }
        return guest;
      })
    })
  }

  setNameAt = (name, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            name
          }
        }
        return guest;
      })
    })
  }

  toggleConfirmationAt = index =>
    this.toggleGuestPropertyAt("isConfirmed", index);

  removeGuestAt = index => 
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index + 1)
      ]
    });


  toggleEditingnAt = index =>
    this.toggleGuestPropertyAt("isEditing", index);

  toggleFilter = () =>
    this.setState({ isFiltered: !this.state.isFiltered });

  handleNameInput = (event) =>
    this.setState({ pendingGuest: event.target.value });

  newGuestSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: ''
    })
  }


  // get the total number of invited guests
  getTotalInvited = () => this.state.guests.length;

  // getAttendingGuests = () =>

  // getUnconfirmedGuests = () =>


  render() {
    const totalInvited = this.getTotalInvited();
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Simple RSVP Tracker</p>
          <form onSubmit={this.newGuestSubmitHandler}>
            <input type="text"
              onChange={this.handleNameInput}
              value={this.state.pendingGuest}
              placeholder="Invite Someone" />
            <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input
                type="checkbox"
                onChange={this.toggleFilter}
                checked={this.state.isFiltered}
              /> Hide those who haven't responded
          </label>
          </div>

          <Counter 
          totalInvited = {totalInvited}/>

          <GuestList guests={this.state.guests}
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingnAt}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={this.state.pendingGuest}
          />
        </div>
      </div>
    );
  }
}

export default App;
