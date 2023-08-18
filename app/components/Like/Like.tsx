import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"

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
    const [user, setUser] = useState<User | null>(null)
    const [time, setTime] = useState<any>(null)
    const [like, setLike] = useState<any>(null)
    const token = localStorage.getItem("token")

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
    
    console.log(like)

    const submitLike = () => {
        setTime(new Date().getTime())
        console.log(game, user.id, time)
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
            {like ? 
            <h1 className="text-red-500" onClick={deleteLike}> Like {like._id} already exists</h1> 
            :
            <h1 className="text-red-500" onClick={submitLike}> &lt;3</h1>
            } 
        </>
    )
}