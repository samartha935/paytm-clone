
import z from "zod";


export const signUpSchema = z.object({
    firstName: z.string().max(30),
    lastName: z.string().max(30),
    username: z.string().min(3).max(10),
    email: z.string().email(),
    password: z.string().min(8).max(50),
});
  
  
export const signInSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(8).max(50),
});
  
  
export const updateInfoSchema = z.object({
    firstName : z.string().max(30).optional(),
    lastName: z.string().max(30).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).max(50).optional(),
})
  