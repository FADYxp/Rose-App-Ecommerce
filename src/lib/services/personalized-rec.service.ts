"use server"
import { getMyToken } from "../utils/get-my-token";

export async function getPersonalizedRecommendations(id: string) {
    const token = await getMyToken();
    const userToken = token?.accesstoken || ""; 

    if (!userToken) {
        console.error("DEBUG: No token found for user:", id);
        return { recommendations: [] }; 
    }

    const res = await fetch(`${process.env.API}/related/recommendations/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
         "Authorization": `Bearer ${userToken}`
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch personalized recommendations for product ${id}`);
        return { recommendations: [] }; 
    }

    return await res.json();
}