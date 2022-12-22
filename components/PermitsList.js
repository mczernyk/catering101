import { useEffect, useState } from "react";

import {  PencilAltIcon, TrashIcon, ExternalLinkIcon } from "@heroicons/react/solid";

import { usePermit, useDispatchPermit, usePermits, useDispatchPermits } from "../modules/AppContext";


const PermitsList = ({ showEditor }) => {
  const permits = usePermits();
  const setPermits = useDispatchPermits();

  const currentPermit = usePermit();
  const setCurrentPermit = useDispatchPermit();

  const editPermit = (permit) => {
    permit.action = "edit";
    setCurrentPermit(permit);
  };

  const deletePermit = (permit) => {
    let confirmDelete = confirm("Do you really want to delete this permit?");
    confirmDelete ? setPermits({ permit, type: "remove" }) : null;
  };

  return (
    <div className="permits">
      {permits.length > 0 ? (
        <ul className="permit-list">
          {permits.map((permit) => (
            <li key={permit.id} className="permit-item">
              <article className="permit">
                <header className="permit-header">
                  <h2 className="text-2xl">{permit.id}</h2>
                </header>
                <main className=" px-4">
                  <p className="">Name: {permit.event.name}</p>
                  <p className="">Time: {permit.event.time}</p>
                  <p className="">Location: {permit.event.location}</p>
                </main>
                <footer className="permit-footer">
                  <ul className="options">
                    <li onClick={() => editPermit(permit)} className="option">
                      <button className="cta cta-w-icon">
                        <PencilAltIcon className="icon" />
                        <span className="">Edit</span>
                      </button>
                    </li>
                    <li className="option">
                      <button className="cta cta-w-icon">
                        <ExternalLinkIcon className="icon" />
                        <span className="">Open</span>
                      </button>
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
