import React from "react";

import Student from "./student";
import "./style.css";

const index = () => {
  const users = {
    students: [
      { id: 1, username: "AbdallahAmmar96" },
      { id: 2, username: "AhmedAl-Almi" },
      { id: 3, username: "ahmedisam99" },
      { id: 4, username: "alaabadra" },
      { id: 5, username: "aminalakhsham" },
      { id: 6, username: "Angham116" },
      { id: 7, username: "Anies12" },
      { id: 8, username: "AymanAlqoqa" },
      { id: 9, username: "engshorouq" },
      { id: 10, username: "IsraaSulaiman" },
      { id: 11, username: "Jamalat-shamallakh" },
      { id: 12, username: "mohammedmh" },
      { id: 13, username: "naremanhilles" },
      { id: 14, username: "Fatmasiam" },
      { id: 15, username: "denaHS" },
      { id: 16, username: "KhaderMurtaja" }
    ]
  };
  localStorage.setItem('students', JSON.stringify(users.students));
    return (
      <main className='main-students'>
      <h1 className='main-student__title'>All Students In FACG6</h1>
        {users.students.map(student => (
          <Student key={student.id} username={student.username} />
        ))}
      </main>
    );
}

export default index;
