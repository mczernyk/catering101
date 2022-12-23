import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"



import {  PencilAltIcon, TrashIcon, ExternalLinkIcon } from "@heroicons/react/solid";

import { usePermit, useDispatchPermit, usePermits, useDispatchPermits } from "../modules/AppContext";


const PermitsList = ({ retrieved_permits, showEditor }) => {

  const permits = usePermits();
  const setPermits = useDispatchPermits();

  const currentPermit = usePermit();
  const setCurrentPermit = useDispatchPermit();

  const editPermit = (permit) => {
    permit.action = "edit";
    setCurrentPermit(permit);
    console.log('current permit', currentPermit)
  };

  const deletePermit = async (permit) => {
    let confirmDelete = confirm("Do you really want to delete this permit?");

    try {
      let res = await fetch(`/api/permit`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(permit),
      });
      const deletedPermit = await res.json();
      confirmDelete ? setPermits({ permit: deletedPermit, type: "remove" }) : null;

      // OLD
      // confirmDelete ? setPermits({ permit, type: "remove" }) : null;

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(()=> {
    // replace permits in permits context state
    setPermits({ permit: retrieved_permits, type: "replace" });
  },[retrieved_permits])

  return (
    <div className="permits">
      {permits.length > 0 ? (
        <ul className="permit-list">
          {permits.map((permit) => (
            <li key={permit.id} className="permit-item">
              <article className="permit">
                <header className="permit-header">
                  <h2 className="text-2xl">{permit.name}</h2>
                </header>
                <main className=" px-4">
                  <p className="">Time: {permit.eventTime}</p>
                  <p className="">Location: {permit.location}</p>
                  <p className="">Status: {permit.reviewed? 'approved' : 'under review'}</p>

                </main>

                <footer className="permit-footer">
                  <ul className="options">
                    <li className="option">
                      {/* add user image to permit footer */}
                      <Image src={permit.user.image} alt={permit.user.name} width={32} height={32} className="rounded-full" />
                    </li>
                    <li onClick={() => editPermit(permit)} className="option">
                      <button className="cta cta-w-icon">
                        <PencilAltIcon className="icon" />
                        <span className="">Edit</span>
                      </button>
                    </li>
                    <li className="option">
                      <Link href={`/permit/${permit.id}`} target={`_blank`} rel={`noopener`}>

                        <button className="cta cta-w-icon">
                          <ExternalLinkIcon className="icon" />
                          <span className="">Open</span>
                       </button>
                      </Link>
                    </li>
                    <li className="option">
                      <button onClick={() => deletePermit(permit)} className="cta cta-w-icon">
                        <TrashIcon className="icon" />
                        <span className="">Delete</span>
                      </button>
                    </li>

                  </ul>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="fallback-message">
          <p>no permits yet</p>
        </div>
      )}
    </div>
  );
};

export default PermitsList;
