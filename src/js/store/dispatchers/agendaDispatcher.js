

    export const checkIfAgendaExistDispatcher = async () => {

        const response = await fetch(`https://playground.4geeks.com/contact/agendas/albert`,{
            method: 'GET',
            headers:{
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if(response.ok){
            return {
                ok:true,
                contacts: data.contacts || []
            }
        }
        if(response.status === 404){
            return {
                ok:false,
                notFound:true
            }
        }
    }

    export const createAgendaDispatcher = async () => {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/albert`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if(response.ok){
            return{
                ok:true,
                contacts: []
            }
        }
        return{
            ok:false,
            message: data.details.msg || "Error creating Agenda"
        }
    }