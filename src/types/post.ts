import { Timestamp } from 'firebase/firestore';

export interface Post {
  id: string;
  username: string;
  read: boolean;
  timestamp: Timestamp;
  imageUrl: string;
  profilePic?: string;
}
