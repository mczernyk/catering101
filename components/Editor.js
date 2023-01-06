import { useEffect, useState } from "react"

import { useSession } from "next-auth/react";

import { CheckCircleIcon } from "@heroicons/react/solid"

import { usePermit, useDispatchPermit, usePermits, useDispatchPermits } from "../modules/AppContext"

import RandomID from "../modules/RandomID";


// making editor for new catering permit applications

const Editor = () => {

  // useSession() returns an object containing two values: data and status
  const { data: session, status } = useSession();

  // the current permit, imported from AppContext. used to get, edit or create new permit

  // get
  const currentPermit = usePermit();
  // set
  const setCurrentPermit = useDispatchPermit();

  // the array of saved permits

  // get
  const permits = usePermits();
  // set
  const setPermits = useDispatchPermits();

  // edit permit states
  const [event, setEvent] = useState({
    name: '',
    eventTime: '',
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

  // permit ID
  const [permitID, setPermitID] = useState(null);
  // add or edit; default to add
  const [permitAction, setPermitAction] = useState("add");
  // saved status for button
  const [isSaved, setIsSaved] = useState(false);
   // user data
   const [userID, setUserID] = useState(null);

  // functions to capture form data for each category; handles multiple fields

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
  const savePermit = async () => {
    console.log('clicked')
    if (event.name) {

      // check if permit already has an ID, if it does asign the current id to the permit object,
      // if not, assign a new random ID to the permit object

      // OLD - replaced when connecting to Mongo/Prisma
      // let id = permitID || RandomID(event.name.slice(0, 5), 5);

      // set userId
      setUserID(session.user.id);

      // the permit object
      let permit = {
        // id,
        event,
        reviewed: false,
        userId: userID,
      };

      console.log('permit', permit)

      try {
        if (permitAction == "edit") {

          console.log('hit edit')

          // add permit id to permit data
          permit.id = permitID


          // send request to edit permit
          let res = await fetch("/api/permit", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(permit),
          });

          // update permit
          const updatedPermit = await res.json();
          console.log("Update successful", { updatedPermit });

          // edit in permits list
          setPermits({ permit: updatedPermit, type: "edit" });

          // OLD edit in permits list, replaced with Mongo/prisma
          // setPermits({ permit, type: "edit" });

          console.log('edit data', { permit, permitAction, permitID, permits });

        } else {
          console.log('hit add')

          // send create request with permit data
          let res = await fetch("/api/permit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(permit),
          });

          const newPermit = await res.json();
          console.log("Create successful", { newPermit });
          // add to permits list
          setPermits({ permit: newPermit, type: "add" });
        }

        // set saved true to disable save button
        setIsSaved(true)

        // clear permit content
        permit = {event: { name: '', eventTime: '', location: '', liquor: '', venueName:'', email:'', phone: '', contactName: '', contactSSN: '', contactDOB: '', companyType: '', address: ''}};

        console.log('reset event', permit.event)

        // clear editor
        setEvent(permit.event);
        console.log('cleared event', event)


        // clear current permit state
        setCurrentPermit(permit)

        // clear noteID & action
        setPermitID(null)
        setPermitAction("add")

      } catch (error){
        console.log('permit error', error)
        alert('there was an error saving your permit', error)
      }
      alert("Your permit has been saved")
    }
  }

  // enable the button whenever the form content changes
  useEffect(() => {
    if (event.name) setIsSaved(false);
    else setIsSaved(true);
  }, [event]);

  // update the editor content whenever the permit context changes
  // this acts like a listener whenever the user clicks on edit permit
  // since the edit permit function, sets ID
  useEffect(() => {
    if (currentPermit) {
      setEvent(currentPermit);
      setPermitID(currentPermit.id)
      setPermitAction(currentPermit.action);
    }
  }, [currentPermit]);

  return (
    status === "authenticated" &&
    (<div className={"editor"}>
      <div className={"wrapper"}>
        <div className="editing-area">
          <form className="form">
            <h1>Event Details: {
              event.name && event.eventTime && event.location && event.liquor
              ?
              <span style={{color:'#16A249'}}>Complete</span>
              :
              <span style={{color:'#DC2828'}}>Incomplete</span>
            }
            </h1>
            <label>
              Event Name
              <input
                type="text"
                name="name" required
                value={event.name}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Event Time
              <input
                type="text"
                name="eventTime" required
                value={event.eventTime}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Event Location
              <input
                type="text"
                name="location" required
                value={event.location}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Liquor Requirements
              <input
                type="text"
                name="liquor" required
                value={event.liquor}
                onChange={handleEventChange}>
              </input>
            </label>
            <h1>Venue Details: {
              event.venueName && event.email && event.phone
              ?
              <span style={{color:'#16A249'}}>Complete</span>
              :
              <span style={{color:'#DC2828'}}>Incomplete</span>
            }
            </h1>
            <label>
              Venue Owner
              <input
                type="text"
                name="venueName" required
                value={event.venueName}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Venue Email
              <input
                type="text"
                name="email" required
                value={event.email}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Venue Phone
              <input
                type="text"
                name="phone" required
                value={event.phone}
                onChange={handleEventChange}>
              </input>
            </label>
            <h1>Business Details: {
              event.contactName && event.contactSSN && event.contactDOB && event.companyType && event.address
              ?
              <span style={{color:'#16A249'}}>Complete</span>
              :
              <span style={{color:'#DC2828'}}>Incomplete</span>
            }
            </h1>
            <label>
              Contact Name
              <input
                type="text"
                name="contactName" required
                value={event.contactName}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Contact SSN
              <input
                type="text"
                name="contactSSN" required
                value={event.contactSSN}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Contact DOB
              <input
                type="text"
                name="contactDOB" required
                value={event.contactDOB}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Company Type
              <input
                type="text"
                name="companyType" required
                value={event.companyType}
                onChange={handleEventChange}>
              </input>
            </label>
            <label>
              Business Address
              <input
                type="text"
                name="address" required
                value={event.address}
                onChange={handleEventChange}>
              </input>
            </label>


          </form>
        </div>
        <ul className={"options"}>
          <li className={"option"}>
            <button type="submit" onClick={savePermit}
            disabled={isSaved || !event.name || !event.eventTime || !event.location || !event.liquor || !event.venueName || !event.email || !event.phone || !event.contactName || !event.contactSSN || !event.contactDOB || !event.companyType || !event.address}
            className="cta flex gap-2 items-end">
              <CheckCircleIcon className="h-5 w-5 text-blue-500" />
              <span className="">{isSaved ? "Saved" : "Save"}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>)
  );
};

export default Editor;
