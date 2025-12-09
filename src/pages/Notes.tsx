import { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";


export default function Notes() {
const [text, setText] = useState("");


return (
<div className="p-6 max-w-md mx-auto space-y-4">
<h1 className="text-xl font-bold">Notes</h1>


<Textarea
placeholder="Write your notes..."
value={text}
onChange={(e) => setText(e.target.value)}
/>


<Button className="w-full">Save Notes</Button>
</div>
);
}