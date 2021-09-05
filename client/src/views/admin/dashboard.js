import React, { useState, useEffect } from "react";
import * as dashboardStyle from "./styles/dashboard.module.css";
import { Link } from "react-router-dom";
import DataLoading from "../../components/DataLoading";

function AdminDashboard({ currentUser }) {
  //checking if the user is admin
  let access =
    currentUser.signedIn && currentUser.userType === "admin" ? true : false;

  const [pendingIdeas, setpendingIdeas] = useState([]);
  const [fetching, setfetching] = useState(true);

  //getting pending ideas
  useEffect(() => {
    fetch("https://ideaproject.herokuapp.com/admin/dashboard", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setpendingIdeas(data);
        setfetching(false);
      })
      .catch((err) => {
        setfetching(false);
        console.log(err);
      });

    return () => {
      setpendingIdeas([]);
    };
  }, []);

  const approveIdea = (e) => {
    fetch("https://ideaproject.herokuapp.com/admin/dashboard", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: e.target.value }),
    }).then((res) => {
      setpendingIdeas(
        pendingIdeas.filter((ideas) => ideas._id !== e.target.value)
      );
      alert("Updated");
    });
  };

  const deleteIdea = (e) => {
    fetch(
      `https://ideaproject.herokuapp.com/admin/dashboard/${e.target.value}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      setpendingIdeas(
        pendingIdeas.filter((ideas) => ideas._id !== e.target.value)
      );
      alert("Deleted successfully");
    });
  };

  //local component to display card. Seperated out to use the key prop in map to avoid warning
  const Card = ({ ideas }) => {
    return (
      <div className={dashboardStyle.card}>
        <h3>{ideas.title}</h3>
        <p>{ideas.description}</p>
        <button type="button" value={ideas._id} onClick={approveIdea}>
          Approve
        </button>
        <button type="button" value={ideas._id} onClick={deleteIdea}>
          Delete
        </button>
      </div>
    );
  };


  //rendering starts here
  if (access) {
    return (
      <div className={dashboardStyle.container}>
        <div className={dashboardStyle.heading}>
          <h2>
            Welcome{" "}
            <span style={{ fontStyle: "italic", color: "salmon" }}>
              {currentUser.userName}
            </span>
          </h2>
          <Link to="/app/browse">Go to Browse</Link>
        </div>

        {fetching ? (
          <DataLoading />
        ) : (
         pendingIdeas.length ? <div className={dashboardStyle.innercontainer}>
            {pendingIdeas.map((ideas) => {
              return <Card key={ideas._id} ideas={ideas} />;
            })}
          </div> : <p style={{
            textAlign : "center",
            marginTop : "28vh",
            fontSize : "1.2rem"
          }}>Nothing to moderate. Wait for submissions</p>
        )}
      </div>
    );
  } else {
    return (
      <div className={dashboardStyle.oops}>
        <h2>Oops</h2>
        <p>You don't have access to this page.</p>
        <p>Login as an admin to access.</p>
        <p>
          <Link to="/">Return home</Link>
        </p>
      </div>
    );
  }
}

export default AdminDashboard;
