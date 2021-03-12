import React, { useState } from 'react';
import { useFormState } from './useFormState';

export default function CreateCustomer({ onClick }) {
  const [isOpen, toggleOpen] = useState(false);
  const [state, dispatch] = useFormState();
  const { email, name, address, phone, password } = state;

  return (
    <section>
      <h2>Create customer</h2>
      <button onClick={() => toggleOpen(true)}>+</button>
      {!isOpen && (
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="search"
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => dispatch({ type: 'email', value: e.target.value })}
          />
          <label htmlFor="name">Full name</label>
          <input
            className="search"
            type="text"
            name="name"
            id="name"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => dispatch({ type: 'name', value: e.target.value })}
          />
          <label htmlFor="address">Address</label>
          <input
            className="search"
            type="text"
            name="address"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) =>
              dispatch({ type: 'address', value: e.target.value })
            }
          />
          <label htmlFor="phone">Phone Nr</label>
          <input
            className="search"
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter phone nummer"
            value={phone}
            onChange={(e) => dispatch({ type: 'phone', value: e.target.value })}
          />
          <label htmlFor="password">Password</label>
          <input
            className="search"
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              dispatch({ type: 'password', value: e.target.value })
            }
          />
          <button className="submit" onClick={onClick}>
            create customer
          </button>
        </div>
      )}
    </section>
  );
}
