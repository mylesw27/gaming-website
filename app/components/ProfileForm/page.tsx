'use client';
import PasswordReset from '../../components/PasswordReset/page';
import Navigation from '../../components/Navigation/page';
import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Textarea } from '../../../components/ui/textarea';
import { useToast } from '../../../components/ui/use-toast';
import { Input } from '@/components/ui/input';

interface Game {
  userId: number;
  _id: string;
  title: string;
  userName: string;
  category: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export function ProfileForm() {
  const [bio, setBio] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);

  const profileFormSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: 'Username must be at least 2 characters.',
      })
      .max(30, {
        message: 'Username must not be longer than 30 characters.',
      }),
    email: z
      .string({
        required_error: 'Please select an email to display.',
      })
      .email(),
    bio: z.string().max(160).min(4).optional(),
    password: z.string().min(8).max(100).optional(),
    avatar: z.string().url({ message: 'Please enter a valid URL.' }),
    urls: z
      .array(
        z.object({
          value: z.string().url({ message: 'Please enter a valid URL.' }),
        })
      )
      .optional(),
  });

  type FormValues = {
    avatar: string;
    username: string;
    email: string;
    bio?: string;
    password?: string;
    urls?: { value: string }[];
};

  const token = localStorage.getItem('token');
  if (!token) {
    console.log('Token not found.');
    // Handle error scenario, such as redirecting to the login page
    return;
  }
  const decodedToken = jwt.decode(token);
  if (!decodedToken || typeof decodedToken !== 'object') {
    console.log('Decoded token not found or invalid.');
    // Handle error scenario, such as redirecting to the login page
    return;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(profileFormSchema),
  });
  

  // UPDATE PROFILE
  const updateProfile = async (data: FormValues) => {
    try {
      const userId = decodedToken.id;

      const endpoint = `http://localhost:8000/api-v1/users/profile/${userId}`;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({bio, avatar, password}),
      });

      if (response.ok) {

        console.log(`Profile update successful!`);
      } else {
        console.log(`Profile update failed.`);
      }
    } catch (error) {
      console.log(`An error occurred during profile update:`, error);
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();  // Prevent default button behavior
    const values = form.getValues();
    console.log('values', values);
    updateProfile(values);
};


  
  

  return (
    <div>
      <Form {...form}>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share a brief introduction about yourself"
                    className="resize-none"
                    {...field}
                    value={bio}
                    name="bio"
                    onChange={(e) => setBio(e.target.value)}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations to
                  reference them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Paste the URL of your profile picture"
                    {...field}
                    value={avatar}
                    name="avatar"
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Change Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your new password" {...field} name='password' value={password} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button onClick={handleButtonClick}>Update Profile</Button>


      </Form>


    </div>
  );
}
