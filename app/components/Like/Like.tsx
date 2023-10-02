import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"

interface Game {   
    _id: string;
  title: string;
  userName: string;
  category: string;
  description: string;
  image: string;
  techstack: string;
  github: string;
  link: string;
  likes: number;
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

interface User {   
    email: string;
    exp: number;
    iat: number;
    id: string;
    name: string;
    userName: string;
}

export default function Like(props: {game: Game}) {
    const [game, setGame] = useState(props.game._id)
    const [user, setUser] = useState<User>({email: "", exp: 0, iat: 0, id: "", name: "", userName: ""})
    const [time, setTime] = useState<any>(null)
    const [like, setLike] = useState<any>(null)
    const token = localStorage.getItem("token") || ""

    useEffect(() => {
        if (token) {
            const decoded: User = jwt_decode(token)
            setUser(decoded)
        }
    }, [])

    useEffect(() => {
        if (user && game) {
            try {
                const response = fetch(`http://localhost:8000/api-v1/like/${user.id}/${game}`)
                .then(response => response.json())
                .then(data => setLike(data.like))
            } catch (error) {
                console.log(error)
            }
        }
    }, [user, game])

    const submitLike = () => {
        setTime(new Date().getTime())
        const response = fetch(`http://localhost:8000/api-v1/like/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({user_id: user.id, game_id: game, time: time})
        })
        .then(response => response.json())
        .then(data => setLike(data.like))
    }

    const deleteLike = () => {
        fetch(`http://localhost:8000/api-v1/like/${like._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
        setLike(null)
    }

    return (
        <>
            <div 
            className="flex w-10 h-10 justify-center items-center bg-opacity-60 hover:bg-opacity-70 relative"
            >
                {like ? 
                <h1 className="text-red-600 text-center  absolute" onClick={deleteLike}><AiFillHeart /></h1> 
                :
                <h1 className="text-red-600 text-center  absolute" onClick={submitLike}><AiOutlineHeart /></h1>
                } 
            </div>
        </>
    )
}