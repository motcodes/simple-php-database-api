import React from 'react';

export default function Table({ user, onClick, isDeletable = false }) {
  return (
    <div key={user.email} className="grid">
      <p>{user.email}</p>
      <p>{user.name}</p>
      <p>{user.address}</p>
      <p>{user.phone_nr}</p>
      {isDeletable && (
        <button className="danger" onClick={onClick}>
          delete
        </button>
      )}
    </div>
  );
}
