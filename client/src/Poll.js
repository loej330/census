import { useEffect, useRef, useState, createContext, useContext } from "react";
import './Poll.css';

const UserChoiceContext = createContext(0);
const ViewContext = createContext(0);

function Bar({ choice, total }) {
  //measurements
  const bar_width = 500;
  const bar_height = 50;
  const bar_unit = bar_width / total;
  const bar_fill = bar_unit * choice.votes;
  const percent = 100 * (choice.votes / total);

  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'gray';
    context.fillRect(0, 0, bar_width, bar_height);

    context.fillStyle = 'green';
    context.fillRect(0, 0, bar_fill, bar_height);

    context.font = '22px serif';
    context.fillStyle = 'blue';
    context.fillText(`${percent.toFixed(2)}%`, bar_fill, 30);

  });

  return (
    <canvas height={bar_height} width={bar_width} ref={ref}>

    </canvas>
    // <div style={{ backgroundColor: "lightpink" }}>
    //   [#####------] {progress} (not actual bar lol)
    // </div>
  );
}

function Choice({ choice }) {
  const { userChoice , setUserChoice } = useContext(UserChoiceContext);
  const is_chosen = (choice.choice_id === userChoice);
  const make_choice = () => {
    setUserChoice(is_chosen ? 0 : choice.choice_id);
  }
  const classes = [
    'choice',
    (is_chosen ? 'chosen' : 'not-chosen')
  ].join(' ');

  return (
    <button onClick={make_choice} className={classes}>
      {choice.text}
    </button>
  );
}

function ChoicesContainer({ choices }) {
  const choice_items = choices.map(choice => 
    <Choice key={choice.choice_id} choice={choice}/>
  );
  return (<div className={'choices-container'}>
    {choice_items}
  </div>)
}

function ResultsContainer({ choices, total }) {
  const choice_items = choices.map(choice => 
    <div key={choice.choice_id} className="choices-container">
      <Choice choice={choice}/>
      <Bar choice={choice} total={total}/>
    </div>
  );
      // <div>({choice.votes} votes)</div>
  return (<div className={'results-container'}>
    {choice_items}
  </div>)
}


function Poll({ poll }) {
  const [ userChoice, setUserChoice ] = useState(0); //0 (false) OR id of the current choice
  // const [ view, setView ] = useState(0);
  const [ resultsActive, setResultsActive ] = useState(0);

  return (
    <UserChoiceContext.Provider value={{ userChoice, setUserChoice }}>
      <div className="poll-container">
        <h2> { poll.prompt } </h2>
        <div>
          { resultsActive
            ? <ResultsContainer choices={ poll.choices } total={ poll.total_votes }/> 
            : <ChoicesContainer choices={ poll.choices } total={ poll.total_votes }/>
          }
          { userChoice ? 'Selection Made' : 'Choose Something!' }
        </div>
        <button onClick={() => setResultsActive(!resultsActive)}>Results</button>
      </div>
    </UserChoiceContext.Provider>
  )
}

/*
function Animation1({ sillyLocs }) {
  const ref = useRef(null);
  useEffect(() => {
    const num_reps = 10; // how many times to render
    const len_reps = 100; // how long a render is in ms

    const canvas = ref.current;
    const context = canvas.getContext('2d');
    context.fillStyle = "green";
    const sq_size = 50
    const padding = 10;

    let i = 0;
    const next_render = () => {
      const offset = i * 20;
      context.fillRect(padding + offset, padding + offset, sq_size, sq_size);
      i++;
    }
    const interval_id = setInterval(next_render, len_reps)
    setTimeout(() => {
      clearInterval(interval_id);
      console.log(`Rendering complete`);
    }, len_reps * num_reps);
  })

  return (
    <canvas width={500} height={500} ref={ref}>
      <div>SILLY MILKMAN</div>
    </canvas>
  );
} 
*/

export default Poll; 
