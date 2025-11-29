import {useEffect,useState} from "react";
import { useParams} from "react-router-dom";
import "../style/Wishlist.css";

interface WishListProps {
    id: string;
    member_id: string;
    itemName: string;
}
const wishlist: WishListProps[] = [
    
];

const WishList = ()=> {

    const {gifterId,gifteeId} = useParams<{gifterId: string, gifteeId: string}>();
    const [item,setItem] = useState("");
    const [giftersWishlist,setGiftersWishlist] = useState<WishListProps[]>([]);
    const [gifteesWishlist,setGifteesWishlist] = useState<WishListProps[]>([]);
    const [loading, setLoading] = useState(false);

    const handleDeleteWishSubmit = async (id: string) =>{
        try{
            const response = await fetch(`http://localhost:8080/wishlists/${id}`,{
                method: "DELETE",
            });
            if(!response.ok) throw new Error("Failed to deleting wish");
            setGiftersWishlist(giftersWishlist.filter(wish => wish.id !== id));
            alert("Wish has been deleted");
        }catch(err) {
            alert("Server error while trying to delete wish");
        }
    }

    const handleAddWishSubmit = async (id: string) =>{
        try{
            const response = await fetch(`http://localhost:8080/wishlists/${id}`,{
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({itemName : item}),
            });
            if(!response.ok) throw new Error('Failed saving your wish');
            alert("Wish has been saved");
        }catch(err){
            alert("Server error, failed to save wish");
        }
    };

    useEffect(()=>{
        if(!gifteeId || !gifterId) return;
    const fetchWishlists = async (gifterId: string, gifteeId: string) =>{
        setLoading(true);
        try{
            const responseGifter = await fetch(`http://localhost:8080/wishlists/${gifterId}`);
            const responseGiftee = await fetch(`http://localhost:8080/wishlists/${gifteeId}`);
            if(!responseGifter.ok || !responseGiftee.ok) throw new Error(`Failed getting wishlists
    Gifter: ${responseGifter.status} ${responseGifter.statusText}
     Giftee: ${responseGiftee.status} ${responseGiftee.statusText}`);
            const giftersData = await responseGifter.json();
            const gifteesData = await responseGiftee.json();
            setGiftersWishlist(giftersData);
            setGifteesWishlist(gifteesData);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    fetchWishlists(gifterId,gifteeId);
    
    },[]);
    

    if(loading) return <div>Loading ;v</div>;

    return(<>
    <div>
    <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
        <h2 className="text-center mb-4">
            giftee's WishList</h2>
        <div className="form-control mb-2 w-100">
            {gifteesWishlist.map(item =>(
                <li className="wishlist-item "
                    key={item.id}>{item.itemName}</li> 
                    
            ))}
        </div>


    </div>
    <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
        <h2 className="text-center mb-4">
            Your WishList</h2>
        <div className="form-control mb-2 w-100">
            {giftersWishlist.map(item =>(
                <li className="wishlist-item "
                 key={item.id}>{item.itemName} <button onClick={()=>{handleDeleteWishSubmit(item.id),console.log(item)} } className="btn btn-danger btn-sm">Delete Wish</button></li>       
            ))}
        </div>
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                if (!gifterId) {
                    alert("No gifterId provided!");
                    return;
                }
                handleAddWishSubmit(gifterId)}}>
                <input 
                placeholder="Your wish here..." type="text" required
                onChange={e => setItem(e.target.value)}
                value ={item}/>
                <button>Add new wish</button>
            </form>
        </div>
    </div>
    </div>
    </>);
}

export default WishList;