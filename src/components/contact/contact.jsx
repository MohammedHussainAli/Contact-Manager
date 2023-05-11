import React, { useState } from "react";
import "./contact.css";
export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("active");
  const [contacts, setContacts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = { firstName, lastName, status };
    if (editIndex === null && firstName && lastName) {
      setContacts([...contacts, newContact]);
    } else if (editIndex !== null && firstName && lastName) {
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = newContact;
      setContacts(updatedContacts);
      setEditIndex(null);
    }
    setFirstName("");
    setLastName("");
    setStatus("active");
    setIsFormVisible(false);
  };

  const handleEdit = (index) => {
    const contact = contacts[index];
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setStatus(contact.status);
    setEditIndex(index);
    setIsFormVisible(true);
  };

  const handleDelete = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setFirstName("");
    setLastName("");
    setStatus("active");
    setEditIndex(null);
  };

  const handleView = (index) => {
    const contact = contacts[index];
    alert(
      `Name: ${contact.firstName} ${contact.lastName}\nStatus: ${contact.status}`
    );
  };

  return (
    <>
      {" "}
      <div>
        {contacts.length === 0 ? (
          <div className="no_contact_text">
            <p>
              No contacts found, Please add contacts from Create Contact Button
            </p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Status</th>
                <th>Controls</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.firstName}</td>
                  <td>{contact.lastName}</td>
                  <td>{contact.status}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(index)}
                      className="button_one"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleView(index)}
                      className="button_three"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="button_two"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="ceate_button_div">
          <button onClick={handleOpenForm} className="create_button">
            Create Contact
          </button>
        </div>

        {isFormVisible && (
          <div class="card">
            <div class="card2">
              <form class="form" onSubmit={handleSubmit}>
                <h2 id="heading">Contact Form</h2>
                <div class="field">
                  <i class="fa-solid fa-user"></i>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    class="input-field"
                    id="first-name"
                    placeholder="First Name"
                    autocomplete="off"
                  />
                </div>
                <div class="field">
                  <i class="fa-solid fa-lock"></i>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    class="input-field"
                    id="last-name"
                    placeholder="Last Name"
                  />
                </div>{" "}
                <br />
                <label className="status_out">
                  Status: <br /> <br />
                  <label className="status">
                    <input
                      className="radio_btn"
                      type="radio"
                      value="active"
                      checked={status === "active"}
                      onChange={(event) => setStatus(event.target.value)}
                    />
                    Active
                  </label>{" "}
                  <br />
                  <label className="status">
                    <input
                      className="radio_btn"
                      type="radio"
                      value="inactive"
                      checked={status === "inactive"}
                      onChange={(event) => setStatus(event.target.value)}
                    />
                    Inactive
                  </label>
                </label>
                <div class="btn">
                  <button type="submit" class="button">
                    {editIndex !== null ? "Save" : "Add"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    class="button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
