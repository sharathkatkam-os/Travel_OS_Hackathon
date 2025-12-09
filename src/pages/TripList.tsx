import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";


export default function TripList() {
return (
<div className="p-6 space-y-4 max-w-xl mx-auto">
<h1 className="text-2xl font-bold">Your Trips</h1>


<Link to="/new">
<Button>Add New Trip</Button>
</Link>
</div>
);
}