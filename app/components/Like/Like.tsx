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
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token) {
            const decoded: User = jwt_decode(token)
            setUser(decoded)
        }
        setTime(new Date().getTime())
    }, [])

    const submitLike = () => {
        console.log(game, user.id, time)
        fetch(`http://localhost:8000/api-v1/like/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({user_id: user.id, game_id: game, time: time})
        })

    }

    return (
        <>
            <h1 className="text-red-500" onClick={submitLike}> &lt;3</h1>  
        </>
    )
}