import React, { useEffect, useState } from 'react';
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { collection, getDocs, where, query } from 'firebase/firestore';
import Modal from 'react-modal';
import { useStateValue } from '../../contexts/StateProvider';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin

const customModalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '800px',
    maxHeight: '80%',
    overflowY: 'auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  }
};

const ShowMyEvents = () => {
  const [{ user }] = useStateValue();
  const [myEvents, setMyEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchMyEvents = async () => {
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, where('event_email', '==', user.user_email));

      try {
        const querySnapshot = await getDocs(q);
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          registered_persons: doc.data().registered_persons || [] // Ensure registered_persons is an array
        }));
        setMyEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (user.user_email) {
      fetchMyEvents();
    }
  }, [user.user_email]);

  const handleShowRegisteredPersons = async (eventId) => {
    try {
      const eventRef = doc(db, 'events', eventId);
      const eventDoc = await getDoc(eventRef);
      if (eventDoc.exists()) {
        setSelectedEvent(eventDoc.data());
        setModalIsOpen(true);
      } else {
        console.error("No such event!");
      }
    } catch (error) {
      console.error('Error fetching registered persons:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Registered Persons', 14, 22);

    if (selectedEvent?.registered_persons && selectedEvent.registered_persons.length > 0) {
      const headers = [["Name", "Email"]];
      const data = selectedEvent.registered_persons.map(person => [person.user_name, person.user_email]);

      doc.autoTable({
        startY: 30,
        head: headers,
        body: data,
      });

      doc.save('registered_persons.pdf');
    } else {
      doc.text('No registered persons found.', 14, 30);
      doc.save('registered_persons.pdf');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myEvents?.length === 0 && <p className="text-gray-600">No events found.</p>}
        {myEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src={event.event_img} alt={event.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex-grow">
              <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-2">{event.short_description}</p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Location:</span> {event.event_location}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Hosted by:</span> {event.hosted_by}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Date:</span>{' '}
                {/* {new Date(event.event_date?.toDate()).toLocaleString()} */}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Status:</span> {event.event_status}
              </p>
              <p className="text-gray-600 mb-4">{event.details}</p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Contact:</span> {event.contact}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Registered Persons:</span> {event.registered_persons.length}
              </p>
              <button
                onClick={() => handleShowRegisteredPersons(event.id)}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Show Registered Persons
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyle}
        contentLabel="Registered Persons Modal"
      >
        <div>
          <h2 className="text-2xl font-semibold mb-4">Registered Persons</h2>
          {selectedEvent?.registered_persons && selectedEvent.registered_persons.length > 0 ? (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedEvent.registered_persons.map((person, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.user_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.user_email}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleDownloadPDF}
                className="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Download PDF
              </button>
            </>
          ) : (
            <p className="text-gray-600">No registered persons found.</p>
          )}
        </div>
        <button
          onClick={closeModal}
          className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-md shadow-sm"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ShowMyEvents;
