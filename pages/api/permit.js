import { createPermit } from "../../prisma/Permit";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  // Get the current session data with {user, email, id}
  const session = await getSession({ req });
  // Run if the request was a post request
  if (req.method == "POST") {
    // Get permit event deets from the request body
    const { event } = req.body;
    // Create a new permit
    // also pass the session which would be use to get the user information
    const permit = await createPermit(event, session);
    // return created permit
    return res.json(permit);
  }

  // Run if the request is a PUT request
  else if (req.method == "PUT") {
    const { id, event } = req.body;

    // const updatedData = {event}
    // Update current permit
    // also pass the session which would be use to get the user information
    const permit = await updatePermit(id, { event }, session);
    // return updated permit
    return res.json(permit);
  }

   // Run if the request is a DELETE request
   else if (req.method == "DELETE") {
    const { id } = req.body;
    const permit = await deletePermit(id, session);
    // return deleted permit
    return res.json(permit);
  }
}


