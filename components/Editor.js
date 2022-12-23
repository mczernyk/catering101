import { useEffect, useState } from "react"
import { CheckCircleIcon } from "@heroicons/react/solid"
import { usePermit, useDispatchPermit, usePermits, useDispatchPermits } from "../modules/AppContext"
import RandomID from "../modules/RandomID";


// making editor for new catering permit applications
const Editor = () => {
  // the current permit, imported from AppContext. used to edit or create new permit
  const currentPermit = usePermit();
  const setCurrentPermit = useDispatchPermit();

  // the array of saved permits
  const permits = usePermits();
  const setPermits = useDispatchPermits();

  // edit permit states
  // event: { time, location, requirements, }
  const [event, setEvent] = useState({
    name: '',
    time: '',
    location: '',
    liquor: '',
    venueName:'',
    email:'',
    phone: '',
    contactName: '',
    contactSSN: '',
    contactDOB: '',
    companyType: '',
    address: ''
  });

  const [permitID, setPermitID] = useState(null);
  const [permitAction, setPermitAction] = useState("add");
  const [isSaved, setIsSaved] = useState(false);

  // functions to capture form data for each category; handles multiple fields for each

  const handleEventChange = (evt) => {
    // get input values
    let value = evt.target.value

    //set event state for input values
    setEvent({
      ...event,
      [evt.target.name]: value
    });
  };



  // function to save permit to saved permits array
  const savePermit = () => {
    console.log('clicked')
    if (event) {

      // check if permit already has an ID, if it does asign the current id to the permit object,
      // if not, assign a new random ID to the permit object

      let id = permitID || RandomID(event.name.slice(0, 5), 5);

      // the permit object
      let permit = {
        id,
        event,
        reviewed: false
      };

      console.log('permit', permit)

      try {
        if (permitAction == "edit") {

          console.log('hit edit')

          // edit in permits list
          setPermits({ permit, type: "edit" });

          console.log({ permit, permitAction, permitID, permits });

        } else {

          console.log('hit add')

          // add to permits list
          setPermits({ permit, type: "add" });
        }

        setIsSaved(true)

        // clear permit content
        permit = {event: { name: '', time: '', location: '', liquor: '', venueName:'', email:'', phone: '', contactName: '', contactSSN: '', contactDOB: '', companyType: '', address: ''}};

        console.log('reset event', permit.event)

        // clear editor
        setEvent(permit.event);

        console.log('cleared event', event)


        // clear current permit state
        setCurrentPermit(permit)
      } catch (error){
        console.log(error)
      }
    }
  }

  // enable the button whenever the form content changes
  useEffect(() => {
    if (event.name) setIsSaved(false);
    else setIsSaved(true);
  }, [event]);

  // update the editor content whenever the permit context changes
  // this acts like a listener whenever the user clicks on edit permit
  // since the edit permit funtion, sets
  useEffect(() => {
    if (currentPermit.event) {
      setEvent(currentPermit.event);
      setPermitID(currentPermit.id)
      setPermitAction(currentPermit.action);
    }
  }, [currentPermit]);

  return (
    <div className={"editor"}>
      <div className={"wrapper"}>
        <div className="editing-area">
          <form className="form">
            <h1>Event Details: {
              event.name && event.time && event.location && event.liquor
              ? "Complete" : "Incomplete"}
            </h1>
            <label>
              Event Name
              <input
                type="text"
                name="name"
                value={event.name}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Event Time
              <input
                type="text"
                name="time"
                value={event.time}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Event Location
              <input
                type="text"
                name="location"
                value={event.location}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Liquor Requirements
              <input
                type="text"
                name="liquor"
                value={event.liquor}
                onChange={handleEventChange}>
              </input>
            </label>
            <h1>Venue Details: {
              event.venueName && event.email && event.phone
              ? "Complete" : "Incomplete"}</h1>
            <label>
              Venue Name
              <input
                type="text"
                name="venueName"
                value={event.venueName}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Venue Email
              <input
                type="text"
                name="email"
                value={event.email}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Venue Phone
              <input
                type="text"
                name="phone"
                value={event.phone}
                onChange={handleEventChange}>
              </input>
            </label>
            <h1>Business Details: {
              event.contactName && event.contactSSN && event.contactDOB && event.companyType && event.address
              ? "Complete" : "Incomplete"}</h1>
            <label>
              Contact Name
              <input
                type="text"
                name="contactName"
                value={event.contactName}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Contact SSN
              <input
                type="text"
                name="contactSSN"
                value={event.contactSSN}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Contact DOB
              <input
                type="text"
                name="contactDOB"
                value={event.contactDOB}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Business Details
              <input
                type="text"
                name="companyType"
                value={event.companyType}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Business Address
              <input
                type="text"
                name="address"
                value={event.address}
                onChange={handleEventChange}>
              </input>
            </label>

          </form>

        </div>
        <ul className={"options"}>
          <li className={"option"}>
            <button onClick={savePermit} disabled={isSaved} className="cta flex gap-2 items-end">
              <CheckCircleIcon className="h-5 w-5 text-blue-500" />
              <span className="">{isSaved ? "Saved" : "Save"}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Editor;
