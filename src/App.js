import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';
import Counter from './Counter';
import Header from './Header';


class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: []
  }

lastGuestId = 0;

newGuestId = ()=> {
  const id = this.lastGuestId;
  this.lastGuestId += 1;
  return id;
}

  toggleGuestProperty = (property, id) => {
    this.setState({
      guests: this.state.guests.map((guest) => {
        if (id === guest.id) {
          return {
            ...guest,
            [property]: !guest[property]
          }
        }
        return guest;
      })
    })
  }

  setName = (name, id) => {
    this.setState({
      guests: this.state.guests.map((guest) => {
        if (id === guest.id) {
          return {
            ...guest,
            name
          }
        }
        return guest;
      })
    })
  }

  toggleConfirmation = id =>
    this.toggleGuestProperty("isConfirmed", id);

  removeGuest = id =>
    this.setState({
      guests: this.state.guests.filter(guest => id !== guest.id)
    });


  toggleEditing = id =>
    this.toggleGuestProperty("isEditing", id);

  toggleFilter = () =>
    this.setState({ isFiltered: !this.state.isFiltered });

  handleNameInput = (event) =>
    this.setState({ pendingGuest: event.target.value });

  newGuestSubmitHandler = (event) => {
    event.preventDefault();
    const id = this.newGuestId();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id
        },
        ...this.state.guests
      ],
      pendingGuest: ''
    })
  }


  // get the total number of invited guests
  getTotalInvited = () => this.state.guests.length;

  getAttendingGuests = () =>
    this.state.guests.reduce((total, guest) => guest.isConfirmed ? total + 1 : total, 0);

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
      <div className="App">
        <Header newGuestSubmitHandler = {this.newGuestSubmitHandler}
          handleNameInput = {this.handleNameInput}
          pendingGuest = {this.state.pendingGuest}

        />
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
            totalInvited={totalInvited}
            numberAttending={numberAttending}
            numberUnconfirmed={numberUnconfirmed}
          />

          <GuestList guests={this.state.guests}
            toggleConfirmation={this.toggleConfirmation}
            toggleEditing={this.toggleEditing}
            setName={this.setName}
            isFiltered={this.state.isFiltered}
            removeGuest={this.removeGuest}
            pendingGuest={this.state.pendingGuest}
          />
        </div>
      </div>
    );
  }
}

export default App;
