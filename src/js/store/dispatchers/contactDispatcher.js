
export const createContactDispatcher = async (data) => {

    console.log(data)
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/albert/contacts`,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const response_data = await response.json();
    if(response.ok){
        return {
            ok:true,
            contact:response_data
        }
    }
    return {
        ok:false,
        message: "Error Creating the contact, please refresh and try again."
    }
}

export const modifyContactDispatcher = async (data) => {

    const response = await fetch(`https://playground.4geeks.com/contact/agendas/albert/contacts/${data.id}`,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({name:data.name, phone:data.phone, email:data.email, address:data.address})
    });
    const response_data = await response.json();
    if(response.ok){
        return{
            ok:true,
            contact: response_data
        }
    }
    return {
        ok:false,
        message: "Error editing the contact"
    }
}

export const deleteContactDispatcher = async (id) => {

    const response = await fetch(`https://playground.4geeks.com/contact/agendas/albert/contacts/${id}`,{
        method: 'DELETE'
    });

    if(response.ok){
        return{
            ok:true
        }
    }
    return {
        ok:false,
        message: "Error deleting the Contact."
    }
}