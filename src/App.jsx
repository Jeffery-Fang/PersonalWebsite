import { useEffect, useState } from 'react'

let helpMap = {
  "whoami": "a short descriptions about who I am",
  "ls": "list files and directories in the current directory",
  "cat": "print the contents of the file",
  "help": "list supported commands with a short description",
  "clear": "clear terminal history"
};

let files = [
  "resume.txt",
  "projects.txt",
  "contacts.txt"
];

let projects = [
  ["Personal Website", "TBD"],
  ["ShopMart", "TBD"],
  ["Specialized Search Engine", "TBD"],
  ["Quiz CLI App", "TBD"]
];

let contacts = [
  ["Name: ", "Jeffery Fang"],
  ["Linkedin: ", "https://www.linkedin.com/in/jeffery-fang-988117273/"],
  ["Email: ", "JefferyFang324@gmail.com"],
  ["GitHub: ", "https://github.com/Jeffery-Fang"]
];

function Line({user, host}){
  return (
    <>
      <div className = "container-fluid p-2 d-flex gap-2">
        <div className = "cmd col-1 p-0">
          {user + '@' + host + ':~$'}
        </div>
        <div className = "col-11 p-0">
          <span id = "cur">
          </span>
          <span className = "bg-light" id = "cursor">
            &nbsp;
          </span>
        </div>
      </div>
    </>
  );
}

function OldLine({user, host, content, command, id}){

  return (
    <>
      <div className = "container-fluid p-2 pb-0 d-flex gap-2">
        <div className = "cmd col-1 p-0">
          {user + '@' + host + ':~$'}
        </div>
        <div className = "col-11 p-0" >
          <span>
            {content}
          </span>
        </div>
      </div>
      {
        command == 0 && 
        <div className = "container-fluid p-2 pb-0 d-flex gap-2">
          <div className = "col p-0" >
            <span>
              Not a valid command type 'help' for supported commands
            </span>
          </div>
        </div>
      }
      {
        command == 1 &&
        <HelpList id = {id}/>
      }
      {
        command == 2 &&
        <Intro />
      }
      {
        command == 3 &&
        <GList content = {files} version = {0} />
      }
      {
        command == 4 &&
        <GList content = {projects} version = {1} />
      }
      {
        command == 5 &&
        <GList content = {contacts} version = {2} />
      }
    </>
  );
}

function HelpList(){

  let entries = Object.keys(helpMap).map((key) => {

    return (
      <div className = "row" key = {key}>
        <div className = "col-1">
          {key}
        </div>
        <div className = "col-1">
          -
        </div>
        <div className = "col-10">
          {helpMap[key]}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className = "vstack gap-2 p-2 pb-0">
        {entries}
      </div>
    </>
  );
}

function Intro(){

  return (
    <>
      <div className = "vstack gap-2">
        <div className = "text-start p-2 pb-0">
          Hi, I'm Jeffery a new grad software engineer who love building things and taking on
        </div>
        <div className = "text-start p-2 pb-0">
          new challenges. I'm currently looking for a software engineering position and if you're
        </div>
        <div className = "text-start p-2 pb-0">
          interested check out 'contacts.txt' for my contact info
        </div>
      </div>
    </>
  );
}

function GList({content, version}){

  let entries;
  if(version == 0){
    entries = content.map((file) => {
      return (
        <div className = "col-1 p-2 pb-0" key = {version + file}>
          {file}
        </div>
      );
    });
  }else if(version == 1){
    entries = content.map((file) => {
      return (
        <a className = "col-1 p-2 pb-0 link-underline link-underline-opacity-0" key = {version + file[0]} href = {file[1]}>
          {file[0]}
        </a>
      );
    });
  }else if(version == 2){
    entries = content.map((file) => {
      return (
        <div className = "col-10 p-2 pb-0" key = {version + file[1]}>
          {file[0] + file[1]}
        </div>
      );
    });
  } 

  return (
    <>
      <div>
        {entries}
      </div>    
    </>
  );
}

function App() {
  
  const [id, setID] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() =>{
    let temp = document.getElementById("secret");
    temp.select();
  }, []);

  function handleClick(e){
    let temp = document.getElementById("secret");
    temp.select();
  }

  function handleTyping(e){
    if(e.key === 'VK_UP'){
      console.log("UP");
    }else{
      let temp = document.getElementById("cur");
      temp.innerHTML = e.target.value;
    }
  }

  function handleNewLine(e){
    if(e.key === 'Enter'){
      let curLine = document.getElementById("secret");
      let temp = curLine.value.split(' ');
      let newHistory = structuredClone(history);
      let newID = id + 1;

      if(!Object.keys(helpMap).includes(temp[0])){
        newHistory.push([id, curLine.value, 0]);
      }else{
        if(temp[0] == 'cat' && !files.includes(temp[1])){
          newHistory.push([id, curLine.value, 0]);
        }else{
          if(temp[0] == 'whoami'){
            newHistory.push([id, curLine.value, 2]);
          }else if(temp[0] == 'ls'){
            newHistory.push([id, curLine.value, 3]);
          }else if(temp[0] == 'cat'){
            if(temp[1] == 'projects.txt'){
              newHistory.push([id, curLine.value, 4]);
            }else if(temp[1] == 'contacts.txt'){
              newHistory.push([id, curLine.value, 5]);
            }else if(temp[1] == 'resume.txt'){
              newHistory.push([id, curLine.value, 6]);
            }
          }else if(temp[0] == 'help'){
            newHistory.push([id, curLine.value, 1]);
          }else if(temp[0] == 'clear'){
            newHistory = []
            newID = 0;
          }
        }
      }

      setHistory(newHistory);
      setID(newID);

      temp = document.getElementById("cur");
      temp.innerHTML = "";
      curLine.value = "";

    }else if(e.key === 'ArrowUp'){
      let curLine = document.getElementById("secret");
      let temp = document.getElementById("cur");

      curLine.value = history[history.length - 1][1];
      temp.innerHTML = curLine.value;
    }
  }

  let entries = history.map((line) => {
    return (
      <OldLine user = {"User"} host = {"Host"} content = {line[1]} key = {line[0]} command = {line[2]}>
      </OldLine>
    );
  });

  return (
    <>
      <div className = "vh-100 vw-100 p-0 pitchBlack" id = "console" onClick = {handleClick}>
        {entries}
        <Line user = {"User"} host = {"Host"}/>
        <input type = "text" id = "secret" spellCheck = {false} maxLength = "130" onChange = {handleTyping} onKeyDown = {handleNewLine}>
        </input>
      </div>
    </>
  )
}

export default App
