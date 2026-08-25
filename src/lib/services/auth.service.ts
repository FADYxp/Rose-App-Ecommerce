type LoginPayload = {
  email: string;
  password: string;
};

export async function loginRequest(payload: LoginPayload) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json(); // { token, user }
}
