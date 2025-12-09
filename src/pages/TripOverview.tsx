import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";


export default function TripOverview() {
const { id } = useParams();


return (
<div className="p-6 space-y-4 max-w-xl mx-auto">
<h1 className="text-2xl font-bold">Trip Overview</h1>
<p>Trip ID: {id}</p>


<div className="space-y-2">
<Link to={`/trip/${id}/add-destination`}>
<Button className="w-full">Add Destination</Button>
</Link>


<Link to={`/trip/${id}/add-activity`}>
<Button className="w-full">Add Activity</Button>
</Link>


<Link to={`/trip/${id}/notes`}>
<Button className="w-full">Notes</Button>
</Link>
</div>
</div>
);
}