// GroupList.js
import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { useAuthMode } from "../contexts/AuthModeProvider";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const GroupList = ({ forceUpdate }) => {
  const { id } = useAuthMode();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState([]);
  const [shouldFetchGroups, setShouldFetchGroups] = useState(true);

  const jwtToken = Cookies.get("jwt");

  const fetchGroups = useCallback(async () => {
    try {
      setLoading(true);

      if (!jwtToken) {
        throw new Error("Token JWT non disponibile.");
      }

      const response = await Axios.get("http://localhost:3005/api/v1/groups", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setGroups(response.data.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [jwtToken]);

  const handleGroupClick = (group) => {
    const isGroupExpanded = expandedGroups.includes(group);
    setExpandedGroups((prevExpanded) =>
      isGroupExpanded
        ? prevExpanded.filter((prevGroup) => prevGroup !== group)
        : [...prevExpanded, group]
    );
  };

  const handleDeleteGroup = async (group) => {
    try {
      setLoading(true);
      const response = await Axios.delete(
        `http://localhost:3005/api/v1/groups/${group._id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setGroups((prevGroups) =>
        prevGroups.filter((prevGroup) => prevGroup._id !== group._id)
      );
      console.log("Group deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting group:", error.message);
      setError("Error deleting group");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async (group) => {
    try {
      setLoading(true);

      const isUserParticipant = group?.participants.some(
        (participant) => participant.user === id
      );
      if (isUserParticipant) {
        console.log("User is already a participant in the group.");
        return;
      }

      const response = await Axios.patch(
        `http://localhost:3005/api/v1/groups/join/${group._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log("Joined group successfully:", response.data);

      // Chiamata a fetchGroups dopo aver aggiunto l'utente al gruppo
      await fetchGroups();
    } catch (error) {
      console.error("Error joining group:", error.message);
      setError("Error joining group");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (forceUpdate || shouldFetchGroups) {
      // Aggiorna l'elenco completo dei gruppi
      fetchGroups();
      setShouldFetchGroups(false);
    }
  }, [forceUpdate, shouldFetchGroups, fetchGroups]);

  const renderActionButton = (group) => {
    const isUserFounder = group?.founder?.user === id;
    const isGroupFull = group?.participants?.length >= group?.maxParticipants;
    const isUserParticipant = group?.participants.some(
      (participant) => participant.user === id
    );

    if (isUserFounder) {
      return (
        <button onClick={() => handleDeleteGroup(group)}>
          Cancella Gruppo
        </button>
      );
    } else if (!isUserFounder && !isGroupFull && !isUserParticipant) {
      return (
        <button onClick={() => handleJoinGroup(group)}>
          Aggiungi al Gruppo
        </button>
      );
    }

    return null;
  };

  return (
    <div>
      <h2>Study Groups:</h2>
      <ul>
        {groups.map((group, index) => (
          <li key={index} className="mb-4">
            <div className="group-header">
              <div
                className={`bg-blue-200 p-4 cursor-pointer ${
                  expandedGroups.includes(group) ? "rounded-t" : "rounded"
                }`}
                onClick={() => handleGroupClick(group)}
              >
                <strong>Name:</strong> {group?.name}{" "}
                {expandedGroups.includes(group) ? (
                  <FaAngleUp /> // Icona per il collasso
                ) : (
                  <FaAngleDown /> // Icona per l'espansione
                )}
                <br />
                <strong>Course:</strong> {group?.course} <br />
                <strong>Founder:</strong> {group?.founder?.user} (
                {group?.founder?.type}) <br />
              </div>
              <div className="group-buttons">{renderActionButton(group)}</div>
            </div>
            {expandedGroups.includes(group) && (
              <div className="bg-gray-100 p-4 rounded-b">
                <strong>Participants:</strong> {group?.participants.length}{" "}
                <br />
                <strong>Max Participants:</strong> {group?.maxParticipants}{" "}
                <strong>Tutors:</strong> {group?.tutors.length} <br />
                <br />
              </div>
            )}
          </li>
        ))}
      </ul>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GroupList;
