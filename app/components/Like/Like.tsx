import { useEffect, useState } from "react"

export default function Like(props: {game: any}) {
    const [game, setGame] = useState(props.game)

    const submitLike = () => {
        console.log(game._id)
    }

    return (
        <>
            <h1 className="text-red-500" onClick={submitLike}> &lt;3</h1>  
        </>
    )
}