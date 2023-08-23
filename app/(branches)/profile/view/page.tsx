'use client'
import React, { useState, useEffect } from 'react';

const fetchProfile = () => {
    
    
}

export default function ProfileView() {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        fetchProfile();
    }
    , []);

    return (
        <div>
            <h1>Profile View</h1>
        </div>
    )
}
