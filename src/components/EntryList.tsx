import {useState} from "react";

interface EntryProps {
    name: string;
    email: string;
}


const EntryList = () =>{
    const [entries, setEntries] = useState<EntryProps[]>([]);
    const[name,setname] = useState("");
    const [email,setEmail] = useState("");

    const addEntry = (e: React.FormEvent) =>{
        e.preventDefault();
        if(!name || !email) return;
        setEntries([...entries,{name,email}]);
        setname("");
        setEmail("");
    }

    const removeEntry = (index: number) =>{
        setEntries(entries.filter((_,i)=> i !==index));
    }; 

    
    const sendInvitations = async() =>{
        try{
            if(entries.length <=2) {
                alert('Minimum of 3 invitations are required');
                return;
            }
            const response = await fetch('http://localhost:5000/api/santaEventCreate',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(entries),
            });
            if(!response.ok) throw new Error('Failed sending invitations');
            alert('Invitations have been sent');
        }catch(error){
            alert('Faild sending invitations, Server error');
        }

}

    return (<>
    <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
        <h1 className="text-center mb-4">
            Participants list
            </h1>
        <form onSubmit={addEntry} className="mb-3 w-100">
            <input value={name} className="form-control mb-2 w-100" type="text" placeholder="Participants name" onChange={e=> setname(e.target.value)}/>
            <input value={email} className="form-control mb-2 w-100" type="email" placeholder ="Participants email" onChange={e=> setEmail(e.target.value)}/>
            <button className="btn btn-primary w-100" type="submit">
                Add Participant
            </button>
        </form>
        <ul className="list-group">
        {entries.map((entry,idx)=>(
            <li className="list-group-item">
                <span>
                    <strong>{entry.name}</strong> ({entry.email})
                </span>
                <button onClick={()=>removeEntry(idx)} className="btn btn-danger btn-sm">
                    Remove participant
                </button>
            </li>
        ))
          }
        </ul>
        </div>
        <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
            <button onClick={sendInvitations} className="btn btn-success w-100">
                Send event invitations
            </button>
        </div>
    </>);

}

export default EntryList;