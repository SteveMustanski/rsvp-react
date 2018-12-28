import React from 'react';

const Header = (props) =>
  <header>
    <h1>RSVP</h1>
    <p>A Simple RSVP Tracker</p>
    <form onSubmit={props.newGuestSubmitHandler}>
      <input type="text"
        onChange={props.handleNameInput}
        value={props.pendingGuest}
        placeholder="Invite Someone" />
      <button type="submit" name="submit" value="submit">Submit</button>
    </form>
  </header>


export default Header;