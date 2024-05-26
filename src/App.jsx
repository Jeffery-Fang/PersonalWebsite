import { useEffect, useState } from 'react'

let helpMap = {
  "whoami": "a short descriptions about who I am what I know and what I've done",
  "ls": "list files and directories in the current directory",
  "cat": "print the contents of the file",
  "help": "list supported commands with a short description",
  "clear": "clear terminal history"
};

let files = [
  "skills.txt",
  "projects.txt",
  "contacts.txt"
];

let projects = [
  ["Personal Website", "https://github.com/Jeffery-Fang/PersonalWebsite"],
  ["ShopMart", "https://github.com/Jeffery-Fang/ShopMart"],
  ["Specialized Search Engine", "https://github.com/Jeffery-Fang/Specialized-Search-Engine"],
  ["Quiz CLI App", "https://github.com/Jeffery-Fang/QuizApp"]
];

let contacts = [
  ["Name: ", "Jeffery Fang"],
  ["Linkedin: ", "https://www.linkedin.com/in/jeffery-fang-988117273/"],
  ["Email: ", "JefferyFang324@gmail.com"],
  ["GitHub: ", "https://github.com/Jeffery-Fang"]
];

let skills = [
  ["Programming Languages: ", ["JavaScript, HTML/CSS, Python, C++, Java, SQL, C"]],
  ["Software/Tools: ", ["VSCode, VirtualBox, Linux"]],
  ["Technologies/Frameworks: ", ["NodeJS, React, Express, MongoDB, PostgreSQL, Git, S3, Bootstrap, Jest"]]
];

function CmdLine({user, host}){
  /**
   *  Component that displays the line currently being typed on
   */

  return (
    <>
      <div className = "terminalTheme container-fluid px-2 d-flex gap-2">
        <div className = "col-auto">
          {user + '@' + host + ':~$'}
        </div>
        <div className = "col-auto">
          <span id = "curLine">
          </span>
          <span className = "bg-light" id = "cursor">
            &nbsp;
          </span>
        </div>
      </div>
    </>
  );
}

function OldLine({user, host, content, command}){
  /**
   * Component that displays all previous commands along with associated output
   */

  return (
    <>
      <div className = "terminalTheme container-fluid px-2 d-flex gap-2">
        <div className = "col-auto p-0">
          {user + '@' + host + ':~$'}
        </div>
        <div className = "col-auto p-0" >
          <span>
            {content}
          </span>
        </div>
      </div>
      {
        command == 0 && 
        <div className = "terminalTheme container-fluid px-2 d-flex">
          <div className = "col p-0" >
            <span>
              Not a valid command type 'help' for supported commands
            </span>
          </div>
        </div>
      }
      {
        command == 1 &&
        <HelpList />
      }
      {
        command == 2 &&
        <WhoAmI />
      }
      {
        command == 3 &&
        <GenericList content = {files} version = {0} />
      }
      {
        command == 4 &&
        <GenericList content = {projects} version = {1} />
      }
      {
        command == 5 &&
        <GenericList content = {contacts} version = {3} />
      }
      {
        command == 6 &&
        <GenericList content = {skills} version = {2} />
      }
    </>
  );
}

function HelpList(){
  /**
   * Component that displays the list of commands with their description
   */

  let entries = Object.keys(helpMap).map((command) => {
    return (
      <div className = "row" key = {command}>
        <div className = "col-auto">
          {command + ' - ' + helpMap[command]}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className = "terminalTheme px-2">
        {entries}
      </div>
    </>
  );
}

function WhoAmI(){
  /**
   * Component that display a description of me
   */

  return (
    <>
      <div className = "terminalTheme container-fluid row px-2">
        <div className = "col-sm text-start">
          Hi, I'm Jeffery a new grad software engineer who love building things and taking on
          new challenges. I'm currently looking for a software engineering position and if you're
          interested check out 'contacts.txt' for my contact info!
        </div>
        <div className = "col-sm-6">
        </div>
      </div>
    </>
  );
}

function GenericList({content, version}){
  /**
   * Generic list component used to generate output for commands
   */

  let entries;

  if(version == 0){
    entries = content.map((file) => {
      return (
        <div className = "col-auto px-2" key = {version + file}>
          {file}
        </div>
      );
    });
  }else if(version == 1){
    entries = content.map((project) => {
      return (
        <a className = "col-auto px-2 link-underline link-underline-opacity-0" key = {version + project[0]} href = {project[1]}>
          {project[0]}
        </a>
      );
    });
  }else if(version == 2){
    entries = content.map((skills) => {
      return (
        <div className = "col-12 px-2" key = {version + skills[1]}>
          {skills[0] + skills[1]}
        </div>
      );
    });
  }else if(version == 3){
    entries = content.map((contact) => {
      let link = (contact[0] != 'Email: ') ? contact[1] : ("mailto:" + contact[1]);
      
      return (
        <div className = "col-12 px-2 d-flex gap-1" key = {version + contact[1]}>
          <div className = "col-auto">
            {contact[0]}
          </div>
          {
            contact[0] != 'Name: ' &&
            <a className = "terminalTheme col-auto link-underline link-underline-opacity-0" href = {link}>
              {contact[1]}
            </a> 
          }
           {
            contact[0] == 'Name: ' &&
            <div className = "terminalTheme col-auto">
              {link}
            </div> 
          }
        </div>
      );
    });
  }  

  return (
    <>
    <div className = "p-0">
      <div className = "terminalTheme container-fluid row d-flex">
        {entries}
      </div> 
    </div>
    </>
  );
}

function App() {
  /**
   *  Top level component that maintains state for the whole application
   */

  const [introduced, setIntroduced] = useState(false);
  const [id, setID] = useState(0);
  const [history, setHistory] = useState([]);

  //select the secret text box on load
  useEffect(() => {
    handleClick();
  }, []);

  useEffect(() => {
    document.getElementById("cursor").scrollIntoViewIfNeeded();
  }, [history]);

  function handleClick(e){
    let temp = document.getElementById("secret");
    temp.focus();
    document.getElementById("cursor").scrollIntoViewIfNeeded();
  }

  function handleTyping(e){
    let temp = document.getElementById("curLine");
    temp.innerHTML = e.target.value;
  }

  /**
   * When enter is pressed determine the command and arguments inputted and add an entry to history
   * accordingly entries in history are as follows [lineID, lineValue, commandID]
   */
  function handleNewLine(e){
    if(e.key === 'Enter'){
      let curLine = document.getElementById("secret");
      let args = curLine.value.split(' ');
      let newHistory = structuredClone(history);
      let newID = id + 1;

      if(!Object.keys(helpMap).includes(args[0])){
        newHistory.push([id, curLine.value, 0]);

      }else{
        if(args[0] == 'cat' && !files.includes(args[1])){
          newHistory.push([id, curLine.value, 0]);

        }else{
          if(args[0] == 'whoami'){
            newHistory.push([id, curLine.value, 2]);

          }else if(args[0] == 'ls'){
            newHistory.push([id, curLine.value, 3]);

          }else if(args[0] == 'cat'){
            if(args[1] == 'projects.txt'){
              newHistory.push([id, curLine.value, 4]);

            }else if(args[1] == 'contacts.txt'){
              newHistory.push([id, curLine.value, 5]);

            }else if(args[1] == 'skills.txt'){
              newHistory.push([id, curLine.value, 6]);

            }
          }else if(args[0] == 'help'){
            newHistory.push([id, curLine.value, 1]);

          }else if(args[0] == 'clear'){
            newHistory = []
            newID = 0;
            setIntroduced(true);

          }
        }
      }

      setHistory(newHistory);
      setID(newID);

      let temp = document.getElementById("curLine");
      temp.innerHTML = "";
      curLine.value = "";

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
      <div className = "vh-100 vw-100 p-0 bg-transparent" id = "console" onClick = {handleClick}>
        {
          !introduced &&
          <div className = "terminalTheme px-2 pt-2">
            Welcome to my interactive terminal website. For a list of supported commands type 'help'. Enjoy your stay!
          </div>
        }
        {entries}
        <CmdLine user = {"User"} host = {"Host"}/>
        <input type = "text" id = "secret" spellCheck = {false} onChange = {handleTyping} onKeyDown = {handleNewLine}>
        </input>
      </div>
    </>
  )
}

export default App
