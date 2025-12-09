import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";


export default function SignUp() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


return (
<div className="p-6 max-w-md mx-auto space-y-4">
<h1 className="text-2xl font-bold">Create Account</h1>


<Input
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>


<Input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>


<Button className="w-full">Sign Up</Button>
</div>
);
}