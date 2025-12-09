import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function AddDestination() {
const [name, setName] = useState("");


return (
<div className="p-6 max-w-md mx-auto space-y-4">
<h1 className="text-xl font-bold">Add Destination</h1>


<Input
placeholder="Destination name"
value={name}
onChange={(e) => setName(e.target.value)}
/>


<Button className="w-full">Save</Button>
</div>
);
}