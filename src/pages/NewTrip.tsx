import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";


export default function NewTrip() {
const [title, setTitle] = useState("");


return (
<div className="p-6 max-w-md mx-auto space-y-4">
<h1 className="text-xl font-bold">Create New Trip</h1>


<Input
placeholder="Trip name"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>


<Button className="w-full">Create Trip</Button>
</div>
);
}