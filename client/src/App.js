import { useState, useEffect } from 'react';
import Table from './Table';
import logo from './logo.svg';
import './App.css';
import CreateCustomer from './CreateCustomer';
import { useFormState } from './useFormState';

function App() {
  const [isCustomersButton, setCustomersButton] = useState(false);
  const [response, setResponse] = useState([]);
  const [searchCustomers, setCustomers] = useState('');
  const [searchResponse, setSearchResponse] = useState([]);
  const [deleteResponse, setDeleteResponse] = useState('');
  const [state, dispatch] = useFormState();
  const { email, name, address, phone, password } = state;

  const fetchCustomers = () => {
    fetch('/api/customer')
      .then((res) => res.json())
      .then((data) => {
        setResponse(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, [isCustomersButton]);

  useEffect(() => {
    fetch(`/api/customer/${searchCustomers}`)
      .then((res) => res.text())
      .then((data) => {
        setSearchResponse(data);
      })
      .catch((err) => console.log(err));
  }, [searchCustomers]);

  useEffect(() => {
    setTimeout(() => {
      setDeleteResponse('');
    }, 5000);
  }, [deleteResponse]);

  function handleForm(event) {
    // console.log(state);
    event.preventDefault();
    fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        name: name,
        address: address,
        phone_nr: phone,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchCustomers();
      })
      .catch((err) => console.log(err));
  }

  function deleteEntry(id) {
    fetch(`api/customer/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        setDeleteResponse(data);
        fetchCustomers();
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main style={{ margin: '0 auto', maxWidth: '960px' }}>
        <h2>Search for Customer</h2>
        <input
          className="search"
          type="text"
          value={searchCustomers}
          onChange={(e) => setCustomers(e.target.value)}
          placeholder="Enter email"
        />
        <section>
          {searchCustomers.length > 0 &&
            searchResponse &&
            searchResponse.map((user, index) => (
              <Table key={user.email + index} user={user} />
            ))}
        </section>

        <CreateCustomer onClick={handleForm} />

        <h2>All Customers</h2>
        <button onClick={() => setCustomersButton(!isCustomersButton)}>
          toggle all Customers
        </button>
        <section>
          {isCustomersButton &&
            response &&
            response.map((user) => (
              <Table
                key={user.email}
                user={user}
                isDeletable
                onClick={() => deleteEntry(user.email)}
              />
            ))}
          {deleteResponse && <p style={{ marginTop: 32 }}>{deleteResponse}</p>}
        </section>
      </main>
    </div>
  );
}

export default App;
