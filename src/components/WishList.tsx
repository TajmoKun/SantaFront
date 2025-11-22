import {useEffect,useState} from "react";
import "../style/Wishlist.css";

interface WishListProps {
    id: string;
    member_id: string;
    item: string;
}
const wishlist: WishListProps[] = [
    
];

const WishList = ()=> {

    const [item,setItem] = useState("");
    const [giftersWishlist,setGiftersWishlist] = useState<WishListProps[]>([]);
    const [gifteesWishlist,setGifteesWishlist] = useState<WishListProps[]>([]);
    const [loading, setLoading] = useState(false);

    const handleDeleteWishSubmit = async (id: string) =>{
        try{
            const response = await fetch(`http://localhost:5000/api/wishlists/delete-${id}`,{
                method: "DELETE",
            });
            if(!response.ok) throw new Error("Failed to deleting wish");
            setGiftersWishlist(giftersWishlist.filter(wish => wish.id !== id));
            alert("Wish has been deleted");
        }catch(err) {
            alert("Server error while trying to delete wish");
        }
    }

    const handleAddWishSubmit = async () =>{
        try{
            const response = await fetch(`http://localhost:5000/api/wishlists/create`,{
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({item}),
            });
            if(!response.ok) throw new Error('Failed saving your wish');
            alert("Wish has been saved");
        }catch(err){
            alert("Server error, failed to save wish");
        }
    };

    useEffect(()=>{
    const fetchWishlists = async (gifterId: string, gifteeId: string) =>{
        setLoading(true);
        try{
            const responseGifter = await fetch(`http://localhost:5000/api/wishlists/getGifters-${gifterId}`);
            const responseGiftee = await fetch(`http://localhost:5000/api/wishlists/getGiftee-${gifteeId}`);
            if(!responseGifter.ok || responseGiftee.ok) throw new Error('Failed getting wishlists');
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
    fetchWishlists("bla bla bla","bla bla bla");
    setGiftersWishlist([{id: "5123-51210sdfgs3-gasdg-1235", member_id: "51235-sdfgsd1234275123-agsdg-asdg-2153", item:"Teemo figurine"},
    {id: "5123sdfgsdf-5123-gasdg-1235", member_id: "51235-12351sdfg23-agsdg-asdg-2153", item:"Teemo necklase"}]);
    setGifteesWishlist([{id: "5123-5123-525gasdg-1235", member_id: "51235-123828225123-agsdg-asdg-2153", item:"Teemo figurine"},
    {id: "5123-5123-gasdfgsdfgssdg-1235", member_id: "51235-1235123-agsdg-asdg-2153", item:"Teemo necklase"}]);
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
                    key={item.id}>{item.item}</li> 
                    
            ))}
        </div>


    </div>
    <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
        <h2 className="text-center mb-4">
            Your WishList</h2>
        <div className="form-control mb-2 w-100">
            {giftersWishlist.map(item =>(
                <li className="wishlist-item "
                 key={item.id}>{item.item} <button onClick={()=>{handleDeleteWishSubmit(item.id),console.log(item)} } className="btn btn-danger btn-sm">Delete Wish</button></li> 
                 
            ))}
        </div>
        <div>
            <form onSubmit={handleAddWishSubmit}>
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