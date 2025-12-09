import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";


export default function AddActivity() {
const [activity, setActivity] = useState("");


return (
<div className="p-6 max-w-md mx-auto space-y-4">
<h1 className="text-xl font-bold">Add Activity</h1>


<Input
placeholder="Activity name"
value={activity}
onChange={(e) => setActivity(e.target.value)}
/>


<Button className="w-full">Save</Button>
</div>
);
}