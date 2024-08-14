import { checkIfAgendaExistDispatcher, createAgendaDispatcher } from "./dispatchers/agendaDispatcher.js";
import { createContactDispatcher, modifyContactDispatcher, deleteContactDispatcher } from "./dispatchers/contactDispatcher.js";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction

			checkAgendaExistsOrCreate: async () => {
				const action = getActions();

				const response_get_agenda = await checkIfAgendaExistDispatcher();
				if(response_get_agenda.ok){
					console.log("Agenda already existed");
					action.createContacts(response_get_agenda.contacts)
					return{
						ok:true
					}
				}
				if(response_get_agenda.ok === false && response_get_agenda.notFound === true){
					const response_create_agenda = await createAgendaDispatcher();
					if(response_create_agenda.ok){
						console.log("Agenda Created");
						
						return{
							ok:true
						}
					}
					return {
						ok:false,
						message: response_create_agenda.message || "Error while creating the agenda"
					}
				}
			},
			createContacts: (contacts) => {
				const store = getStore();
				setStore({...store, contacts:contacts})
			},

			deleteContact: async (id) => {
				const store = getStore();
				const response = await deleteContactDispatcher(id);
				if(response.ok){
					const newStoreContacts = store.contacts.filter(contact => contact.id !== id);
					setStore({...store, contacts:newStoreContacts});
					return{
						ok:true
					}
				}
				return{
					ok:false,
					message:response.message
				}
			},
			
			addContact: async (data) => {
				const store = getStore();
				const response = await createContactDispatcher(data);

				if (response.ok) {
					const newContacts = [...store.contacts, response.contact];
					setStore({ ...store, contacts: newContacts });
					return {
						ok: true
					};
				}
				return{
					ok:false,
					message:response.message || "Something went wrong."
				}

			},
			updateContact: async (data) => {
				const store = getStore();
				const response = await modifyContactDispatcher(data);

				if (response.ok) {
					const updatedContacts = store.contacts.map(contact => 
						contact.id === response.contact.id ? response.contact : contact
					);
			
					setStore({ ...store, contacts: updatedContacts });
			
					return {
						ok: true
					};
				}
				return {
					ok:false,
					message: response.message
				}

			}
			
		}
	};
};

export default getState;
