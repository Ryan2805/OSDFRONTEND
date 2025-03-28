export interface User {
    id?: string;           
    name: string;         
    phonenumber?: string;  
    email: string;         
    dateJoined?: Date;    
    lastUpdated?: Date;    
    password?: string;    
    hashedPassword?: string; 
    role: string;  
  }