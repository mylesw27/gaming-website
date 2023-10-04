'use client'
import { useEffect, useState } from 'react';

interface Profile {
    id: string;
    name: string;
    username: string;
    bio: string;
    avatar: string;
}

interface Game {
    _id: string;
    title: string;
    userName: string;
    userId: number;
    category: string;
    image: string;
    description: string;
}

export default function ProfileView({ params }: { params: { id: string } }) {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [games, setGames] = useState<Game[]>([]);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
     
    const fetchProfile = async () => {
        try {
            const response = await fetch(`${apiUrl}/api-v1/users/profile/${params.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            const data = await response.json();
            setProfile(data.user);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const fetchGames = async () => {
        try {
            const response = await fetch(`${apiUrl}/api-v1/game/user/${params.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }
            const data = await response.json();
            setGames(data.games);
            // console.log(gamesArray)
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    // console.log(profile)
    console.log(games)

    useEffect(() => {
        fetchProfile();
        fetchGames();
    }
    , []);


    return (
        <div>
            <h1>Profile View</h1>
            {profile ? 
            <>
                <div>
                    <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full" />
                    <h1>{profile.name}</h1>  
                    <p>{profile.bio}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4 md:text-3xl md:mb-6">Games</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {games.length > 0 ? (
                        games.map((game) => (
                        <div key={game._id} className="flex flex-col items-center space-y-6">
                            <a href={`../games/${game._id}`} className="text-center md:text-left">
                            <h3 className="text-3xl md:text-5xl font-bold mb-4">{game.title}</h3>
                            </a>
                            <img src={game.image} alt={game.title} className="w-24 h-24 rounded-full" />
                            <p className="text-base md:text-lg">Category: {game.category}</p>
                            <p className="text-base md:text-lg">Description: {game.description}</p>
                        </div>
                        ))
                    ) : (
                        <div>No games found.</div>
                    )}
                    </div>
                </div>
            </>
            : 
                <p>Loading...</p>
            }
        </div>
    )
}
